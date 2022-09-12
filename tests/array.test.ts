import { assert, test } from "vitest";
import { shape } from "../src";
import { ajv } from "./ajv";

test.todo("empty", () => {
    const s = shape([]);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "array",
        items: [],
    } as unknown);
});

test("[Number]", () => {
    const s = shape([Number]);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "array",
        items: {
            type: "number",
        },
    } as unknown);
});

test("[String]", () => {
    const s = shape([String]);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "array",
        items: {
            type: "string",
        },
    } as unknown);
});

test("[Boolean]", () => {
    const s = shape([Boolean]);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "array",
        items: {
            type: "boolean",
        },
    } as unknown);
});

test("[null]", () => {
    const s = shape([null]);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "array",
        items: {
            type: "null",
        },
    } as unknown);
});

// TODO: nested
