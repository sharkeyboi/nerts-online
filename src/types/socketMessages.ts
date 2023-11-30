import type { DropAction, DropResponse, ReshuffleResponse } from "./actions";
import type { GameBoard } from "./board";

export type Score = {
    userID: string,
    score: number
}

export type Room = {
    roomId: string,
    gameBoard: GameBoard,
    scores: Score[][]
}
export interface ServerToClientEvents {
    dropResponse: (resp: DropResponse) => void
    matchError: () => void
    startGame: (resp: GameBoard) => void
    message: (resp: string) => void
    dealResponse: (user: string) => void
    reshuffleResponse: (resp: ReshuffleResponse) => void
    roundEnd: (resp: Score[][]) => void
}

export interface ClientToServerEvents {
    dropAction: (resp: DropAction) => void
    message: (resp: string) => void
    dealAction: () => void
    nertsAction: () => void
    startRound: () => void
}

export interface SocketData {

}
