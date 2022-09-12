import { assert, test } from "vitest";
import { shape } from "../src";
import { ajv } from "./ajv";

test("literal", () => {
    const s = shape("foo");

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "string",
        const: "foo",
    } as unknown);
});

test("RegExp", () => {
    const s = shape(/^foo$/);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "string",
        pattern: "^foo$",
    } as unknown);
});
