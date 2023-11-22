export const cartesian = (...a: any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
export const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
export const suits = ["♠️", "♣️", "♦️", "♥️"];
export const suitPairings: {
    [key: string]: string[];
} = {
    "♠️": ["♦️", "♥️"],
    "♣️": ["♦️", "♥️"],
    "♦️": ["♠️", "♣️"],
    "♥️": ["♠️", "♣️"]
};
