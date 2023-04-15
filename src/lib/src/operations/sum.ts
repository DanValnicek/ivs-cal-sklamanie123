    import { parseExpression } from '../parser';
    
    export function sum(m: number, n: number, term: string): number | undefined{
        let result = 0;
        for(let i = m; i <= n; i++){
            let tmpResult;
            let tmpTerm = '0';
            tmpTerm = term.replace('n', i.toString());
            tmpResult = parseExpression(tmpTerm);
            if(tmpResult == undefined){
                return undefined;
            }
            result += tmpResult;
        }
        return result;
    }