import { toInteger } from "./utils";

describe('utils test suite', () => {
    it('test toInteger', () => {
        const num: number = toInteger("3");
        expect(num).toEqual(3);
    });
});