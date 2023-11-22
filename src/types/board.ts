import type { Card } from "./card"

export interface GameBoard {
    usersides: {
        [key: string]: UserSide
    }
    lake: Card[][]
}

export interface UserSide {
    userId: string
    nertsPile: Card[]
    deck: Card[]
    stack: Card[]
    riverStacks: Card[][]
}
