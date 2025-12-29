import { describe, it } from "mocha";
import { strict as assert } from "assert";
import { getRotation, Log } from "../src/util/log";

describe("Log data extraction", () => {
    const log = {
        skillMap: {
            s1: {},
            s2: {},
            s3: {},
            s4: {},
            s5: {},
            s6: {},
        } as Record<string, unknown>,
        players: [
            {
                name: "Player",
                rotation: [
                    { id: 1, skills: [{ castTime: -200, duration: 300 }] },
                    { id: 2, skills: [{ castTime: 100, duration: 300 }] },
                    { id: 3, skills: [{ castTime: 900, duration: 300 }] },
                    { id: 4, skills: [{ castTime: 1500, duration: 300 }] },
                    { id: 5, skills: [{ castTime: 2400, duration: 300 }] },
                    { id: 6, skills: [{ castTime: 2900, duration: 300 }] },
                ],
            },
        ],
        phases: [
            { name: "Phase 1", start: 0, end: 1000 },
            { name: "Phase 2", start: 1000, end: 2000 },
            { name: "Phase 3", start: 2500, end: 3000 },
        ],
    } as Log;

    describe("getRotation", () => {
        const rotation = getRotation(log, "Player", false);
        const rotationPhases = getRotation(log, "Player", true);

        it("returns correct rotation", () => {
            assert.deepEqual(rotation, [{ name: "", skills: [1, 2, 3, 4, 5, 6] }]);
        });

        it("handles precasted skills", () => {
            assert.equal(rotationPhases[0].skills[0], 1);
        });

        it("handles phases overlapping skills", () => {
            const phase1 = rotationPhases[0].skills;
            const phase2 = rotationPhases[1].skills;
            assert.equal(phase1[phase1.length - 1], 3);
            assert.equal(phase2[0], 4);
        });

        it("handles before phase skills", () => {
            assert.equal(rotationPhases[2].skills[0], 5);
        });

        it("handles ending skills", () => {
            const lastPhase = rotationPhases[rotationPhases.length - 1].skills;
            assert.equal(lastPhase[lastPhase.length - 1], 6);
        });

        it("returns correct phases", () => {
            assert.deepEqual(rotationPhases, [
                { name: "Phase 1", skills: [1, 2, 3] },
                { name: "Phase 2", skills: [4] },
                { name: "Phase 3", skills: [5, 6] },
            ]);
        });
    });
});
