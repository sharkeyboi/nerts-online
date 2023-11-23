"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suitPairings = exports.suits = exports.numbers = exports.cartesian = void 0;
var cartesian = function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    return a.reduce(function (a, b) { return a.flatMap(function (d) { return b.map(function (e) { return [d, e].flat(); }); }); });
};
exports.cartesian = cartesian;
exports.numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
exports.suits = ["♠️", "♣️", "♦️", "♥️"];
exports.suitPairings = {
    "♠️": ["♦️", "♥️"],
    "♣️": ["♦️", "♥️"],
    "♦️": ["♠️", "♣️"],
    "♥️": ["♠️", "♣️"]
};
