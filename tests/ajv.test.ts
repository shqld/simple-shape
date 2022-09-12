import { assert, test } from "vitest";
import { shape } from "../src";
import { ajv } from "./ajv";

test("validate", () => {
    const s = shape(true);

    assert(ajv.validateSchema(s));
    ajv.validate(s, true);
});
