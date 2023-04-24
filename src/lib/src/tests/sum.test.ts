import { sum } from '../operations/sum'

describe('test sum function', () => {
    it('should return 10', () => expect(sum(0, 4, 'n')).toBe(10));
    it('should return 15', () => expect(sum(0, 4, 'n + 1')).toBe(15));
    it('should return 20', () => expect(sum(0, 4, 'n * 2')).toBe(20));
    it('should return 30', () => expect(sum(0, 4, 'n ^ 2')).toBe(30));
    it('should return -10', () => expect(sum(0, 4, 'n - 4')).toBe(-10));
    it('should return 152', () => expect(sum(2, 5, 'fact ( n )')).toBe(152));
    it('should return 4', () => expect(sum(2, 5, 'abs ( n - 3 )')).toBe(4));
    it('should return 7.382332347', () => expect(sum(2, 5, 'root 2 ( n )')).toBe(7.382332347));
    it('should return undefined', () => expect(sum(2, 5, 'n / 0')).toBeUndefined());
    it('should return undefined', () => expect(sum(-2, 5, 'root 2 ( n )')).toBeUndefined());
});
