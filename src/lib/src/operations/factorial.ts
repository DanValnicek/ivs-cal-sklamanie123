/**
 * @file factorial.ts
 * @brief factorial operation
 * @author Dan Valníček
 */

/**
 * calculates factorial of a number
 * @param x number
 * @returns factorial of x
 */
export function factorial(x: number): number | undefined {
    //x must be a positive integer
    if (x < 0 || x % 1 !== 0) return undefined;
    if (x == 0) return 1;

    let result = x;
    while (x > 1) result *= --x;
    return result;
}
