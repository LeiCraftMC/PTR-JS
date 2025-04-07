import type { VALUE } from "./utils";

export type Primitive<T> =
	T extends string ? string :
	T extends number ? number :
	T extends boolean ? boolean :
	T extends bigint ? bigint :
	T extends PublicReference<infer K> ? K :
	T;

export type PublicReference<T> = T & {

	/**
	 * Returns the value of the reference.
	 * @returns The value of the reference.
	 */
	getV(): T;

	/**
	 * Alias for {@link getV}
	 */
	valueOf(): T;

	/**
	 * Sets the value of the reference.
	 * @param v The new value.
	 * @returns The new value.
	 */
	setV(v: T): T;
	
}

export type Reference<T> = PublicReference<T> & {
	[VALUE]: T;
}

