import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { v4 } from "uuid";
import { Match } from "~/src/models/match";
import { validateLakeDrop, validateRiverDrop } from "~/src/serverDropHandlers";
import { DropAction, LocationType } from "~/src/types/actions";
import { GameBoard, UserSide } from "~/src/types/board";
import { Card } from "~/src/types/card";
import { ClientToServerEvents, Room, Score, ServerToClientEvents } from "~/src/types/socketMessages";
import { cartesian, numbers, suits } from "~/src/utils/cardData";
import { shuffle } from "~/src/utils/shuffle";


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
        const userSide = currMatch.gameBoard.usersides.find(x => x.userID == username)
        if (!userSide) {
            throw Error("Match not properly initialized")
        }
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
            if (currMatch.deal(userSide)) {
                socketServer.to(currMatch.roomID).emit("dealResponse", username)
            } else {
                socketServer.to(currMatch.roomID).emit("reshuffleResponse", {
                    userId: username,
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
            userSide.ready = true
            if (currMatch.gameBoard.usersides.every(side => side.ready)) {
                currMatch.resetBoard()
                socketServer.to(currMatch.roomID).emit("startGame", currMatch.gameBoard)
            }
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
