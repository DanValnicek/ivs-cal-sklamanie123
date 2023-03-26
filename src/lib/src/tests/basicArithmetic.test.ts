import * as basicArithmetic from  '../operations/basicArithmetic'
describe('test add function', () => {
    it('should return 15 for add(10,5)', () => expect(basicArithmetic.add(5, 10)).toBe(15));
    it('should return 0', () => expect(basicArithmetic.add(5, -5)).toBe(0));
    it('should return -100', () => expect(basicArithmetic.add(100, -200)).toBe(-100));
    it('should return 1.5', () => expect(basicArithmetic.add(1,0.5)).toBe(1.5));
    it('should return -6.6', () => expect(basicArithmetic.add(12.8,-19.4)).toBe(-6.6));
    it('should return 0', () => expect(basicArithmetic.add(-1.435,1.435)).toBe(0));
});

describe('test substract function', () => {
    it('should return -5', () => expect(basicArithmetic.substract(5, 10)).toBe(-5));
    it('should return 10', () => expect(basicArithmetic.substract(5, -5)).toBe(10));
    it('should return 300', () => expect(basicArithmetic.substract(100, -200)).toBe(300));
    it('should return 0.5', () => expect(basicArithmetic.substract(1,0.5)).toBe(0.5));
    it('should return 32.2', () => expect(basicArithmetic.substract(12.8,-19.4)).toBe(32.2));
    it('should return 0', () => expect(basicArithmetic.substract(-1.435,1.435)).toBe(0));
});
describe('test multiply function', () => {
    it('should return 50', () => expect(basicArithmetic.multiply(5, 10)).toBe(50));
    it('should return -25', () => expect(basicArithmetic.multiply(5, -5)).toBe(-25));
    it('should return -20000', () => expect(basicArithmetic.multiply(100, -200)).toBe(-20000));
    it('should return 0.5', () => expect(basicArithmetic.multiply(1,0.5)).toBe(0.5));
    it('should return -248.32', () => expect(basicArithmetic.multiply(12.8,-19.4)).toBe(-248.32));
    it('should return -2.059225', () => expect(basicArithmetic.multiply(-1.435,1.435)).toBe(-2.059225));
});
describe('test divide function',() => {
    it('should return 0.5', () => expect(basicArithmetic.divide(5, 10)).toBe(0.5));
    it('should return -1', () => expect(basicArithmetic.divide(5, -5)).toBe(-1));
    it('should return -0.5', () => expect(basicArithmetic.divide(100, -200)).toBe(-0.5));
    it('should return 2', () => expect(basicArithmetic.divide(1,0.5)).toBe(2));
    it('should return undefined',  expect(basicArithmetic.divide(-1.435,0)).toBeUndefined);
})