/**
 * @file basicArithmetic.test.ts
 * @brief tests for basic arithmetic operations from the library
 * @see ivs-cal-sklamanie123/src/lib/src/operations/basicArithmetic.ts
 * @author Dan Valníček
 */

import * as basicArithmetic from  '../operations/basicArithmetic'

/**
 * @test {add}
 */
describe('test add function', () => {
    it('should return 15 for add(10,5)', () => expect(basicArithmetic.add(5, 10)).toBe(15));
    it('should return 0', () => expect(basicArithmetic.add(5, -5)).toBe(0));
    it('should return -100', () => expect(basicArithmetic.add(100, -200)).toBe(-100));
    it('should return 1.5', () => expect(basicArithmetic.add(1,0.5)).toBe(1.5));
    it('should return -6.6', () => expect(basicArithmetic.add(12.8,-19.4)).toBe(-6.6));
    it('should return 0', () => expect(basicArithmetic.add(-1.435,1.435)).toBe(0));
});

/**
 * @test {subtract}
 */
describe('test substract function', () => {
    it('should return -5', () => expect(basicArithmetic.subtract(5, 10)).toBe(-5));
    it('should return 10', () => expect(basicArithmetic.subtract(5, -5)).toBe(10));
    it('should return 300', () => expect(basicArithmetic.subtract(100, -200)).toBe(300));
    it('should return 0.5', () => expect(basicArithmetic.subtract(1,0.5)).toBe(0.5));
    it('should return 32.2', () => expect(basicArithmetic.subtract(12.8,-19.4)).toBe(32.2));
    it('should return 0', () => expect(basicArithmetic.subtract(-1.435,1.435)).toBe(-2.87));
});

/**
 * @test {multiply}
 */
describe('test multiply function', () => {
    it('should return 50', () => expect(basicArithmetic.multiply(5, 10)).toBe(50));
    it('should return -25', () => expect(basicArithmetic.multiply(5, -5)).toBe(-25));
    it('should return -20000', () => expect(basicArithmetic.multiply(100, -200)).toBe(-20000));
    it('should return 0.5', () => expect(basicArithmetic.multiply(1,0.5)).toBe(0.5));
    it('should return -248.32', () => expect(basicArithmetic.multiply(12.8,-19.4)).toBe(-248.32));
    it('should return -2.059225', () => expect(basicArithmetic.multiply(-1.435,1.435)).toBe(-2.059225));
});

/**
 * @test {divide}
 */
describe('test divide function',() => {
    it('should return 0.5', () => expect(basicArithmetic.divide(5, 10)).toBe(0.5));
    it('should return -1', () => expect(basicArithmetic.divide(5, -5)).toBe(-1));
    it('should return -0.5', () => expect(basicArithmetic.divide(100, -200)).toBe(-0.5));
    it('should return 2', () => expect(basicArithmetic.divide(1,0.5)).toBe(2));
    it('should return undefined',  expect(basicArithmetic.divide(-1.435,0)).toBeUndefined);
});

/**
 * @test {absolute}
 */
describe('test absolute value function',() => {
    it('should return 5', () => expect(basicArithmetic.absolute(5)).toBe(5));
    it('should return 5', () => expect(basicArithmetic.absolute(-5)).toBe(5));
    it('should return 0', () => expect(basicArithmetic.absolute(0)).toBe(0));
    it('should return 0.5', () => expect(basicArithmetic.absolute(-0.5)).toBe(0.5));
    it('should return 1.424242424', () => expect(basicArithmetic.absolute(-1.4242424242424242)).toBe(1.424242424));
})