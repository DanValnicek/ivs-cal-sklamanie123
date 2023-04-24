import {parseExpression} from '../lib/src/parser';
const fs = require("fs");

async function standardDeviation() {
    const input = fs.readFileSync(0, "utf-8");

    const sumOfValues = input.replace(/\s+/g, " + ");
    const values = input.match(/[-]?\d+(\.\d+)?/g);
    const N = values.length;
    const mean = parseExpression(`( ${sumOfValues} ) / ${N}`, false);
    let sum = 0;
    for (let i = 0; i < N; i++) {
        sum += parseExpression(`( ${values[i]} - ${mean} ) ^ 2`, false);
    }
    const standardDeviation = parseExpression(`root 2 ( ${sum} / ( ${N} - 1 ) )`, false);

    console.log(standardDeviation);
}

standardDeviation();
