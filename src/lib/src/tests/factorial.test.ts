/**
 * @file factorial.test.ts
 * @brief tests for factorial function
 * @see ivs-cal-sklamanie123/src/lib/src/operations/factorial.ts
 * @author Jakub Vodrážka
 */

import {factorial} from '../operations/factorial';

/**
 * @test {factorial}
 */
describe('test factorial function', () => {
    it('should return 120 for factorial(5)', () => {
        expect(factorial(5)).toBe(120);
    });
    it('should return 1 for factorial(0)', () => {
        expect(factorial(0)).toBe(1);
    });
    it('should return 1 for factorial(1)', () => {
        expect(factorial(1)).toBe(1);
    });
    it('should return undefined for factorial(1.5)', () => {
        expect(factorial(1.5)).toBe(undefined);
    });
    it('should return undefined for factorial(-5)', () => {
        expect(factorial(-5)).toBe(undefined);
    });
    it('should return undefined for factorial(-1.5)', () => {
        expect(factorial(-1.5)).toBe(undefined);
    });
});
