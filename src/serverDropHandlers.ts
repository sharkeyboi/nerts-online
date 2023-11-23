import type { Card } from "~/src/types/card";
import { numbers, suitPairings } from "./utils/cardData";

export function validateRiverDrop(riverPile: Card[], dropCards: Card[]): boolean {
    if (riverPile.length == 0) return true
    if (dropCards.length == 0) return false
    const topRiverCard = riverPile[riverPile.length - 1];
    if (!(suitPairings[topRiverCard.suit].includes(dropCards[0].suit))) return false;
    if (!(topRiverCard.number == numbers[numbers.indexOf(dropCards[0].number) + 1])) return false;
    return true;
}
export function validateLakeDrop(lakePile: Card[], dropCards: Card[]): boolean {
    if (dropCards.length != 1) return false
    const currCard = dropCards[0]

    if (!lakePile) return false
    if (lakePile.length == 0) {
        if (currCard.number != numbers[0]) return false // If the pile is empty, have to put an Ace here
    }
    else {
        const topLake = lakePile[lakePile.length]
        if (currCard.suit != topLake.suit) return false // Has to match suit
        if (currCard.number != numbers[numbers.indexOf(topLake.number) + 1]) return false // Has to be one number higher
    }
    return true
}

