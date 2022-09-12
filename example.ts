/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function, @typescript-eslint/ban-ts-comment, @typescript-eslint/ban-types */

import { $key, shape, Shape } from "./src";
import { anyOf } from "./src/compoisition";

const check = <Expected>(shape: Shape<Expected>): void => {};

check<boolean>(shape(Boolean));
check<number>(shape(Number));
check<string>(shape(String));

check<true>(shape(true));
check<false>(shape(false));
// @ts-expect-error
check<true>(shape(false));

check<0>(shape(0));
// @ts-expect-error
check(shape(0n));

check<"">(shape(""));
check<"hello">(shape("hello"));
check<"hello">(shape("hello"));

check<null>(shape(null));

// @ts-expect-error
check(shape(undefined));

// TODO: fix
check<[]>(shape([]));
check<Array<unknown>>(shape(Array));
check<Array<number>>(shape(Array(Number)));
check<Array<number>>(shape([Number]));
// @ts-expect-error
check<Array<number>>(shape(Array(String)));
// @ts-expect-error
check<Array<number>>(shape([String]));

check<{}>(shape({}));
check<{}>(shape(Object));
check<{ [x: string]: string }>(shape({ [$key]: String }));
check<{ a: number }>(shape({ a: Number }));
check<{ a: { b: number } }>(shape({ a: { b: Number } }));
check<{ a: 1 }>(shape({ a: 1 } as const));
check<{ a: { b: 1 } }>(shape({ a: { b: 1 } } as const));
// @ts-expect-error
check<{ [x: string]: string }>(shape({ [$key]: Number }));
// @ts-expect-error
check<{ a: number }>(shape({ a: String }));
// @ts-expect-error
check<{ a: 1 }>(shape({ a: 2 } as const));
// @ts-expect-error
check<{ a: { b: 1 } }>(shape({ a: { b: 2 } } as const));

check<string>(shape(/./));
// @ts-expect-error
check<RegExp>(shape(/./));

check<string | number>(anyOf(String, Number));
check<number>(anyOf(1, Number)); // merge 1 and Number into number
check<{ a: 1 } | { b: 2 }>(anyOf({ a: 1 } as const, { b: 2 } as const));
check<"a" | "b">(anyOf("a", "b"));
check<"hello" | number>(anyOf("hello", Number));
check<"hello" | 1>(anyOf("hello", 1));
// @ts-expect-error
check<{ a: 1 } | { b: 2 }>(anyOf({ a: 1 } as const, { b: 3 } as const));
// @ts-expect-error
check<"a" | "b">(anyOf("a", "c"));
// @ts-expect-error
check<"hell" | 1>(anyOf("hello", 1));
// @ts-expect-error
check<"hello" | 2>(anyOf("hello", 1));
