import type { JSONSchema7 } from "json-schema";

export type TypeOf<S extends Shape> = S extends Shape<infer V> ? V : never;

export class Shape<T = unknown> implements JSONSchema7 {
    __shape?: T;

    type: JSONSchema7["type"];

    constructor(schema: JSONSchema7) {
        Object.assign(this, schema);
    }
}
