/**
 * @file parser.ts
 * @brief parser for mathematical expressions
 * @description This file contains the parser for mathematical expressions. It is used to parse the expression and calculate the result.
 * @author Dan Valníček
 */

import { absolute, add, divide, multiply, subtract } from './operations/basicArithmetic';
import { powerOfN } from './operations/powerOfN';
import { sum } from './operations/sum';
import { nThRoot } from './operations/nthroot';
import { factorial } from "./operations/factorial";

/**
 * Operator interface
 * @interface { precedence: number, associativity: 'left'|'right', func: Function }
 */
interface Operator {
    precedence: number;
    associativity: 'left' | 'right';
    func: Function;
}

/**
 * Table of mathematical operations
 *  Used for looking up operations in an expression
 * @typedef { op name: string { precedence: number, associativity: 'left'|'right', Function } }
 */
const operatorTable: Record<string, Operator> = {
    '+': { precedence: 2, associativity: 'left', func: add },
    '-': { precedence: 2, associativity: 'left', func: subtract },
    '−': { precedence: 2, associativity: 'left', func: subtract },
    '*': { precedence: 3, associativity: 'left', func: multiply },
    '×': { precedence: 3, associativity: 'left', func: multiply },
    '/': { precedence: 3, associativity: 'left', func: divide },
    '÷': { precedence: 3, associativity: 'left', func: divide },
    '^': { precedence: 4, associativity: 'right', func: powerOfN },
    "root": { precedence: 4, associativity: 'right', func: nThRoot },
    "fact": { precedence: 4, associativity: 'right', func: factorial },
    "abs": { precedence: 4, associativity: 'right', func: absolute },
};

/**
 * Table of predefinded functions
 *  @typdef {name: string, Function}
 */
const functionTable: Record<string, Function> = {
    sum: sum,
};

/**
 * @description Cancels the splitting into separate objects in array for nested functions
 * @param inputExpression array of objects from expression
 * @returns array of values with nested expression of function as single object that is marked by the "$" character
 * @example [0, 5, 6, 3, 0, 4, 3, 4, "-", "n", "+", "sum", "*", "n", "/", "+", "sum"]
 *       => [0, 5, "$ 6 + 3 * sum 0 4 ( 3 - 4 + n ) / n", "sum"]
 */
function convertFunctionExpressionsToString(inputExpression: string[]): string[] {

    let indexOfFunction = inputExpression.findIndex(value => functionTable[value]);

    while (indexOfFunction != -1) {
        //finds index of expression for function that should be enclosed in parentheses
        let functionExpressionIndex = inputExpression.slice(indexOfFunction).findIndex(value => value == "(") + indexOfFunction;
        //deletes "(" and replaces it for $ that marks expressions
        inputExpression.splice(functionExpressionIndex, 1, "$");
        for (let nestedParentheses = 0; inputExpression[functionExpressionIndex + 1] != ")" || nestedParentheses != 0;) {
            if (inputExpression[functionExpressionIndex + 1] == "(") nestedParentheses++;
            if (inputExpression[functionExpressionIndex + 1] == ")") nestedParentheses--;

            //join objects inside expression to single string
            inputExpression.splice(functionExpressionIndex, 2, inputExpression.slice(functionExpressionIndex, functionExpressionIndex + 2).join(" "));
        }
        //deletes ending ")"
        inputExpression.splice(functionExpressionIndex + 1, 1);

        //find next function inside expression. Returns -1 if there isn't one.
        indexOfFunction = inputExpression.slice(functionExpressionIndex).findIndex(value => functionTable[value] != undefined);
    }
    return inputExpression;
}

/**
 * @description Converts expression postfix notation (RPN Reverse Polish Notation) represented by array of strings and numbers.
 *  shunting yard algorithm https://en.wikipedia.org/wiki/Shunting_yard_algorithm
 * @param expression expression in infix notation
 * @returns array representing  expression in postfix notation
 * @example "sum 0 5 ( 6 + 3 * sum 0 4 ( 3 - 4 + n ) / n )"
 *       => [0, 5, "6 + 3 * sum 0 4 ( 3 - 4 + n ) / n", "sum"]
 */
