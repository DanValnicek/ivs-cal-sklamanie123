    import { parseExpression } from '../parser';
    
    export function sum(m: number, n: number, term: string): number | undefined{
        let tmpResult;
        let result = 0;
        let tmpTerm = '0';
        for(let i = m; i <= n; i++){
            tmpTerm = term.replace('n', i.toString());
            tmpResult = parseExpression(tmpTerm);
            if(tmpResult == undefined){
                return undefined;
            } else {
                result += tmpResult;
            }
        }
        return result;
    }