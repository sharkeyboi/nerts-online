import { assert } from "chai";

import { validateRiverDrop } from "~/src/serverDropHandlers";
import { LocationType } from "~/src/types/actions";

describe("Validator Tests", () => {
    it("should return nothing", () => {
        validateRiverDrop([],{
        cards: [],
        fromLocation: {
            locationType: LocationType.River,
            index: 0
        },
        toLocation: {
            locationType: LocationType.River,
            index: 1
        },
        userId: "testUsers"
    })
    assert.isFalse(true)
    })
})