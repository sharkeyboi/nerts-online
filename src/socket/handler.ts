import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { v4 } from "uuid";
import { Match } from "../models/match";
import { validateLakeDrop, validateRiverDrop } from "../serverDropHandlers";
import { DropAction, LocationType } from "../types/actions";
import { GameBoard, UserSide } from "../types/board";
import { Card } from "../types/card";
import { ClientToServerEvents, Room, Score, ServerToClientEvents } from "../types/socketMessages";
import { cartesian, numbers, suits } from "../utils/cardData";
import { shuffle } from "../utils/shuffle";


const MAX_USERS = 2




const deckOfCards: Card[] = cartesian(numbers, suits).map((elem: any[]) => {
    return {
        number: elem[0],
        suit: elem[1]
    }
})

let matchQueue: Match[] = []
let activeMatches: Match[] = []

export const socketHandler = async (socketServer: Server<ClientToServerEvents, ServerToClientEvents>) => {
    socketServer.on('connection', (socket) => {
        const username: string = socket.handshake.auth.username
        let currMatch = joinMatch(username)
        socket.join(currMatch.roomID)
        socketServer.to(currMatch.roomID).emit('message', `${username} has entered room: ${currMatch.roomID}`)
        socket.on('disconnect', (reason) => {

            socketServer.to(currMatch.roomID).emit('matchError')
            activeMatches.splice(activeMatches.indexOf(currMatch), 1)
        })

        socket.on('dropAction', (data: DropAction) => {
            if (currMatch.drop(data)) {
                socketServer.to(currMatch.roomID).emit("dropResponse", data) // Return the updated state for the specific lake pile
            }
        })
        socket.on('dealAction', () => {
            const userSide = currMatch.getUserSide(username)
            if (currMatch.deal(username)) {
                socketServer.to(currMatch.roomID).emit("dealResponse", username)
            } else {
                socketServer.to(currMatch.roomID).emit("reshuffleResponse", {
                    userID: username,
                    cards: userSide.deck
                })
            }
        })
        socket.on('nertsAction', () => {
            if (currMatch.roundEnd(username)) {
                socketServer.to(currMatch.roomID).emit("roundEnd", currMatch.scores)
            }
        })
        socket.on('startRound', () => {
            currMatch.readyForStart(username)
            if(currMatch.users.length < 2) return
            if(!currMatch.gameBoard.usersides.every(side => side.ready)) return
            currMatch.resetBoard()
            socketServer.to(currMatch.roomID).emit("startGame", currMatch.gameBoard)
        })
    })
}


function joinMatch(userID: string): Match {
    const existingMatch = matchQueue.pop()
    if (existingMatch) {
        existingMatch.addUserToGameBoard(userID)
        activeMatches.push(existingMatch)
        return existingMatch
    }
    else {
        const newMatch = new Match([userID])
        matchQueue.push(newMatch)
        return newMatch
    }
}
