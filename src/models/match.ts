import { v4 } from "uuid";
import { GameBoard, UserSide } from "../types/board";
import { Score } from "../types/socketMessages";
import { Card } from "../types/card";
import { shuffle } from "../utils/shuffle";
import { cartesian, numbers, suits } from "../utils/cardData";
import { DropAction, LocationType } from "../types/actions";
import { Location } from "../types/actions";
import { validateLakeDrop, validateRiverDrop } from "../serverDropHandlers";
const deckOfCards: Card[] = cartesian(numbers, suits).map((elem: any[]) => {
    return {
        number: elem[0],
        suit: elem[1]
    }
})


//TODO Refactor scores into users property

// TODO Scores don't work
export interface MatchUser {
    userID: string
    scores: number[]
}

export class Match {
    scores: Score[][]
    gameBoard: GameBoard
    roomID: string
    users: MatchUser[]

    constructor(users: string[]) {
        this.scores = []
        this.roomID = v4()
        this.users = users.map(user => ({
            userID: user,
            scores: []
        }))
        this.gameBoard = this.getNewGameBoard(this.users)
    }



    getUserSide(userID: string) {
        const userSide = this.gameBoard.usersides.find(x => x.userID == userID)
        if(userSide) return userSide
        throw Error("User not found!")
    }

    resetBoard() {
        this.gameBoard = this.getNewGameBoard(this.users)
    }

    private initializeUserSide(user: string): UserSide {
        const playerCardDeck: Card[] = shuffle(deckOfCards)
        const newUser = {
            userID: user,
            nertsPile: playerCardDeck.slice(0, 13),
            riverStacks: playerCardDeck.slice(13, 18).map((card) => [card]),
            deck: playerCardDeck.slice(18),
            stack: [],
            points: 0,
            ready: false
        }
        return newUser
    }

    private getNewGameBoard(users: MatchUser[]) {
        const gameBoard: GameBoard = {
            usersides: users.map(user => this.initializeUserSide(user.userID)),
            lake: Array.from(Array(8), () => [])
        }
        return gameBoard
    }

    addUserToGameBoard(userID: string) {
        this.gameBoard.usersides.push(this.initializeUserSide(userID))
        this.users.push({
            userID: userID,
            scores: []
        })
    }

    removeUserFromGameBoard(userID: string) {
        this.gameBoard.usersides = this.gameBoard.usersides.filter(x => x.userID != userID)
    }

    deal(userID: string): boolean {
        const userSide = this.getUserSide(userID)
        console.log(userSide.deck)
        const dealtCards = userSide.deck.slice(0, 3)
        if (dealtCards.length == 0) {
            this.moveStackToDeck(userSide)
            return false
        }
        userSide.deck = userSide.deck.slice(dealtCards.length)
        userSide.stack = userSide.stack.concat(dealtCards)
        console.log(userSide.stack)
        return true
    }

    private moveStackToDeck(userSide: UserSide) {
        userSide.deck = [...userSide.stack]
        userSide.stack = []
    }

    drop(dropAction: DropAction): boolean {
        if (this.validateTake(dropAction)){
            console.log("TAKE VALIDATED")
            if(this.validateDrop(dropAction)) {
                console.log("DROP VALIDATED")
                this.placeInLocation(dropAction.userID, dropAction.toLocation, dropAction.cards)
                this.removeFromLocation(dropAction.userID, dropAction.fromLocation, dropAction.cards)
                return true
            }
        }
        return false
    }

    placeInLocation(userID: string, location: Location, cards: Card[]) {
        let userSide = this.getUserSide(userID)
        if (!userSide) return
        switch (location.locationType) {
            case (LocationType.Lake):
                cards.forEach((card) => {
                    this.gameBoard.lake[location.index].push(card)
                })
                userSide.points += 1
                break;
            case (LocationType.River):
                const riverStack = userSide.riverStacks[location.index];
                cards.forEach((card) => {
                    riverStack.push(card)
                })
                break;
        }
    }

    removeFromLocation(userID: string, location: Location, cards: Card[]) {
        let userSide = this.getUserSide(userID)
        if (!userSide) return
        switch (location.locationType) {
            case (LocationType.River):
                const riverStack = userSide.riverStacks[location.index];
                cards.forEach(card => {
                    const index = riverStack.indexOf(card)
                        riverStack.splice(index, 1)
                })
                console.log(riverStack)
                break
            case (LocationType.Nerts):
                const nertsStack = userSide.nertsPile
                cards.forEach((card) => {
                    const index = nertsStack.indexOf(card)
                    nertsStack.splice(index, 1)
                })
                break
            case (LocationType.Stack):
                const stack = userSide.stack
                cards.forEach((card) => {
                    const index = stack.indexOf(card)
                    stack.splice(index, 1)
                })
                break
        }
    }

    private validateDrop(dropAction: DropAction): boolean {
        switch (dropAction.toLocation.locationType) {
            case (LocationType.Lake):
                const lakePile = this.gameBoard.lake[dropAction.toLocation.index]
                return validateLakeDrop(lakePile, dropAction.cards)
            case (LocationType.River):
                const userSide = this.getUserSide(dropAction.userID)
                if (!userSide) return false
                const riverStack = userSide.riverStacks[dropAction.toLocation.index]
                if (!riverStack) return false
                console.log(riverStack)
                return validateRiverDrop(riverStack, dropAction.cards)
        }
        return false
    }

    private validateTake(dropAction: DropAction): boolean {
        const userSide = this.getUserSide(dropAction.userID)
        if (!userSide) return false
        console.log("USER SIDE EXISTS")
        switch (dropAction.fromLocation.locationType) {
            case (LocationType.River):
                const riverStack = userSide.riverStacks[dropAction.fromLocation.index]
                
                if (!riverStack) return false
                console.log("TAKING FROM RIVER")
                console.log(riverStack)
                console.log(dropAction.cards[0])
                console.log(riverStack.includes(dropAction.cards[0]))
                console.log(dropAction.cards.every(card => riverStack.some(item => item.number == card.number && item.suit == card.suit)))
                return dropAction.cards.every(card => riverStack.some(item => item.number == card.number && item.suit == card.suit))
            case (LocationType.Nerts):
                const nertsStack = userSide.nertsPile
                return dropAction.cards.every(card => nertsStack.some(item => item.number == card.number && item.suit == card.suit))
            case (LocationType.Stack):
                const stack = userSide.stack
                console.log("Taking from Stack")
                console.log(stack)
                console.log(dropAction.cards[0])
                console.log(stack.includes(dropAction.cards[0]))
                console.log(dropAction.cards.every(card => stack.some(item => item.number == card.number && item.suit == card.suit)))
                
                return dropAction.cards.every(card => stack.some(item => item.number == card.number && item.suit == card.suit))
        }
        return false
    }

    readyForStart(userID: string) {
        const userSide = this.getUserSide(userID)
        userSide.ready = true
    }

    roundEnd(userID: string): boolean {
        const userSide = this.getUserSide(userID)
        if (!userSide) return false
        if (userSide.nertsPile.length > 0) return false
        const currScores: Score[] = []
        this.gameBoard.usersides.forEach((userSide) => {
            userSide.ready = false
            currScores.push({
                userID: userID,
                score: userSide.points - (2 * userSide.nertsPile.length)
            })
        })
        this.scores.push(currScores)
        return true
    }


}
