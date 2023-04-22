import {convertRPN, parseExpression} from '../parser'

describe('test parseRPN function', () => {
    it("sum 0 4 ( 5 + n )  => 0 4 5 n + sum", () => {
        expect(convertRPN("sum 0 4 ( 5 + n )")).toEqual(
            [0, 4, "5 + n", "sum"]);
    })
    it("4 + 2 ^ 3 ^ 2 => 4 2 3 2 ^ ^ +", () => {
        expect(convertRPN("4 + 2 ^ 3 ^ 2")).toEqual([4, 2, 3, 2, "^", "^", "+"])
    })
    it("2 + 3 * 6 - sum 0 5 ( 5 + n - 3 * n ) + 2 => 2 3 6 * + 0 5 '5 + n - 3 * n' sum - 2 +", () => {
        expect(convertRPN("2 + 3 * 6 - sum 0 5 ( 5 + n - 3 * n ) + 2")).toEqual([2, 3, 6, "*", "+", 0, 5, "5 + n - 3 * n", "sum", "-", 2, "+"])
    })
    it("sum 0 5 ( 6 + 3 * sum 0 4 ( 3 - 4 + n ) / n ) => 0 5 6 3 0 4 3 4 - n + sum * n / + sum", () => {
        expect(convertRPN("sum 0 5 ( 6 + 3 * sum 0 4 ( 3 - 4 + n ) / n )")).toEqual([0, 5, "6 + 3 * sum 0 4 ( 3 - 4 + n ) / n", "sum"])
    })
    it("root 2 ( 5 - root 2 4 ) => 2 5 2 4 root - root", () => {
        expect(convertRPN("root 2 ( 5 - root 2 4 )")).toEqual([2, 5, 2, 4, "root", "-", "root"])
    })
})

describe('test parse expression function', () => {
    it("2 + 3 => 5", () => {
        expect(parseExpression("2 + 3")).toBe(5);
        expect(parseExpression("2+3")).toBe(5);
    })
    it("4 + 2 ^ 3 ^ 2 => 516", () => {
        expect(parseExpression("4 + 2 ^ 3 ^ 2")).toEqual(516)
        expect(parseExpression("4+2^3^2")).toEqual(516)
        expect(parseExpression("4+2  ^3 ^    2")).toEqual(516)
    })
    it("root 2 ( 5 - root 2 4 ) => 1.732050808", () => {
        expect(parseExpression("root 2 ( 5 - root 2 4 )")).toEqual(1.732050808)
    })
    it("5 4 + 6", () => {
        expect(() => parseExpression("5 4 + 6")).toThrowError("Parse exception")
        expect(() => parseExpression("5 4+6")).toThrowError("Parse exception")
    })
    it("fact ( 5 ) => 120", () => {
        expect(parseExpression("fact ( 5 )")).toEqual(120)
        expect(parseExpression("fact (5)")).toEqual(120)
    })
    it("fact ( 5 ) - root 3 ( 8 ) + abs(-6)^2 => 154", () => {
        expect(parseExpression("fact ( 5 ) - root 3 ( 8 ) + abs ( -6 ) ^ 2")).toEqual(154)
        expect(parseExpression("fact(5 )- root3(8 ) +|-6|^2")).toEqual(154)
    })

})
