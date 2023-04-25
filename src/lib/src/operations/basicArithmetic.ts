/**
 * @file basicArithmetic.ts
 * @brief basic arithmetic operations
 * @author Lukáš Katona
 */

/**
 * add two numbers
 * @param x addend
 * @param y addend
 * @returns sum of x and y
 */
export function add(x: number, y: number): number{
    const result = (x + y).toFixed(9);
    return parseFloat(result);
}

/**
 * subtract two numbers
 * @param x minuend
 * @param y subtrahend
 * @returns difference of x and y
 */
export function subtract(x: number, y: number): number{
    const result = (x - y).toFixed(9);
    return parseFloat(result);
}

/**
 * multiply two numbers
 * @param x multiplier
 * @param y multiplicand
 * @returns product of x and y
 */
export function multiply(x: number, y: number): number{
    const result = (x * y).toFixed(9);
    return parseFloat(result);
}

/**
 * divide two numbers
 * @param x dividend
 * @param y divisor
 * @returns quotient of x and y
 */
export function divide(x: number, y: number): number | undefined{
    if(y === 0){
        return undefined;
    }
    const result = (x / y).toFixed(9);
    return parseFloat(result);
}

/**
 * calculates abolute value of a number
 * @param x number
 * @returns absolute value of x
 */
export function absolute(x: number): number{
    let result = (x).toFixed(9);
    if (x < 0){
        result = (x * -1).toFixed(9);
    }
    return parseFloat(result);
}