import { expectType } from "tsd";
import type { Arg, ConstructorArg } from "./arg";
import type { Shape } from "./shape";
import type { $key } from ".";

type ResolveConstructor<T extends ConstructorArg> = T extends typeof Boolean
    ? boolean
    : T extends typeof Number
    ? number
    : T extends typeof String
    ? string
    : T extends typeof Array
    ? Array<unknown>
    : T extends typeof Object
    ? Record<string, unknown>
    : never;

type ResolveArray<T extends Array<Arg>> = T extends Array<infer V>
    ? V extends Arg
        ? Array<ResolveArg<V>>
        : never
    : never;

type ResolveObject<T extends Record<string, Arg>> = T extends Record<
    infer K,
    unknown
>
    ? {
          [P in K extends typeof $key ? string : K]: K extends typeof $key
              ? ResolveArg<T[K]>
              : ResolveArg<T[P]>;
      }
    : never;

export type ResolveArg<T extends Arg> = T extends ConstructorArg
    ? ResolveConstructor<T>
    : T extends Array<Arg>
    ? ResolveArray<T>
    : T extends Record<string, Arg>
    ? ResolveObject<T>
    : T extends RegExp
    ? string
    : T extends Shape<infer V>
    ? V
    : T;

if (process.env.NODE_ENV === "production") {
    let s!: unknown;

    expectType<string>(s as ResolveArg<typeof String>);
    expectType<string>(s as ResolveArg<string>);
    expectType<"string">(s as ResolveArg<"string">);
    expectType<"string">(
        // @ts-expect-error - wrong value
        s as ResolveArg<"">
    );
    expectType<"string">(
        // @ts-expect-error - wrong type
        s as ResolveArg<number>
    );
    expectType<"string">(
        // @ts-expect-error - wrong type
        s as ResolveArg<typeof Number>
    );

    expectType<Array<string>>(s as ResolveArg<Array<string>>);
    expectType<Array<string>>(s as ResolveArg<Array<typeof String>>);
    expectType<Array<"string">>(s as ResolveArg<Array<"string">>);
    expectType<Array<"string">>(
        // @ts-expect-error - wrong value
        s as ResolveArg<Array<"">>
    );
    expectType<Array<"string" | "another-string">>(
        s as ResolveArg<Array<"string">>
    );
    expectType<Array<"string" | "another-string">>(
        s as ResolveArg<Array<"string" | "another-string">>
    );
    expectType<Array<"string" | number>>(
        s as ResolveArg<Array<"string" | number>>
    );
    expectType<Array<"string" | number>>(
        // @ts-expect-error - wrong type
        s as ResolveArg<Array<"string" | boolean>>
    );
    expectType<Array<"string">>(
        // @ts-expect-error - missing value
        s as ResolveArg<Array<"string" | "another-string">>
    );
    expectType<Array<"string">>(
        // @ts-expect-error - missing type
        s as ResolveArg<Array<"string" | number>>
    );

    expectType<Array<string>>(
        // @ts-expect-error - wrong type
        s as ResolveArg<Array<number>>
    );
    expectType<Array<string>>(
        // @ts-expect-error - wrong type
        s as ResolveArg<Array<typeof Number>>
    );

    expectType<{ a: 1 }>(s as ResolveArg<{ a: 1 }>);
    expectType<{ a: 1; b: "2" }>(s as ResolveArg<{ a: 1; b: "2" }>);
    expectType<{ [x: string]: 1 }>(s as ResolveArg<{ [K in typeof $key]: 1 }>);
    expectType<{ a: { [x: string]: 1 } }>(
        s as ResolveArg<{ a: { [K in typeof $key]: 1 } }>
    );
    expectType<{ a: { [x: string]: 1 } }>(
        // @ts-expect-error - wrong value
        s as ResolveArg<{ a: { [K in typeof $key]: 2 } }>
    );
    expectType<{ a: { b: string } }>(
        s as ResolveArg<{ a: { b: typeof String } }>
    );
    expectType<{ a: { b: string } }>(
        // @ts-expect-error - wrong type
        s as ResolveArg<{ a: { b: typeof Number } }>
    );

    expectType<string>(s as ResolveArg<RegExp>);
    expectType<RegExp>(
        // @ts-expect-error - wrong type
        s as ResolveArg<RegExp>
    );
}
