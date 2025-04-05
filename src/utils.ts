import type { Reference } from "./ref";

export const VALUE = Symbol("value");

export const referenceProxyHandler: ProxyHandler<Reference<any>> = {

    apply(ref: Reference<any>, thisArg: any, args: any[]) {
        return ref[VALUE].apply(thisArg, args);
    },

    construct(ref: Reference<any>, args: any[], newTarget: Function) {
        return new ref[VALUE](...args);
    },

    defineProperty(ref: Reference<any>, prop: any, descriptor: PropertyDescriptor) {
        Object.defineProperty(ref[VALUE], prop, descriptor);
        return true;
    },

    deleteProperty(ref: Reference<any>, prop: any) {
        return delete ref[VALUE][prop];
    },

    get(ref: Reference<any>, prop: any) {
        if (prop === 'setV') return (v: string) => (ref[VALUE] = v);
        if (prop === 'getV') return () => ref[VALUE];

        const fn = (ref[VALUE])[prop];
        if (typeof fn === 'function') {
            return fn.bind(ref[VALUE]);
        }

        return ref[VALUE][prop];
    },

    getOwnPropertyDescriptor(ref: Reference<any>, prop: any) {
        return Object.getOwnPropertyDescriptor(ref[VALUE], prop);
    },

    getPrototypeOf(ref: Reference<any>) {
        return Object.getPrototypeOf(ref[VALUE]);
    },

    has(ref: Reference<any>, prop: any) {
        return prop in ref[VALUE];
    },

    isExtensible(ref: Reference<any>) {
        return Object.isExtensible(ref[VALUE]);
    },

    ownKeys(ref: Reference<any>) {
        return Object.keys(ref[VALUE]);
    },

    preventExtensions(ref: Reference<any>) {
        return Object.preventExtensions(ref[VALUE]);
    },

    set(ref: Reference<any>, prop: any, newValue: any) {
        ref[VALUE][prop] = newValue;
        return true;
    },

    setPrototypeOf(ref: Reference<any>, newProto: any) {
        return Object.setPrototypeOf(ref[VALUE], newProto);
    }
};



