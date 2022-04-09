import { expectType } from "tsd";
import { Arg, ConstructorArg } from "./arg";
import { RecordKey } from "./record-key";
import { $key } from ".";

type ResolveConstructor<T extends ConstructorArg> = T extends typeof Boolean
    ? boolean
    : T extends typeof Number
    ? number
    : T extends typeof String
    ? string
    : T extends typeof Array
    ? Array<unknown>
    : T extends typeof Object
    ? Record<RecordKey, unknown>
    : never;

type ResolveArray<T extends Array<Arg>> = T extends Array<infer V>
    ? V extends Arg
        ? Array<ValueOf<V>>
        : never
    : never;

type ResolveKey<T extends RecordKey> = T extends symbol
    ? T extends typeof $key
        ? string
        : T
    : T;

type ResolveObject<T extends Record<RecordKey, Arg>> = T extends Record<
    infer K,
    unknown
>
    ? {
          [P in ResolveKey<K>]: K extends typeof $key
              ? ValueOf<T[K]>
              : ValueOf<T[P]>;
      }
    : never;

export type ValueOf<T extends Arg> = T extends ConstructorArg
    ? ResolveConstructor<T>
    : T extends Array<Arg>
    ? ResolveArray<T>
    : T extends Record<RecordKey, Arg>
    ? ResolveObject<T>
    : T extends RegExp
    ? string
    : T;

{
    let s!: unknown;

    expectType<string>(s as ValueOf<typeof String>);
    expectType<string>(s as ValueOf<string>);
    expectType<"string">(s as ValueOf<"string">);
    expectType<"string">(
        // @ts-expect-error - wrong value
        s as ValueOf<"">
    );
    expectType<"string">(
        // @ts-expect-error - wrong type
        s as ValueOf<number>
    );
    expectType<"string">(
        // @ts-expect-error - wrong type
        s as ValueOf<typeof Number>
    );

    expectType<Array<string>>(s as ValueOf<Array<string>>);
    expectType<Array<string>>(s as ValueOf<Array<typeof String>>);
    expectType<Array<"string">>(s as ValueOf<Array<"string">>);
    expectType<Array<"string">>(
        // @ts-expect-error - wrong value
        s as ValueOf<Array<"">>
    );
    expectType<Array<"string" | "another-string">>(
        s as ValueOf<Array<"string">>
    );
    expectType<Array<"string" | "another-string">>(
        s as ValueOf<Array<"string" | "another-string">>
    );
    expectType<Array<"string" | number>>(
        s as ValueOf<Array<"string" | number>>
    );
    expectType<Array<"string" | number>>(
        // @ts-expect-error - wrong type
        s as ValueOf<Array<"string" | boolean>>
    );
    expectType<Array<"string">>(
        // @ts-expect-error - missing value
        s as ValueOf<Array<"string" | "another-string">>
    );
    expectType<Array<"string">>(
        // @ts-expect-error - missing type
        s as ValueOf<Array<"string" | number>>
    );

    expectType<Array<string>>(
        // @ts-expect-error - wrong type
        s as ValueOf<Array<number>>
    );
    expectType<Array<string>>(
        // @ts-expect-error - wrong type
        s as ValueOf<Array<typeof Number>>
    );

    expectType<{ a: 1 }>(s as ValueOf<{ a: 1 }>);
    expectType<{ a: 1; b: "2" }>(s as ValueOf<{ a: 1; b: "2" }>);
    expectType<{ [x: string]: 1 }>(s as ValueOf<{ [K in typeof $key]: 1 }>);
    expectType<{ a: { [x: string]: 1 } }>(
        s as ValueOf<{ a: { [K in typeof $key]: 1 } }>
    );
    expectType<{ a: { [x: string]: 1 } }>(
        // @ts-expect-error - wrong value
        s as ValueOf<{ a: { [K in typeof $key]: 2 } }>
    );
    expectType<{ a: { b: string } }>(s as ValueOf<{ a: { b: typeof String } }>);
    expectType<{ a: { b: string } }>(
        // @ts-expect-error - wrong type
        s as ValueOf<{ a: { b: typeof Number } }>
    );

    expectType<string>(s as ValueOf<RegExp>);
    expectType<RegExp>(
        // @ts-expect-error - wrong type
        s as ValueOf<RegExp>
    );
}
