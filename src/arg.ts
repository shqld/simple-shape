import { RecordKey } from "./record-key";

export type ConstructorArg =
    | typeof Boolean
    | typeof Number
    | typeof String
    | typeof Array
    | typeof Object;

export type PrimitiveArg = boolean | number | string | symbol | null;

export type NonPrimitiveArg = Array<Arg> | { [key in RecordKey]: Arg } | RegExp;

export type ValueArg = PrimitiveArg | NonPrimitiveArg;

export type Arg = ConstructorArg | ValueArg;
