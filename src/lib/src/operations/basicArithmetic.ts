
    export function add(x: number, y: number): number{
        const result = (x + y).toFixed(9);
        return parseFloat(result);
    }
    export function subtract(x: number, y: number): number{
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

    export function absolute(x: number): number{
        let result = (x).toFixed(9);
        if (x < 0){
            result = (x * -1).toFixed(9);
        }
        return parseFloat(result);
    }