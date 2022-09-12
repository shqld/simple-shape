import { assert, test } from "vitest";
import { shape } from "../src";
import { ajv } from "./ajv";

test("boolean", () => {
    const s = shape(Boolean);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "boolean",
    } as unknown);
});

test("number", () => {
    const s = shape(Number);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "number",
    } as unknown);
});

test("string", () => {
    const s = shape(String);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "string",
    } as unknown);
});

test("array", () => {
    const s = shape(Array);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "array",
    } as unknown);
});

test("object", () => {
    const s = shape(Object);

    assert(ajv.validateSchema(s));
    assert.deepStrictEqual(s, {
        type: "object",
    } as unknown);
});

test("unexpected constructor", () => {
    // @ts-expect-error - unexpected constructor
    assert.throw(() => shape(BigInt));
    // @ts-expect-error - unexpected constructor
    assert.throw(() => shape(Symbol));
});

test("unexpected function", () => {
    // @ts-expect-error - unexpected constructor
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-empty-function
    assert.throw(() => shape(() => {}));
});
