
import { add, subtract, multiply, divide, absolute } from './operations/basicArithmetic'

import { factorial } from './operations/factorial';
import { powerOfN } from './operations/powerOfN';
import { nThRoot } from './operations/nthroot';
import { sum } from './operations/sum';
import { parseExpression } from './parser';

const MathLib: IMathLib = {
    add,
    subtract,
    multiply,
    divide,
    absolute,

    factorial,
    powerOfN,
    nThRoot,
    sum,
    parseExpression,
}

export default MathLib;