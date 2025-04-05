
export {
    Reference as Ref,
    Reference
} from "./ref.js";

export declare namespace RefTypes {
    export type Constructor = import("./ref").ReferenceConstructor;
    export type Primitive<T> = import("./types").Primitive<T>;
}
