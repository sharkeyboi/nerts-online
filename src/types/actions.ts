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
    userID: string,
    cards: Card[],
    fromLocation: Location,
    toLocation: Location
}

export interface DropResponse {
    userID: string,
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
    userID: string,
    cards: Card[]
}