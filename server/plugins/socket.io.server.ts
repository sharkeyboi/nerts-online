import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import {v4} from 'uuid'
import { DropAction, LocationType } from '~/src/types/actions'
import { GameBoard, UserSide } from '~/src/types/board'
import { Card } from '~/src/types/card'
import { ClientToServerEvents, ServerToClientEvents } from '~/src/types/socketMessages'
import { shuffle } from '~/src/utils/shuffle'
const MAX_USERS = 2
type Room = {
    roomId: string,
    users: string[],
    gameBoard: GameBoard | null
}


const cartesian =
  (...a:any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
const numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
const suits = ["♠️","♣️","♦️","♥️"]
const deckOfCards: Card[] = cartesian(numbers, suits).map((elem: any[]) => {
    return {
        number: elem[0],
        suit: elem[1]
    }
})

let rooms:Room[] = []
export default defineNitroPlugin((nitroApp) => {
    const socketServer = new Server<ClientToServerEvents,ServerToClientEvents>(3001, {
        serveClient: false,
        cors: {
            origin: '*'
        },
        
    })
    socketServer.on('connection', (socket) => {
        const username = socket.handshake.auth.username
        let currRoom = joinRoom(socket)
        if(currRoom.gameBoard) {
            socketServer.to(currRoom.roomId).emit('startGame',currRoom.gameBoard)
        }
        socketServer.to(currRoom.roomId).emit('message', `${username} has entered room: ${currRoom.roomId}`)
        socket.on('disconnect', (reason) => {
            socketServer.to(currRoom.roomId).emit('matchError')
            rooms.splice(rooms.indexOf(currRoom),1)
        })

        socket.on('dropAction', (data:DropAction) => {
            if(handleDropAction(currRoom, data)) {
                socketServer.to(currRoom.roomId).emit("dropResponse", data) // Return the updated state for the specific lake pile
            }
        })
     })
    
     
})

function handleDropAction(room: Room, dropAction: DropAction): Boolean{
    switch(dropAction.toLocation.locationType) {
        case(LocationType.Lake):
            if(validateLakeDrop(room, dropAction)) {
                room = handleLakeDrop(room, dropAction)
                return true
            }
            break;
    }
    return false
}

function validateLakeDrop(room: Room, lakeDropAction: DropAction): Boolean {
    const lakePile = room.gameBoard?.lake[lakeDropAction.toLocation.index]
    if(lakeDropAction.cards.length != 1) return false
    const currCard = lakeDropAction.cards[0]

    if(!lakePile) return false
    if(lakePile.length == 0) {
        if(currCard.number != numbers[0]) return false // If the pile is empty, have to put an Ace here
    }
    else {
        const topLake = lakePile[lakePile.length]
        if(currCard.suit != topLake.suit) return false // Has to match suit
        if(currCard.number != numbers[numbers.indexOf(topLake.number) + 1]) return false // Has to be one number higher
    }
    return true
}

function handleLakeDrop(room: Room, lakeDropAction: DropAction): Room {
    // Drop succeeded
    const lakePile = room.gameBoard?.lake[lakeDropAction.toLocation.index]
    const currCard = lakeDropAction.cards[0]
    lakePile?.push(currCard)
    room = removeFromLocation(room, lakeDropAction)
    return room
}

function removeFromLocation(room: Room, dropAction: DropAction): Room {
    switch(dropAction.fromLocation.locationType) {
        case(LocationType.River):
            return removeFromRiver(room, dropAction)
        default:
            return room
    }
}

function removeFromRiver(room: Room, dropAction: DropAction): Room {
    const riverPile = room.gameBoard?.usersides[dropAction.userId].riverStacks[dropAction.fromLocation.index]
    riverPile?.splice(riverPile.indexOf(dropAction.cards[0]),1)
    return room
}

function joinRoom(socket: Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>): Room {
    if (rooms.length == 0 || rooms[rooms.length - 1].users.length >= MAX_USERS) {
        const newRoom: Room = {
            roomId: v4(),
            users: [socket.handshake.auth.username],
            gameBoard: null
        }
        rooms.push(newRoom)
        socket.join(newRoom.roomId)
        return newRoom
    }
    else {
        const currRoom = rooms[rooms.length - 1]
        currRoom.users.push(socket.handshake.auth.username)
        currRoom.gameBoard = getNewGameBoard(currRoom.roomId, currRoom.users)
        socket.join(currRoom.roomId)
        return currRoom
    }
}

function getNewGameBoard(roomId: string, users: string[]): GameBoard{
    const userSides:{
        [key: string]: UserSide
    } = {}
    users.forEach((user) => {
        const playerCardDeck: Card[] = shuffle(deckOfCards)
        userSides[user] = {
            userId:user,
            nertsPile: playerCardDeck.slice(0,13),
            riverStacks: playerCardDeck.slice(13,18).map((card) => [card]),
            deck: playerCardDeck.slice(18),
            stack: []
        }
    })
    const gameBoard: GameBoard = {
        usersides: userSides,
        lake: Array.from(Array(8), () => [])
    }
    return gameBoard
}
