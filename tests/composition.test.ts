import { assert, test } from "vitest";
import { shape } from "../src";
import { anyOf } from "../src/compoisition";
import { ajv } from "./ajv";

test("anyOf", () => {
    assert.deepStrictEqual(anyOf(true), shape(anyOf(true)));
});

test("anyOf", () => {
    const s = anyOf(true, false);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        anyOf: [
            { type: "boolean", const: true },
            { type: "boolean", const: false },
        ],
    } as unknown);
});
