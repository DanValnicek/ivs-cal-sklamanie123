/**
 * @file sanitizer.test.ts
 * @brief tests for sanitizer function
 * @see ivs-cal-sklamanie123/src/lib/src/parser.ts
 * @author Jakub Vodrážka
 */

import { sanitizeInput } from '../parser'

/**
 * @test {sanitizeInput}
 */
describe('test sanitizeInput function', () => {
    it("2 + 3 => 2 + 3", () => {
        expect(sanitizeInput("2 + 3")).toEqual('2 + 3');
    });
    it("2+3 => 2 + 3", () => {
        expect(sanitizeInput("2+3")).toEqual('2 + 3');
    });
    it("4 + 2 ^ 3 ^ 2 => 4 + 2 ^ 3 ^ 2", () => {
        expect(sanitizeInput("4 + 2 ^ 3 ^ 2")).toEqual('4 + 2 ^ 3 ^ 2');
    });
    it("4+2^3^2 => 4 + 2 ^ 3 ^ 2", () => {
        expect(sanitizeInput("4+2^3^2")).toEqual('4 + 2 ^ 3 ^ 2');
    });
    it("4+2  ^3 ^    2 => 4 + 2 ^ 3 ^ 2", () => {
        expect(sanitizeInput("4+2  ^3 ^    2")).toEqual('4 + 2 ^ 3 ^ 2');
    });
    it("5 4 + 6 => 5 4 + 6", () => {
        expect(sanitizeInput("5 4 + 6")).toEqual('5 4 + 6');
    });
    it("5 4+6 => 5 4 + 6", () => {
        expect(sanitizeInput("5 4+6")).toEqual('5 4+6');
    });
    it("fact ( 5 ) => fact ( 5 )", () => {
        expect(sanitizeInput("fact ( 5 )")).toEqual('fact ( 5 )');
    });
    it("fact (5) => fact ( 5 )", () => {
        expect(sanitizeInput("fact (5)")).toEqual('fact ( 5 )');
    });
    it("abs(5 )- root3(8 ) +|-6|^2 => abs ( 5 ) - root 3 ( 8 ) + abs ( -6 ) ^ 2", () => {
        expect(sanitizeInput("abs(5 )- root3(8 ) +|-6|^2")).toEqual(
            "abs ( 5 ) - root 3 ( 8 ) + abs ( -6 ) ^ 2");
    });
    it("4!-|-123|+root 13 (    169 )+2*|12|+|-123| => 4! - abs ( -123 ) + root 13 ( 169 ) + 2 * abs ( 12 ) + abs ( -123 )", () => {
        expect(sanitizeInput("4!-|-123|+root 13 (    169 )+2*|12|+|-123|")).toEqual(
            "fact ( 4 ) - abs ( -123 ) + root 13 ( 169 ) + 2 * abs ( 12 ) + abs ( -123 )");
    });
    it("-5-5-5-5-5 => -5 - 5 - 5 - 5 - 5", () => {
        expect(sanitizeInput("-5-5-5-5-5")).toEqual("-5 - 5 - 5 - 5 - 5");
    });
    it("4!   -|-123    |^   root 13(169)   +2*    |12  |  +|  -123| => 4! - abs ( -123 ) ^ root 13 ( 169 ) + 2 * abs ( 12 ) + abs ( -123 )", () => {
        expect(sanitizeInput("4!   -|-123    |^   root 13(169)   +2*    |12  |  +|  -123|")).toEqual(
            "fact ( 4 ) - abs ( -123 ) ^ root 13 ( 169 ) + 2 * abs ( 12 ) + abs ( -123 )");
    });
})
