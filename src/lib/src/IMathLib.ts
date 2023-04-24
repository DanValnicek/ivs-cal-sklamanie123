/**
 * @file IMathLib.ts
 * @brief interface for math library functions
 * @author Dan Valníček
 */

interface IMathLib {
    add(x: number, y: number): number;

    subtract(x: number, y: number): number;

    multiply(x: number, y: number): number;

    divide(x: number, y: number): number | undefined;

    absolute(x: number): number;

    factorial(x: number): number | undefined;

    powerOfN(x: number, n: number): number | undefined;

    nThRoot(n: number, x: number): number | undefined;

    sum(m: number, n: number, term: string): number | undefined;

    parseExpression(expression: string): number | undefined;
}