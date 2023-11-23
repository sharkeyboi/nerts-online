import { validateRiverDrop } from "../src/serverDropHandlers";

const testSuits = ["♠️", "♣️", "♦️", "♥️"];

describe('river drop validation', () => {
    test('opposite suit, one lower number succeeds', () => {
        expect(validateRiverDrop([{
            suit: testSuits[0],
            number: "K"
        }], [{
            suit: testSuits[2],
            number: "Q"
        }])).toBe(true)
    });
    test('opposite suit, one higher number fails', () => {
        expect(validateRiverDrop([{
            suit: testSuits[0],
            number: "Q"
        }], [{
            suit: testSuits[2],
            number: "K"
        }])).toBe(false)
    })
    test('same suit fails', () => {
        expect(validateRiverDrop([{
            suit: testSuits[0],
            number: "K"
        }], [{
            suit: testSuits[0],
            number: "Q"
        }])).toBe(false)
    })
    test('empty drop fails', () => {
        expect(validateRiverDrop([{
            suit: testSuits[0],
            number: "K"
        }], [])).toBe(false)
    })
    test('empty river succeeds', () => {
        expect(validateRiverDrop([], [{
            suit: testSuits[0],
            number: "K"
        }])).toBe(true)
    })
});