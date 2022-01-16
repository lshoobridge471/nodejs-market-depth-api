import CONFIG from '../config/config';
import CONSTANTS from '../utils/constants';
import { toInteger, getAvailablePairs, validatePair, validatePrecision, validateLenght, parseBookData, validateOperationType, validateOrderSize, average } from "./utils";

const { VALID_PAIRS } = CONFIG;
const { LEN_VALUES, PRECISION_TYPES, OPERATION_TYPES } = CONSTANTS;

describe('utils test suite', () => {
    it('test toInteger', () => {
        const num: number = toInteger("3");
        expect(num).toEqual(3);
    });
    
    it('test getAvailablePairs', () => {
        const list: Array<string> = getAvailablePairs();
        expect(list).toEqual(VALID_PAIRS.split(','));
    });
    
    it('test validatePair false', () => {
        expect(validatePair('NOTVALID')).toBe(false);
    });
    
    it('test validatePair true', () => {
        const firstPair = VALID_PAIRS.split(',')[0];
        expect(validatePair(firstPair)).toBe(true);
    });
    
    it('test validatePrecision true', () => {
        expect(validatePrecision(PRECISION_TYPES[0])).toBe(true);
    });
    
    it('test validatePrecision false', () => {
        expect(validatePrecision('NOTVALID')).toBe(false);
    });
    
    it('test validateLenght true', () => {
        expect(validateLenght(LEN_VALUES[0])).toBe(true);
    });
    
    it('test validateLenght false', () => {
        expect(validateLenght('150')).toBe(false);
    });
    
    it('test validateOperationType true', () => {
        expect(validateOperationType(OPERATION_TYPES[0])).toBe(true);
    });
    
    it('test validateOperationType false', () => {
        expect(validateOperationType('invalid')).toBe(false);
    });
    
    it('test validateOrderSize true', () => {
        expect(validateOrderSize(1)).toBe(true);
    });
    
    it('test validateOrderSize false', () => {
        expect(validateOrderSize(-44)).toBe(false);
    });
    
    it('test average', () => {
        expect(average([4, 4, 5, 6, 6])).toBe(5);
    });
    
    it('test parseBookData', () => {
        const parsedMockData = parseBookData([
            [ 43347, 2, 1.007295 ],
            [ 43348, 2, -0.109395 ],
            [ 43349, 3, -0.12125684 ],
        ]);
        expect(parsedMockData).toStrictEqual([
            { price: 43347, amount: 1.007295, type: 'bid' },
            { price: 43348, amount: 0.109395, type: 'ask' },
            { price: 43349, amount: 0.12125684, type: 'ask' }
        ]);
    });
});