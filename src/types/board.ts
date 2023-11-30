import type { Card } from "./card"

export interface GameBoard {
    usersides: UserSide[]
    lake: Card[][]
}

export interface UserSide {
    userID: string
    nertsPile: Card[]
    deck: Card[]
    stack: Card[]
    riverStacks: Card[][]
    points: number
    ready: boolean
}
