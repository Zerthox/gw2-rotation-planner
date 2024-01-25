import {describe, it} from "mocha";
import {strict as assert} from "assert";
import {effectiveDuration, minimizeDuration, nextHigherDuration} from "../src/util/condi-duration";

describe("Condi duration calculations", () => {
    describe("effectiveDuration", () => {
        it("returns correct duration for simple", () => {
            assert.equal(effectiveDuration(1_000, 32.00), 1_320);
            assert.equal(effectiveDuration(1_000, 32.01), 1_360);
            assert.equal(effectiveDuration(1_000, 33.00), 1_360);
            assert.equal(effectiveDuration(1_000, 36.00), 1_360);
            assert.equal(effectiveDuration(1_000, 36.01), 1_400);
        });
        it("returns correct duration for base with fraction", () => {
            const base = 1_200;
            assert.equal(effectiveDuration(base, 30.00), 1_560);
            assert.equal(effectiveDuration(base, 30.01), 1_600);
            assert.equal(effectiveDuration(base, 33.00), 1_600);
            assert.equal(effectiveDuration(base, 33.33), 1_600);
            assert.equal(effectiveDuration(base, 33.34), 1_640);
        });
        it("returns correct duration for large", () => {
            const base = 100_000;
            assert.equal(effectiveDuration(base, 99.60), 199_600);
            assert.equal(effectiveDuration(base, 99.61), 199_640);
            assert.equal(effectiveDuration(base, 99.64), 199_640);
            assert.equal(effectiveDuration(base, 99.65), 199_680);
        });
    });

    describe("minimizeDuration", () => {
        it("returns correct duration for simple", () => assert.equal(minimizeDuration(1_000, 33.00), 32.01));
        it("returns correct duration for base with fraction", () => assert.equal(minimizeDuration(1_200, 33.00), 30.01));
        it("returns correct duration for large", () => assert.equal(minimizeDuration(100_000, 99.61), 99.61));
    });

    describe("nextHigherDuration", () => {
        it("returns correct duration for simple", () => assert.equal(nextHigherDuration(1_000, 33.00), 36.01));
        it("returns correct duration for base with fraction", () => assert.equal(nextHigherDuration(1_200, 33.00), 33.34));
        it("returns correct duration for large", () => assert.equal(nextHigherDuration(100_000, 99.61), 99.65));
        it("returns no duration for highest", () => {
            assert.equal(nextHigherDuration(1_000, 100), null);
            assert.equal(nextHigherDuration(3_000, 99.67), null);
        });
    });
});
