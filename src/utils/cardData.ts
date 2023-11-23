import { Suit } from "../types/card";

export const cartesian = (...a: any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
export const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
export const suits = [Suit.Spade, Suit.Club, Suit.Diamond, Suit.Heart];
export const suitPairings = {
    [Suit.Spade]: [Suit.Diamond, Suit.Heart],
    [Suit.Club]: [Suit.Diamond, Suit.Heart],
    [Suit.Diamond]: [Suit.Spade, Suit.Club],
    [Suit.Heart]: [Suit.Spade, Suit.Club]
};
