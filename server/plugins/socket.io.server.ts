import { Server, Socket } from 'socket.io'
import type { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { v4 } from 'uuid'
import { validateLakeDrop } from '~/src/serverDropHandlers'
import { validateRiverDrop } from '~/src/serverDropHandlers'
import type { DropAction } from '~/src/types/actions'
import { LocationType } from '~/src/types/actions'
import type { GameBoard, UserSide } from '~/src/types/board'
import type { Card } from '~/src/types/card'
import type { ClientToServerEvents, ServerToClientEvents } from '~/src/types/socketMessages'
import { cartesian, numbers, suits } from '~/src/utils/cardData'
import { shuffle } from '~/src/utils/shuffle'
const MAX_USERS = 2
type Room = {
    roomId: string,
    gameBoard: GameBoard
}


const deckOfCards: Card[] = cartesian(numbers, suits).map((elem: any[]) => {
    return {
        number: elem[0],
        suit: elem[1]
    }
})

let rooms: Room[] = []
export default defineNitroPlugin((nitroApp) => {
    const socketServer = new Server<ClientToServerEvents, ServerToClientEvents>(3001, {
        serveClient: false,
        cors: {
            origin: '*'
        },

    })
    socketServer.on('connection', (socket) => {
        const username = socket.handshake.auth.username
        let currRoom = joinRoom(socket)
        if (Object.keys(currRoom.gameBoard.usersides).length == 2) {
            socketServer.to(currRoom.roomId).emit('startGame', currRoom.gameBoard)
        }
        socketServer.to(currRoom.roomId).emit('message', `${username} has entered room: ${currRoom.roomId}`)
        socket.on('disconnect', (reason) => {
            socketServer.to(currRoom.roomId).emit('matchError')
            rooms.splice(rooms.indexOf(currRoom), 1)
        })

        socket.on('dropAction', (data: DropAction) => {
            if (handleDropAction(currRoom, data)) {
                socketServer.to(currRoom.roomId).emit("dropResponse", data) // Return the updated state for the specific lake pile
            }
        })
        socket.on('dealAction', () => {
            if (handleDealAction(currRoom, username)) {
                socketServer.to(currRoom.roomId).emit("dealResponse", username)
            } else {
                const newDeck = reshuffleAction(currRoom, username)
                socketServer.to(currRoom.roomId).emit("reshuffleResponse", {
                    userId: username,
                    cards: newDeck
                })
            }
        })
    })


})

function handleDealAction(room: Room, user: string): boolean {
    let userDeck = room.gameBoard.usersides[user].deck
    const dealtCards = userDeck.slice(0, 3)
    console.log(dealtCards)
    if (dealtCards.length == 0) return false
    room.gameBoard.usersides[user].deck = userDeck.slice(dealtCards.length)
    room.gameBoard.usersides[user].stack = room.gameBoard.usersides[user].stack.concat(dealtCards)
    return true
}

function reshuffleAction(room: Room, user: string) {
    const userSide = room.gameBoard.usersides[user]
    userSide.deck = [...userSide.stack]
    userSide.stack = []
    return userSide.deck
}


function handleDropAction(room: Room, dropAction: DropAction): boolean {
    switch (dropAction.toLocation.locationType) {
        case (LocationType.Lake):
            const lakePile = room.gameBoard.lake[dropAction.toLocation.index]
            if (!lakePile) return false
            if (!validateLakeDrop(lakePile, dropAction.cards)) return false
            room = executeLakeDrop(room, dropAction)
            break;
        case (LocationType.River):
            const riverPile = room.gameBoard.usersides[dropAction.userId].riverStacks[dropAction.toLocation.index]
            if (!riverPile) return false;
            console.log("Validating river drop")
            if (!validateRiverDrop(riverPile, dropAction.cards)) return false
            console.log("Executing river drop")
            room = executeRiverDrop(room, dropAction)
    }
    room = removeFromLocation(room, dropAction)
    return true
}

function executeRiverDrop(room: Room, riverDropAction: DropAction): Room {
    const userRiver = room.gameBoard.usersides[riverDropAction.userId].riverStacks
    const riverTo = userRiver[riverDropAction.toLocation.index]
    riverDropAction.cards.forEach(card => {
        riverTo?.push(card)
    })
    return room
}

function executeLakeDrop(room: Room, lakeDropAction: DropAction): Room {
    // Drop succeeded
    const lakePile = room.gameBoard.lake[lakeDropAction.toLocation.index]
    lakeDropAction.cards.forEach(card => {
        lakePile?.push(card)
    })
    return room
}

function removeFromLocation(room: Room, dropAction: DropAction): Room {
    switch (dropAction.fromLocation.locationType) {
        case (LocationType.River):
            return removeFromRiver(room, dropAction)
        case (LocationType.Stack):
            return removeFromStack(room, dropAction)
        case (LocationType.Nerts):
            return removeFromNerts(room, dropAction)
        default:
            return room
    }
}

function removeFromNerts(room: Room, dropAction: DropAction): Room {
    const nerts = room.gameBoard.usersides[dropAction.userId].nertsPile
    dropAction.cards.forEach((card) => {
        nerts.splice(nerts.indexOf(card), 1)
    })
    return room
}

function removeFromStack(room: Room, dropAction: DropAction): Room {
    const stack = room.gameBoard.usersides[dropAction.userId].stack
    dropAction.cards.forEach((card) => {
        stack.splice(stack.indexOf(card), 1)
    })
    return room
}

function removeFromRiver(room: Room, dropAction: DropAction): Room {
    const riverPile = room.gameBoard.usersides[dropAction.userId].riverStacks[dropAction.fromLocation.index]
    dropAction.cards.forEach((card) => {
        riverPile?.splice(riverPile.indexOf(card), 1)
    })
    return room
}

function joinRoom(socket: Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>): Room {
    if (rooms.length == 0 || Object.keys(rooms[rooms.length - 1].gameBoard.usersides).length >= MAX_USERS) {
        const newRoom: Room = {
            roomId: v4(),
            gameBoard: getNewGameBoard([socket.handshake.auth.username])
        }
        rooms.push(newRoom)
        socket.join(newRoom.roomId)
        return newRoom
    }
    else {
        const currRoom = rooms[rooms.length - 1]
        currRoom.gameBoard = addUserToGameBoard(currRoom.gameBoard, socket.handshake.auth.username)
        socket.join(currRoom.roomId)
        return currRoom
    }
}

function getNewGameBoard(users: string[]): GameBoard {
    const userSides: {
        [key: string]: UserSide
    } = {}
    users.forEach((user) => {
        const playerCardDeck: Card[] = shuffle(deckOfCards)
        userSides[user] = {
            userId: user,
            nertsPile: playerCardDeck.slice(0, 13),
            riverStacks: playerCardDeck.slice(13, 18).map((card) => [card]),
            deck: playerCardDeck.slice(18),
            stack: [],
            points: 0
        }
    })
    const gameBoard: GameBoard = {
        usersides: userSides,
        lake: Array.from(Array(8), () => [])
    }
    return gameBoard
}

function addUserToGameBoard(gameBoard: GameBoard, user: string): GameBoard {
    const playerCardDeck: Card[] = shuffle(deckOfCards)
    const newUser = {
        userId: user,
        nertsPile: playerCardDeck.slice(0, 13),
        riverStacks: playerCardDeck.slice(13, 18).map((card) => [card]),
        deck: playerCardDeck.slice(18),
        stack: [],
        points: 0
    }
    gameBoard.usersides[user] = newUser
    return gameBoard
}