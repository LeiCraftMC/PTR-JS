
import type { Primitive, PublicReference } from "./types";
import { referenceProxyHandler, VALUE } from "./utils";

export type Reference<T> = PublicReference<T>;

export interface ReferenceConstructor {
	new <T, P = Primitive<T>>(value: T): Reference<P>;
	<T, P = Primitive<T>>(value: T): Reference<P>;
}

export const Reference = function(value: any) {
    return new Proxy(
        { [VALUE]: value } as any,
        referenceProxyHandler
    );
} as ReferenceConstructor;