export function convertRPN(expression: string): Array<number | string> {

    //expression shouldn't contain the "$" character that is used to mark sub expressions of nested functions
    if (expression.includes("$")) throw Error("Invalid character $");
    let input: string[] = expression.split(" ");
    input = convertFunctionExpressionsToString(input);

    if (input == undefined) throw Error("Parse exception");
    let output: Array<number | string> = [];
    //top element is operatorStack.at(-1)
    let operatorStack: string[] = [];
    let currentToken: string;
    while (input.length) {
        if (input[0] === undefined) throw Error("Undefined symbol");
        // take first element from input
        currentToken = input.shift() || "";
        if (!isNaN(Number(currentToken)))
            output.push(Number(currentToken));
        else if (functionTable[currentToken])
            operatorStack.push(currentToken);
        else if (currentToken.startsWith("$"))
            output.push(currentToken.replace("$ ", ""));
        else if (operatorTable[currentToken]) {
            // pushes operations that should be done before current to output
            while (
                // @ts-ignore
                functionTable[operatorStack.at(-1)] ||
                operatorStack.length != 0 &&
                "(" != operatorStack.at(-1) &&
                // if current token has lower or equal precedence
                // @ts-ignore
                operatorTable[operatorStack.at(-1)].precedence >= operatorTable[currentToken].precedence &&
                // token is left associative
                operatorTable[currentToken].associativity == "left"
            ) {
                // @ts-ignore
                output.push(operatorStack.pop());
            }//end while
            operatorStack.push(currentToken);
        } else if (currentToken == "(") {
            operatorStack.push(currentToken);
        } else if (currentToken == ")") {
            while (operatorStack.at(-1) != "(") {
                if (!operatorStack.length) throw Error("Mismatched parentheses");
                // @ts-ignore
                output.push(operatorStack.pop());
            }
            if (operatorStack.at(-1) != "(") throw Error("Left parenthesis not found");
            //remove "("
            operatorStack.pop();
        } else {
            throw Error("Parse exception: Invalid number of arguments");
        }
    }//end while(input.length)
    if (operatorStack.find(element => element === "(" || element === ")")) throw Error("Mismatched parentheses");
    // reverse to concat as stack
    operatorStack.reverse();
    output = output.concat(operatorStack);

    return output;
}

/**
 * Parses expression and evaluates numerical value of given expression
 * @param expression expression in infix notation
 * @param sanitize turns sanitization on and off default is on
 * @returns numerical value of expression
 * @example "2 + 2" => 4
 * @example "fact ( 5 ) - root 3 ( 8 ) + abs(-6)^2" => 154
 */
export function parseExpression(expression: string, sanitize: boolean = true): number | undefined {
    //input sanitization so it can be split by space
    if (sanitize) expression = sanitizeInput(expression);
    let termList = convertRPN(expression);
    while (termList.length != 1 || typeof termList[0] != "number") {
        //find operation of function
        let term = termList.find(value => operatorTable[value] || functionTable[value]);
        if (term == undefined) throw Error("Parse exception");
        let termIndex = termList.indexOf(term);

        //find function in tables
        let operation = operatorTable[term].func;
        if (operation == null) operation = functionTable[term];

        let argCount = operation.length;

        //gets arguments from termList
        let args = termList.slice(termIndex - argCount, termIndex);
        if (args.length != argCount) throw Error("Parse exception: Invalid number of arguments");
        //use function of operation
        let result = operation.apply(null, args);
        if (result == undefined) return undefined;
        //replaces arguments with operation or function for result
        termList.splice(termIndex - argCount, argCount + 1, result);
    }
    return termList[0];
}

/**
 * @description Converts user typed or inputted string from FE GUI calculator to valid "convertRPN" readable format
 * @param input Input string from FE GUI calculator
 * @returns String in valid "convertRPN" readable format
 * @example "4!-|-123|+root 13 (    169 )+2*|12|+|-123|"
 *       => "fact ( 4 ) - abs ( -123 ) + root 13 ( 169 ) + 2 * abs ( 12 ) + abs ( -123 )"
 */
export function sanitizeInput(input: string): string {
    let regex;

    // return input (invalid) if it contains two numbers separated by any number of spaces
    regex = /\d\s\d/g;
    if (input.match(regex)) {
        return input;
    }

    // remove all spaces
    input = input.replace(/\s/g, '');

    // replace all occurrences of "|x|" with "abs ( x )"
    regex = /\|(.?\d+(\.\d+)?|\w+)\|/g;
    input = input.replace(regex, "abs ( $1 )");

    // replace all occurrences of "abs(x)" with "abs ( x )"
    regex = /abs\((.+?)\)/g;
    input = input.replace(regex, "abs ( $1 )");

    // replace all occurrences of "rootY(X)" with "root Y ( X )"
    regex = /root(\d+)\((.+?)\)/g;
    input = input.replace(regex, "root $1 ( $2 )");

    // replace all occurrences of "x!" with "fact ( x )"
    regex = /(-?\d+(\.\d+)?|\w+)!/g;
    input = input.replace(regex, "fact ( $1 )");

    // replace all occurrences of "fact(x)" with "fact ( x )"
    regex = /fact\((.+?)\)/g;
    input = input.replace(regex, "fact ( $1 )");

    // add space before and after every + * / ^
    regex = /(\+|\*|\/|\^)/g;
    input = input.replace(regex, " $1 ");

    // add space after every - that if followed by function abs, root of fact
    regex = /-(abs|root|fact)/g;
    input = input.replace(regex, " - $1");

    // add space before and after "-" when there is a ')' before it 
    regex = /\)(-)/g;
    input = input.replace(regex, ") $1 ");

    // add space only before "-" when there is "(" before it
    regex = /(\()(-)/g;
    input = input.replace(regex, "$1 $2");

    // add space before and after "-" when there is a number before it
    regex = /(\d)(-)/g;
    input = input.replace(regex, "$1 $2 ");

    // remove any excess spaces
    regex = /\s\s/g;
    input = input.replace(regex, " ");

    return input;
}
