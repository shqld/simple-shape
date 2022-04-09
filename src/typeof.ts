import { ShapeType } from "./shape";

export function typeOf(value: unknown): ShapeType {
    switch (typeof value) {
        case "string":
            return "string";
        case "boolean":
            return "boolean";
        case "number":
            return "number";
        case "object":
            if (value === null) {
                return "null";
            } else if (Array.isArray(value)) {
                return "array";
            }

            return "object";
        default:
            throw new Error("unknown type");
    }
}
