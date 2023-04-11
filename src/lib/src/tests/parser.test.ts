import {convertRPN, parseExpression} from '../parser'

describe('test parseRPN function', () => {
    it("3 + 4 × 2 ÷ ( 1 − 5 ) ^ 2 ^ 3 => 3 4 2 × 1 5 − 2 3 ^ ^ ÷ +", () => {
        expect(convertRPN("3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3")).toEqual(
            [3, 4, 2, "*", 1, 5, "-", 2, 3, "^", "^", "/", "+"]);
    })
    it("sum 0 4 ( 5 + n )  => 0 4 5 n + sum", () => {
        expect(convertRPN("sum 0 4 ( 5 + n )")).toEqual(
            [0, 4, "5 + n", "sum"]);
    })
    it("4 + 2 ^ 3 ^ 2 => 4 2 3 2 ^ ^ +", () => {
        expect(convertRPN("4 + 2 ^ 3 ^ 2")).toEqual([4, 2, 3, 2, "^", "^", "+"])
    })
    it("4 + 2 ^ 3 + 3 ^ ( 2 - 4 ) => 4 2 3 ^ + 3 2 4 - ^ +", () => {
        expect(convertRPN("4 + 2 ^ 3 + 3 ^ ( 2 - 4 )")).toEqual([4, 2, 3, "^", "+", 3, 2, 4, "-", "^", "+"])
    })
    it("2 + 3 * 6 - sum 0 5 ( 5 + n - 3 * n ) + 2 => 2 3 6 * + 0 5 '5 + n - 3 * n' sum - 2 +", () => {
        expect(convertRPN("2 + 3 * 6 - sum 0 5 ( 5 + n - 3 * n ) + 2")).toEqual([2, 3, 6, "*", "+", 0, 5, "5 + n - 3 * n", "sum", "-", 2, "+"])
    })
    it("sum 0 5 ( 6 + 3 * sum 0 4 ( 3 - 4 + n ) / n ) => 0 5 6 3 0 4 3 4 - n + sum * n / + sum", () => {
        expect(convertRPN("sum 0 5 ( 6 + 3 * sum 0 4 ( 3 - 4 + n ) / n )")).toEqual([0, 5, 6, 3, 0, 4, 3, 4, "-", "n", "+", "sum", "*", "n", "/", "+", "sum"])
    })
    it("root 2 ( 5 - root 2 4 ) => 2 5 2 4 root - root", () => {
        expect(convertRPN("root 2 ( 5 - root 2 4 )")).toEqual([2, 5, 2, 4, "root", "-", "root"])
    })
})

describe('test parse expression function', () => {
    it("2 + 3 => 5", () => {
        expect(parseExpression("2 + 3")).toBe(5);
    })
    it("3 + 4 × 2 ÷ ( 1 − 5 ) ^ 2 ^ 3 => 3,00012207", () => {
        expect(parseExpression("3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3")).toEqual(3.00012207);
    })
    it("sum 0 4 ( 5 + n )  => 35", () => {
        expect(parseExpression("sum 0 4 ( 5 + n )")).toEqual(35);
    })
    it("4 + 2 ^ 3 ^ 2 => 516", () => {
        expect(parseExpression("4 + 2 ^ 3 ^ 2")).toEqual(516)
    })
    it("4 + 2 ^ 3 + 3 ^ ( 2 - 4 ) => 12,111111111", () => {
        expect(parseExpression("4 + 2 ^ 3 + 3 ^ ( 2 - 4 )")).toEqual(12.111111111)
    })
    it("2 + 3 * 6 - sum 0 5 ( 5 + n - 3 * n ) + 2 => 22", () => {
        expect(parseExpression("2 + 3 * 6 - sum 0 5 ( 5 + n - 3 * n ) + 2")).toEqual(22)
    })
    it("sum 0 5 ( 6 + 3 * sum 0 4 ( 3 - 4 + n ) / n ) => undefined", () => {
        expect(parseExpression("sum 0 5 ( 6 + 3 * sum 0 4 ( 3 - 4 + n ) / n )")).toEqual(undefined)
    })
    it("root 2 ( 5 - root 2 4 ) => 1.732050808", () => {
        expect(parseExpression("root 2 ( 5 - root 2 4 )")).toEqual(1.732050808)
    })
    it("5 4 + 6", () => {
        expect(() => parseExpression("5 4 + 6")).toThrowError("Parse error")
    })

})
