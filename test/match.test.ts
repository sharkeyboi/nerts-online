import { v4 } from "uuid";
import { Match } from "../src/models/match";
import { Card, Suit } from "../src/types/card";
import { DropAction, LocationType } from "../src/types/actions";

describe("match class", () => {
    let newMatch: Match
    const users = ["Eric", "John"]
    const aceOfSpades: Card = {
        suit: Suit.Spade,
        number: "A"
    }
    const queenOfHearts: Card = {
        suit: Suit.Heart,
        number: "Q"
    }
    beforeEach(() => {
        newMatch = new Match(users)
    })
    test("properly initialized", () => {
        expect(newMatch.scores).toEqual([])
        expect(newMatch.gameBoard.usersides.length).toEqual(2)
        expect(newMatch.gameBoard.usersides[0].userID).toEqual("Eric")
        expect(newMatch.gameBoard.usersides[1].userID).toEqual("John")
    })
    test("add user to gameboard", () => {
        newMatch.addUserToGameBoard("Bob")
        expect(newMatch.gameBoard.usersides[2].userID).toEqual("Bob")
    })
    test("remove user from gameboard", () => {
        console.log(newMatch.users)
        expect(newMatch.gameBoard.usersides.length).toEqual(2)
        newMatch.removeUserFromGameBoard("Eric")
        expect(newMatch.gameBoard.usersides.length).toEqual(1)
    })
    test("handles dealing", () => {
        const deckLength = newMatch.gameBoard.usersides[0].deck.length
        newMatch.deal("Eric")
        expect(newMatch.gameBoard.usersides[0].stack.length).toEqual(3)
        expect(newMatch.gameBoard.usersides[0].deck.length).toEqual(deckLength - 3)
    })
    test("test reshuffles after empty deal", () => {
        let userSide = newMatch.gameBoard.usersides[0]
        userSide.deck = []
        userSide.stack = [aceOfSpades]
        newMatch.deal("Eric")
        expect(userSide.deck).toEqual([aceOfSpades])
        expect(userSide.stack).toEqual([])
    })
    test("drop from river to lake", () => {
        let userSide = newMatch.gameBoard.usersides[0]
        userSide.riverStacks[0] = [aceOfSpades]
        const dropAction: DropAction = {
            toLocation: {
                locationType: LocationType.Lake,
                index: 0
            },
            fromLocation: {
                locationType: LocationType.River,
                index: 0
            },
            userID: "Eric",
            cards: userSide.riverStacks[0]
        }
        newMatch.drop(dropAction)
        expect(newMatch.gameBoard.lake[0][0]).toEqual(aceOfSpades)
        expect(userSide.riverStacks[0]).toEqual([])
    })
    test("place in lake", () => {
        newMatch.placeInLocation("Eric", {
            locationType: LocationType.Lake,
            index: 0
        }, [aceOfSpades])
        expect(newMatch.gameBoard.lake[0][0]).toEqual(aceOfSpades)
    })
    test("remove from river", () => {
        newMatch.removeFromLocation("Eric", {
            locationType: LocationType.River,
            index: 0
        }, newMatch.gameBoard.usersides[0].riverStacks[0])
        expect(newMatch.gameBoard.usersides[0].riverStacks[0]).toEqual([])
    })
    test("invalid drop from river into lake fails", () => {
        let userSide = newMatch.gameBoard.usersides[0]
        userSide.riverStacks[0] = [queenOfHearts]
        const dropAction: DropAction = {
            toLocation: {
                locationType: LocationType.Lake,
                index: 0
            },
            fromLocation: {
                locationType: LocationType.River,
                index: 0
            },
            userID: "Eric",
            cards: userSide.riverStacks[0]
        }
        newMatch.drop(dropAction)
        expect(newMatch.gameBoard.lake[0]).toEqual([])
    })

    test("can not drop cards that don't exist in from location", () => {
        let userSide = newMatch.gameBoard.usersides[0]
        userSide.riverStacks[0] = [queenOfHearts]
        const dropAction: DropAction = {
            toLocation: {
                locationType: LocationType.Lake,
                index: 0
            },
            fromLocation: {
                locationType: LocationType.River,
                index: 0
            },
            userID: "Eric",
            cards: [aceOfSpades]
        }
        newMatch.drop(dropAction)
        expect(newMatch.gameBoard.lake[0]).toEqual([])
    })
    test("place in river", () => {
        newMatch.placeInLocation("Eric", {
            locationType: LocationType.River,
            index: 0
        }, [aceOfSpades])
        expect(newMatch.gameBoard.usersides[0].riverStacks[0]).toContain(aceOfSpades)
    })
    test("adds points on lake drop", () => {
        let userSide = newMatch.gameBoard.usersides[0]
        userSide.riverStacks[0] = [aceOfSpades]
        const dropAction: DropAction = {
            toLocation: {
                locationType: LocationType.Lake,
                index: 0
            },
            fromLocation: {
                locationType: LocationType.River,
                index: 0
            },
            userID: "Eric",
            cards: userSide.riverStacks[0]
        }
        newMatch.drop(dropAction)
        expect(newMatch.gameBoard.usersides[0].points).toEqual(1)
    })
    test("round can't end if nerts pile isn't empty", () => {
        newMatch.roundEnd("Eric")
        expect(newMatch.scores).toEqual([])
    })
    test("points calculated at round end", () => {
        newMatch.gameBoard.usersides[0].nertsPile = []
        newMatch.roundEnd("Eric")
        expect(newMatch.scores.length).toEqual(1) //First array is per round
        expect(newMatch.scores[0].length).toEqual(2) // Second array is per user
        expect(newMatch.scores[0][0].score).toEqual(0)
        expect(newMatch.scores[0][1].score).toEqual(-26)
    })
    test("no nerts cards in deck", () => {
        newMatch.gameBoard.usersides[0].nertsPile.forEach((card) => {
            expect(newMatch.gameBoard.usersides[0].deck.some(deckCard=>deckCard.number==card.number && deckCard.suit == card.suit)).toBeFalsy()
        })
    })
})

