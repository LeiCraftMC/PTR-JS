
import type { Primitive, PublicReference } from "./types";
import { IS_REF, referenceProxyHandler, VALUE } from "./utils";

export type Reference<T> = PublicReference<T>;

export interface ReferenceConstructor {
	new <T, P = Primitive<T>>(value: T): Reference<P>;
	<T, P = Primitive<T>>(value: T): Reference<P>;

    isRef(value: any): value is Reference<any>;
}

/**
 * Creates a new Reference with the given value.
 * @param value The value to wrap in a Reference object.
 * @returns A new Reference object or the original value if it is already a Reference.
 */
export const Reference = function(value: any) {
    if (Reference.isRef(value)) {
        return value;
    }
    return new Proxy(
        { [VALUE]: value } as any,
        referenceProxyHandler
    );
} as ReferenceConstructor;

/**
 * Checks if the given value is a Reference
 * @param value The value to check.
 * @returns true if the value is a Reference, false otherwise.
 */
Reference.isRef = function(value: any): value is Reference<any> {
    return value && value[IS_REF] === true;
}
