import type { DropAction, DropResponse } from "./actions";
import type { GameBoard } from "./board";

export interface ServerToClientEvents {
    dropResponse: (resp: DropResponse) => void
    matchError: () => void
    startGame: (resp: GameBoard) => void
    message: (resp: string) => void
}

export interface ClientToServerEvents {
    dropAction: (resp: DropAction) => void    
    message: (resp: string) => void
}

export interface SocketData {

}