/**
 * @file sum.ts
 * @brief sum operation
 * @author Lukáš Katona
 */

import { parseExpression } from '../parser';

/**
 * Sums the result of the term from m to n
 * @param m lower limit
 * @param n upper limit
 * @param term expression to be summed
 * @returns sum of the term from m to n
 */
export function sum(m: number, n: number, term: string): number | undefined{
    let result = 0;
    for(let i = m; i <= n; i++){ // sum from m to n
        let tmpResult;
        let tmpTerm = '0';
        tmpTerm = term.replace('n', i.toString()); // replace n with i
        tmpResult = parseExpression(tmpTerm); // parse the term and calculate the result
        if(tmpResult == undefined){
            return undefined;
        }
        result += tmpResult; // add the result to the sum 
    }
    return result;
}