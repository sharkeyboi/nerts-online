import  type { DropAction } from "~/src/types/actions";
import type { Card } from "~/src/types/card";
import { numbers, suitPairings } from "./utils/cardData";

export function validateRiverDrop(riverPile: Card[], dropAction: DropAction): boolean {
    const topRiverCard = riverPile[riverPile.length - 1];
    if (!(suitPairings[topRiverCard.suit].includes(dropAction.cards[0].suit))) return false;
    if (!(topRiverCard.number == numbers[numbers.indexOf(dropAction.cards[0].number) + 1])) return false;
    return true;
}
