export interface IMathLib {
    add(x: number, y: number): number;
    substract(x: number, y: number): number;
    multiply(x: number, y: number): number;
    divide(x: number, y: number): number | undefined;
    factorial(x: number, y: number): number | undefined;
    powerOfN(x: number, n: number): number | undefined;
    nThRoot(x: number, n: number): number | undefined;
    sum(numberList: number[]): number | null;
    parseExpression(expression: string): number | undefined;
}