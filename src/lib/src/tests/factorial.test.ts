import { factorialOfNumber } from '../factorial';
describe('test factorial function', () => {
  it('should return 120 for factorial(5)', () => {
    expect(factorialOfNumber(5)).toBe(120);
  });
  it('should return 1 for factorial(0)', () => {
    expect(factorialOfNumber(0)).toBe(1);
  });
  it('should return error for factorial(-5)', () => {
    expect(factorialOfNumber(-5)).toThrow('Input number must be postive');
  });
  it('should return error for factorial(1.5)', () => {
    expect(factorialOfNumber(1.5)).toThrow('Input number must be whole');
  });
  it('should return error for factorial(-1.5)', () => {
    expect(factorialOfNumber(-1.5)).toThrow('Input number must be whole and positive');
  });
});
