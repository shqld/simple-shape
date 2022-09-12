import { ResolveArg } from "./resolve-args";
import { Arg, Shape, shape } from ".";

export function anyOf<T extends Array<Arg>>(
    ...args: T
): T extends Array<infer V>
    ? V extends Arg
        ? Shape<ResolveArg<V>>
        : never
    : never;
export function anyOf(...args: Array<Arg>): Shape {
    return new Shape({
        anyOf: args.map(shape),
    });
}
