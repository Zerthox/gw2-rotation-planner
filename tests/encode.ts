import {describe, it} from "mocha";
import {strict as assert} from "assert";
import {encodeShare, decodeShare} from "../src/util/encode";

describe("Share link encoding", () => {
    const rows = [
        {
            name: "Foo",
            skills: [12633, 12497, 12469, 1]
        },
        {
            name: "Bar",
            skills: [12492, 12638, 40729, 12639]
        },
        {
            name: "Baz",
            skills: [1, 41524, 12466, 2, 3, 12511, 2**24 - 1]
        }
    ];

    describe("encode", () => {
        it("does not error", () => {
            assert.doesNotThrow(() => encodeShare(rows));
        });
    });

    describe("decode", () => {
        const encoded = encodeShare(rows);

        it("does not error", () => {
            assert.doesNotThrow(() => decodeShare(encoded));
        });

        it("returns right amount of rows", () => {
            assert.equal(decodeShare(encoded).length, rows.length);
        });

        it("returns correct row names", () => {
            assert.deepEqual(decodeShare(encoded).map((row) => row.name), rows.map((row) => row.name));
        });

        it("returns correct skill ids", () => {
            assert.deepEqual(decodeShare(encoded).map((row) => row.skills), rows.map((row) => row.skills));
        });
    });
});
