import { Suit } from "../src/types/card";
import { validateRiverDrop } from "../src/serverDropHandlers";


describe('validateRiverDrop()', () => {
    test('opposite suit, one lower number succeeds', () => {
        expect(validateRiverDrop([{
            suit: Suit.Heart,
            number: "K"
        }], [{
            suit: Suit.Spade,
            number: "Q"
        }])).toBe(true)
    });
    test('opposite suit, one higher number fails', () => {
        expect(validateRiverDrop([{
            suit: Suit.Heart,
            number: "Q"
        }], [{
            suit: Suit.Spade,
            number: "K"
        }])).toBe(false)
    })
    test('same suit fails', () => {
        expect(validateRiverDrop([{
            suit: Suit.Heart,
            number: "K"
        }], [{
            suit: Suit.Heart,
            number: "Q"
        }])).toBe(false)
    })
    test('empty drop fails', () => {
        expect(validateRiverDrop([{
            suit: Suit.Heart,
            number: "K"
        }], [])).toBe(false)
    })
    test('empty river succeeds', () => {
        expect(validateRiverDrop([], [{
            suit: Suit.Heart,
            number: "K"
        }])).toBe(true)
    })
});