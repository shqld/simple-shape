export type SingleItemArray<T, R extends T[] = []> = R["length"] extends 1
    ? R
    : SingleItemArray<T, [T, ...R]>;
