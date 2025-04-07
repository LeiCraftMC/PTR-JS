
import type { Primitive, PublicReference } from "./types";
import { IS_REF, referenceProxyHandler, VALUE } from "./utils";

export type Reference<T> = PublicReference<T>;

export interface ReferenceConstructor {
	new <T, P = Primitive<T>>(value: T): Reference<P>;
	<T, P = Primitive<T>>(value: T): Reference<P>;

    isRef(value: any): value is Reference<any>;
}

export const Reference = function(value: any) {
    return new Proxy(
        { [VALUE]: value } as any,
        referenceProxyHandler
    );
} as ReferenceConstructor;

Reference.isRef = function(value: any): value is Reference<any> {
    return value && value[IS_REF] === true;
}