
    export function add(x: number, y: number): number{
        const result = (x + y).toFixed(9);
        return parseFloat(result);
    }
    export function substract(x: number, y: number): number{
        const result = (x - y).toFixed(9);
        return parseFloat(result);
    }
    export function multiply(x: number, y: number): number{
        const result = (x * y).toFixed(9);
        return parseFloat(result);
    }
    export function divide(x: number, y: number): number | undefined{
        if(y === 0){
            return undefined;
        }
        const result = (x / y).toFixed(9);
        return parseFloat(result);
    }