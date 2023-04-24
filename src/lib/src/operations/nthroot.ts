/**
 * @file nthroot.ts
 * @brief nth root operation
 * @author Dan Valníček
 */

/**
 * calculates nth root of a number
 * @param n index of root
 * @param x radicand
 * @returns nth root of x
 */
export function nThRoot(n: number, x: number): number | undefined {
    let result = Math.pow(x, 1 / n);
    if (isNaN(result) || result === Infinity) return undefined;
    return Math.round(result * 1e9) / 1e9;
}
