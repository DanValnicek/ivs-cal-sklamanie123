    import { parseExpression } from '../parser';
    
    export function sum(m: number, n: number, term: string): number{
        let result = 0;
        let tmpTerm = '';
        for(let i = m; i <= n; i++){
            tmpTerm = term.replace('n', i.toString());
            result += parseExpression(tmpTerm);
        }
        return result;
    }