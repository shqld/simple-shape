import { assert, test } from "vitest";
import { shape } from "../src";
import { ajv } from "./ajv";

test("literal", () => {
    const s = shape(0);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "number",
        const: 0,
    } as unknown);
});
