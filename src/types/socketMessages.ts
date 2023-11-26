import type { DropAction, DropResponse, ReshuffleResponse } from "./actions";
import type { GameBoard } from "./board";

export interface ServerToClientEvents {
    dropResponse: (resp: DropResponse) => void
    matchError: () => void
    startGame: (resp: GameBoard) => void
    message: (resp: string) => void
    dealResponse: (user: string) => void
    reshuffleResponse: (resp: ReshuffleResponse) => void
}

export interface ClientToServerEvents {
    dropAction: (resp: DropAction) => void
    message: (resp: string) => void
    dealAction: () => void
    nertsAction: () => void
}

export interface SocketData {

}