export type TypeOf<S extends Shape> = S extends Shape<infer V> ? V : never;

export type ShapeType = Shape["type"];

export type Shape<T = unknown> = { __shape?: T } & (
    | {
          type: "boolean";
          const?: boolean;
      }
    | {
          type: "number";
          const?: number;
      }
    | {
          type: "string";
          const?: string;
          pattern?: RegExp;
      }
    | {
          type: "null";
          properties?: Record<string, Shape>;
      }
    | {
          type: "array";
          items?: Shape;
      }
    | {
          type: "object";
          properties?: Record<string, Shape>;
      }
);
