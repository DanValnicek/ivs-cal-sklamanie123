/**
 * @file powerOfN.ts
 * @brief power of n operation
 * @author Lukáš Katona
 */

/**
 * calculates power of n
 * @param x base
 * @param n exponent
 * @returns x raised to the power of n
 */
export function powerOfN(x: number, n: number): number | undefined{
    const result = (x ** n).toFixed(9);
    return parseFloat(result);
}