    export function powerOfN(x: number, n: number): number | undefined{
        const result = (x ** n).toFixed(9);
        return parseFloat(result);
    }