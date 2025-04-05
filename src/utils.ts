import type { Reference } from "./ref";

export const VALUE = Symbol("value");

export const referenceProxyHandler: ProxyHandler<Reference<any>> = {
    get(ref: Reference<any>, prop: any) {
        if (prop === 'set') return (v: string) => (ref[VALUE] = v);
        if (prop === 'get') return () => ref[VALUE];

        const fn = (ref[VALUE])[prop];
        if (typeof fn === 'function') {
            return fn.bind(ref[VALUE]);
        }

        return ref[VALUE][prop];
    },
    set(ref: Reference<any>, prop: any, newValue: any) {
        return ref[VALUE][prop]
    }
};



