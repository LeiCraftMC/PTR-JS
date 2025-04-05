import type { VALUE } from "./utils";

export type Primitive<T> =
	T extends string ? string :
	T extends number ? number :
	T extends boolean ? boolean :
	T extends bigint ? bigint :
	T;

export type Reference<T> = PublicReference<T> & {
	[VALUE]: T;
}

export type PublicReference<T> = T & {
	getV(): T;
	valueOf(): T;
	setV(v: T): T;
}
