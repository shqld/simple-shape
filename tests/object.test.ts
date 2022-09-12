import { assert, test } from "vitest";
import { shape } from "../src";
import { ajv } from "./ajv";

test("empty", () => {
    const s = shape({});

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "object",
        properties: {},
    } as unknown);
});

test("foo: 1", () => {
    const s = shape({ foo: 1 });

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "object",
        properties: {
            foo: {
                type: "number",
                const: 1,
            },
        },
    } as unknown);
});

test("foo: 'bar'", () => {
    const s = shape({ foo: "bar" });

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "object",
        properties: {
            foo: {
                type: "string",
                const: "bar",
            },
        },
    } as unknown);
});

test("foo: true", () => {
    const s = shape({ foo: true });

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "object",
        properties: {
            foo: {
                type: "boolean",
                const: true,
            },
        },
    } as unknown);
});

test("foo: null", () => {
    const s = shape({ foo: null });

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "object",
        properties: {
            foo: {
                type: "null",
            },
        },
    } as unknown);
});

// TODO: nested
