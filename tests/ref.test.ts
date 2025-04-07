import { describe, test, expect } from "bun:test";
import { Ref } from "ref.js";

describe("Ref Tests", () => {

    test("Ref works", async () => {

        const ref = new Ref("myValue");
        const clone = ref;

        expect(clone.getV()).toBe("myValue");

        ref.setV("newValue");

        expect(ref.getV()).toBe("newValue");
        expect(clone.getV()).toBe("newValue");

        expect(Ref.isRef(ref)).toBe(true);
        expect(Ref.isRef(true)).toBe(false);
    });

    test("String Refs", async () => {

        const str = "myValue";
        const ref = new Ref(str);

        expect(ref[0]).toBe(str[0]);
        expect(ref.toUpperCase()).toBe(str.toUpperCase());
        expect(ref.toLowerCase()).toBe(str.toLowerCase());
        expect(ref.length).toBe(str.length);
        expect(ref.charAt(0)).toBe(str.charAt(0));
        expect(ref.charCodeAt(0)).toBe(str.charCodeAt(0));
        expect(ref.concat("test")).toBe(str.concat("test"));
        expect(ref.includes("my")).toBe(str.includes("my"));
        expect(ref.indexOf("my")).toBe(str.indexOf("my"));
        expect(ref.lastIndexOf("my")).toBe(str.lastIndexOf("my"));
        expect(ref.match(/my/)).toEqual(str.match(/my/));
        expect(ref.replace("my", "your")).toBe(str.replace("my", "your"));
        expect(ref.search(/my/)).toBe(str.search(/my/));
        expect(ref.slice(0, 2)).toBe(str.slice(0, 2));
        expect(ref.split("")).toEqual(str.split(""));
        expect(ref.startsWith("my")).toBe(str.startsWith("my"));
        expect(ref.endsWith("ue")).toBe(str.endsWith("ue"));
        expect(ref.substring(0, 2)).toBe(str.substring(0, 2));
        expect(ref.trim()).toBe(str.trim());
        expect(ref.trimStart()).toBe(str.trimStart());
        expect(ref.trimEnd()).toBe(str.trimEnd());
        expect(ref.toString()).toBe(str.toString());
        expect(ref.valueOf()).toBe(str.valueOf());
    });

    test("Number Refs", async () => {

        const num = 123;
        const ref = new Ref(num);

        expect(ref.toString()).toBe(num.toString());
        expect(ref.valueOf()).toBe(num.valueOf());
        expect(ref.toFixed(2)).toBe(num.toFixed(2));
        expect(ref.toExponential(2)).toBe(num.toExponential(2));
        expect(ref.toPrecision(2)).toBe(num.toPrecision(2));
        expect(ref.toLocaleString()).toBe(num.toLocaleString());
    });

    test("Boolean Refs", async () => {

        const bool = false;
        const ref: Boolean = new Ref(false);

        expect(ref == false).toBe(true);
        expect(ref == bool).toBe(true);
        expect(ref == true).toBe(false);
        expect(ref.toString()).toBe(bool.toString());
        expect(ref.valueOf()).toBe(bool.valueOf());
    });

    test("Array Refs", async () => {

        const arr = [1, 2, 3];
        const ref = new Ref([1, 2, 3]);

        arr[4] = 4;
        ref[4] = 4;

        // Test iteration
        for (const value of ref) {
            expect(value).toBe(arr[arr.indexOf(value)]);
        }

        for (const i in ref) {
            expect(ref[i]).toBe(arr[i]);
        }

        expect(ref.length).toBe(arr.length);
        expect(ref[0]).toBe(arr[0]);
        expect(ref[4]).toBe(arr[4]);
        expect(ref.includes(1)).toBe(arr.includes(1));
        expect(ref.indexOf(1)).toBe(arr.indexOf(1));
        expect(ref.join(",")).toBe(arr.join(","));
        expect(ref.slice(0, 2)).toEqual(arr.slice(0, 2));
        expect(ref.splice(0, 2)).toEqual(arr.splice(0, 2));
    });

    test("Object Refs", async () => {
        const obj = { a: 1, b: 2 };
        const ref = new Ref({ a: 1, b: 2 });

        expect(ref.a).toBe(obj.a);
        expect(ref.b).toBe(obj.b);
        expect(ref.toString()).toBe(obj.toString());
        expect(ref.valueOf()).toEqual(obj.valueOf() as any);
    });

    test("Function Refs", async () => {
        const func = () => "myValue";
        const ref = new Ref(() => "myValue");

        expect(ref.valueOf()()).toBe((func.valueOf() as any)());
        expect(ref.toString()).toBe(func.toString());
    });

});
