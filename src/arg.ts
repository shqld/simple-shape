import type { Shape } from "./shape";

export type ConstructorArg =
    | typeof Boolean
    | typeof Number
    | typeof String
    | typeof Array
    | typeof Object;

export type Arg =
    | ConstructorArg
    | boolean
    | number
    | string
    | symbol
    | null
    | Array<Arg>
    | { [x: string]: Arg } // 'Record<string, Arg>' causes circular references
    | RegExp
    | Shape;
