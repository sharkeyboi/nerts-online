import { Server, Socket } from 'socket.io'
import type { DefaultEventsMap } from 'socket.io/dist/typed-events'
import {v4} from 'uuid'
import { validateLakeDrop } from '~/src/serverDropHandlers'
import { validateRiverDrop } from '~/src/serverDropHandlers'
import type { DropAction} from '~/src/types/actions'
import { LocationType } from '~/src/types/actions'
import type { GameBoard, UserSide } from '~/src/types/board'
import type { Card } from '~/src/types/card'
import type { ClientToServerEvents, ServerToClientEvents } from '~/src/types/socketMessages'
import { cartesian, numbers, suits } from '~/src/utils/cardData'
import { shuffle } from '~/src/utils/shuffle'
const MAX_USERS = 2
type Room = {
    roomId: string,
    users: string[],
    gameBoard: GameBoard | null
}


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

function handleDropAction(room: Room, dropAction: DropAction): boolean{
    switch(dropAction.toLocation.locationType) {
        case(LocationType.Lake):
            const lakePile = room.gameBoard?.lake[dropAction.toLocation.index]
            if(!lakePile) return false
            if(validateLakeDrop(lakePile, dropAction.cards)) {
                room = handleLakeDrop(room, dropAction)
                return true
            }
            break;
        case(LocationType.River):
            const riverPile = room.gameBoard?.usersides[dropAction.userId].riverStacks[dropAction.toLocation.index]
            if(!riverPile) return false;
            if(validateRiverDrop(riverPile, dropAction.cards)) {
                //room = handleRiverDrop(room, dropAction)
            }
    }
    return false
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
