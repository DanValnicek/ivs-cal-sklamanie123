import {parseExpression} from '../lib/src/parser';

async function standardDeviation() {
    const fs = require("fs");
    const input = fs.readFileSync(0, "utf-8");

    let sumOfValues = input.replace(/\s+/g, " + ");
    let values = input.match(/[-]?\d+(\.\d+)?/g);
    let N = values.length;
    let mean = parseExpression(`( ${sumOfValues} ) / ${N}`, false);
    let sum = 0;
    for (let i = 0; i < N; i++) {
        sum += parseExpression(`( ${values[i]} - ${mean} ) ^ 2`, false);
    }
    let standardDeviation = parseExpression(`root 2 ( ${sum} / ( ${N} - 1 ) )`, false);

    console.log(standardDeviation);
}

standardDeviation();
