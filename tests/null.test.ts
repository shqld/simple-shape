import { assert, test } from "vitest";
import { shape } from "../src";
import { ajv } from "./ajv";

test("literal", () => {
    const s = shape(null);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "null",
    } as unknown);
});
