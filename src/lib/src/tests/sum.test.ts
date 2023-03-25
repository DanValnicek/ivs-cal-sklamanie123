import { sum } from '../operations/sum'

describe('test sum function', () => {
    it('should return 0', () => expect(sum([0,0,0])).toBe(0));
    it('should return null', expect(sum([])).toBeNull);
    it('should return -1.536', () => expect(sum([-0.5, 0.036, 0.5, -0.5, -0.95, -0.05])).toBe(-1.536));
    it('should return 742.973', () => expect(sum([0.43, 643.634, 98.9])).toBe(742.973));
    it('should return 1', () => expect(sum([1])).toBe(1));
    it('should return 32.3', () => expect(sum([10, 23.3, -1])).toBe(32.3));
    it('should return 13', () => expect(sum([1, 2, 4, 6])).toBe(13));
});
