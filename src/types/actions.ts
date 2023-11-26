import type { Card } from "./card";

export enum LocationType {
    River = "RIVER",
    Lake = "LAKE",
    Stack = "STACK",
    Nerts = "NERTS"
}

export interface Location {
    index: number
    locationType: LocationType
}

export interface ClientDragAction {
    cards: Card[],
    fromLocation: Location
}

export interface DropAction {
    userId: string,
    cards: Card[],
    fromLocation: Location,
    toLocation: Location
}

export interface DropResponse {
    userId: string,
    cards: Card[],
    fromLocation: Location,
    toLocation: Location
}

export class ActionError extends Error {
    constructor(msg: string) {
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ActionError.prototype);
    }
}

export interface ReshuffleResponse {
    userId: string,
    cards: Card[]
}