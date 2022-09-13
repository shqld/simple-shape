import type { Arg } from "./arg";
import type { ResolveArg } from "./resolve-args";
import { Shape, type TypeOf } from "./shape";

export { Arg, Shape, TypeOf };

export const $key: unique symbol = Symbol("$key");

export function shape<T extends Arg>(arg: T): Shape<ResolveArg<T>>;
export function shape(arg: Arg): Shape {
    const type = typeof arg;

    switch (type) {
        case "object":
            break;
        case "boolean":
        case "number":
        case "string":
            return new Shape({ type, const: arg as never });
        case "function":
            switch (arg) {
                case Number:
                    return new Shape({ type: "number" });
                case String:
                    return new Shape({ type: "string" });
                case Boolean:
                    return new Shape({ type: "boolean" });
                case Array:
                    return new Shape({ type: "array" });
                case Object:
                    return new Shape({ type: "object" });
                default:
                    throw new Error("unexpected function");
            }
        default:
            throw new Error("unexpected type");
    }

    if (arg === null) {
        return new Shape({ type: "null" });
    }

    if (Array.isArray(arg)) {
        return new Shape({
            type: "array",
            items: shape(arg[0]),
        });
    }

    if (arg instanceof RegExp) {
        return new Shape({ type: "string", pattern: arg.source });
    }

    if (arg instanceof Shape) {
        return arg;
    }

    return new Shape({
        type: "object",
        properties: Object.fromEntries(
            Object.entries(arg).map(([key, value]) => [key, shape(value)])
        ),
    });
}
