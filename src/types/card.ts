export enum Suit {
    Spade,
    Club,
    Heart,
    Diamond
}

export interface Card {
    number: string,
    suit: Suit
}