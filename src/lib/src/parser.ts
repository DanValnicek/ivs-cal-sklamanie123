import {add, divide, multiply, subtract} from "./operations/basicArithmetic";
import {powerOfN} from "./operations/powerOfN";
import {sum} from "./operations/sum";
import {nThRoot} from "./operations/nthroot";

interface Operator {
    precedence: number;
    associativity: 'left' | 'right';
    func: Function;
}


const operatorTable: Record<string, Operator> = {
    '+': {precedence: 2, associativity: 'left', func: add},
    '-': {precedence: 2, associativity: 'left', func: subtract},
    '−': {precedence: 2, associativity: 'left', func: subtract},
    '*': {precedence: 3, associativity: 'left', func: multiply},
    '×': {precedence: 3, associativity: 'left', func: multiply},
    '/': {precedence: 3, associativity: 'left', func: divide},
    '÷': {precedence: 3, associativity: 'left', func: divide},
    '^': {precedence: 4, associativity: 'right', func: powerOfN},
    'root': {precedence: 4, associativity: 'right', func: nThRoot},
};

const functionTable: Record<string, Function> = {
    'sum': sum,
}

function convertFunctionExpressionsToString(inputExpression: Array<string>): Array<string> {

    let indexOfFunction = inputExpression.findIndex(value => functionTable[value]);

    while (indexOfFunction != -1) {

        let functionExpressionIndex = inputExpression.slice(indexOfFunction).findIndex(value => value == "(") + indexOfFunction;
        inputExpression.splice(functionExpressionIndex, 1, "$");
        for (let nestedParentheses = 0; inputExpression[functionExpressionIndex + 1] != ")" || nestedParentheses != 0;) {
            if (inputExpression[functionExpressionIndex + 1] == "(") nestedParentheses++;
            if (inputExpression[functionExpressionIndex + 1] == ")") nestedParentheses++;

            inputExpression.splice(functionExpressionIndex, 2, inputExpression.slice(functionExpressionIndex, functionExpressionIndex + 2).join(" "));
        }
        inputExpression.splice(functionExpressionIndex + 1, 1);

        indexOfFunction = inputExpression.slice(functionExpressionIndex).findIndex(value => functionTable[value] != undefined);
    }
    return inputExpression;
}

// shunting yard algorithm https://en.wikipedia.org/wiki/Shunting_yard_algorithm
export function convertRPN(expression: string): Array<number | string> {
    if (expression.includes("$")) throw Error("Invalid character $")
    let input: Array<string> = expression.split(" ");
    input = convertFunctionExpressionsToString(input);

    if (input == undefined) throw Error("Parsing error");
    let output: Array<number | string> = [];
    let operatorStack: Array<string> = [];
    let currentToken: string;
    while (input.length) {
        if (input[0] === undefined) throw Error("Undefined symbol");
        // @ts-ignore
        currentToken = input.shift();
        if (!isNaN(Number(currentToken)))
            output.push(Number(currentToken));
            // else if (currentToken === "n")
        //     output.push(currentToken);
        else if (functionTable[currentToken])
            operatorStack.push(currentToken);
        else if (currentToken.startsWith("$"))
            //deletes "$ "
            output.push(currentToken.substring(2));
        else if (operatorTable[currentToken]) {
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
            }
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
            throw Error("Unexpected token");
        }
    }
    if (operatorStack.find(element => element === "(" || element === ")")) throw Error("Mismatched parentheses");
    // reverse to concat as stack
    operatorStack.reverse();
    output = output.concat(operatorStack);

    return output;
}

export function parseExpression(expression: string): number | undefined {
    let termList = convertRPN(expression);
    while (isNaN(Number(termList))) {
        let term = termList.find(value => operatorTable[value] || functionTable[value]);
        if (term == undefined) throw Error("Parse error");
        let termIndex = termList.indexOf(term);

        let operation = operatorTable[term].func;
        if (operation == null) operation = functionTable[term];

        let argCount = operation.length;

        let args = termList.slice(termIndex - argCount, termIndex);
        let result = operation.apply(null, args);
        if (result == undefined) return undefined;
        termList.splice(termIndex - argCount, argCount + 1, result);
    }
    // @ts-ignore
    return termList;
}
