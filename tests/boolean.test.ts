import { assert, test } from "vitest";
import { shape } from "../src";
import { ajv } from "./ajv";

test("true", () => {
    const s = shape(true);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "boolean",
        const: true,
    } as unknown);
});

test("false", () => {
    const s = shape(false);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "boolean",
        const: false,
    } as unknown);
});
