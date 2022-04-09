import { expectType } from "tsd";
import { Arg } from "./arg";
import { Shape, TypeOf } from "./shape";
import { ValueOf } from "./valueof";

export const $key: unique symbol = Symbol("$key");

export function shape<T extends Arg>(arg: T): Shape<ValueOf<T>>;
export function shape(arg: Arg): Shape {
    if (typeof arg === "function") {
        switch (arg) {
            case Number:
                return { type: "number" };
            case String:
                return { type: "string" };
            case Boolean:
                return { type: "boolean" };
            case Array:
                return { type: "array" };
            case Object:
                return { type: "object" };
            default:
                throw new Error("unexpected function");
        }
    }

    const type = typeof arg;

    switch (type) {
        case "boolean":
        case "number":
        case "string":
            return {
                type,
                const: arg as never,
            };
    }

    if (arg === null) {
        return { type: "null" };
    }

    if (Array.isArray(arg)) {
        return {
            type: "array",
            items: shape(arg[0]),
        };
    }

    if (arg instanceof RegExp) {
        return { type: "string", pattern: arg };
    }

    throw new Error("unexpected arg");
}

{
    expectType<Shape<Record<"key", Record<string, number>>>>(
        shape({
            key: { [$key]: Number },
        })
    );

    expectType<Shape<{ a: 1 }>>(shape({ a: 1 }));
    expectType<Shape<{ a: 1 }>>(
        // @ts-expect-error - wrong value
        shape({ a: 2 } as const)
    );
    expectType<Shape<{ a: string }>>(shape({ a: String }));
    expectType<Shape<{ a: string }>>(
        // @ts-expect-error - wrong value
        shape({ a: Number })
    );

    const a = shape({ a: { b: Number } });
    a;
    const b = shape([]);
    b;

    const c = shape(/hello/);
    c;
    const d = shape([Number]);
    d;
    const e = shape(Number);
    e;

    const f = shape({ a: Number });
    f;

    const g = shape({ [$key]: Number });
    g;

    let h!: TypeOf<typeof g>;
    h;

    const x: Array<number> = [1];
    x;
}
