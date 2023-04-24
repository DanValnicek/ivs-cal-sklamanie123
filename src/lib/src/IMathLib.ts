interface IMathLib {
    add(x: number, y: number): number;

    subtract(x: number, y: number): number;

    multiply(x: number, y: number): number;

    divide(x: number, y: number): number | undefined;

    absolute(x: number): number;

    factorial(x: number): number | undefined;

    powerOfN(x: number, n: number): number | undefined;

    nThRoot(n: number, x: number): number | undefined;

    /**
     * Sum function denoted by capital sigma notation
     *https://en.wikipedia.org/wiki/Summation#:~:text=Capital%2Dsigma%20notation%5B,n.%5Bb%5D
     * @param m lower bound of summation
     * @param n upper bound of summation
     * @param term to be summed
     */
    sum(m: number, n: number, term: string): number | undefined;

    parseExpression(expression: string): number | undefined;
}