
import CONFIG from '../config/config';
import CONSTANTS from '../utils/constants';
import { Tip } from '../types/interfaces';
const { VALID_PAIRS } = CONFIG;
const { PRECISION_TYPES, LEN_VALUES, OPERATION_TYPES } = CONSTANTS;

// Function that convert string into a number.
export const toInteger = (value: string): number => parseInt(value, 0);

// Get available pairs.
export const getAvailablePairs = () => VALID_PAIRS.split(',');

// Validate pair.
export const validatePair = (pair: string) => {
    // Validations
    if(getAvailablePairs().indexOf(pair) !== -1) {
        return true;
    }
    return false;
}

// Validate precision type
export const validatePrecision = (precision: string) => PRECISION_TYPES.indexOf(precision) !== -1;

// Validate length
export const validateLenght = (len: string) => LEN_VALUES.indexOf(len) !== -1;

// Parse book data
export const parseBookData = ( data: number[][] ) => {
    /*
        Example data: [
            [ PRICE, COUNT, AMOUNT ],
            [ 43347, 2, 1.007295 ],
            [ 43348, 2, -0.109395 ],
            [ 43349, 3, -0.12125684 ],
        ]
    */
    const mapped: Tip[] = data.map(item => {
        const type = (item[2] > 0) ? 'bid' : 'ask';
        return {
            price: item[0],
            amount: Math.abs(item[2]),
            type
        };
    });
    return mapped;
};

// Validate Operation Type
export const validateOperationType = (type: string) => OPERATION_TYPES.indexOf(type) !== -1;

// Validate Order Size
export const validateOrderSize = (size: number) => size > 0;

// Average function
export const average = (arr: number[]) => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;