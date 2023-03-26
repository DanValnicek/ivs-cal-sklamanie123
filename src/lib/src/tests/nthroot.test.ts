import { nThRoot } from '../nthroot';
describe('test nth root function', () => {
  it('should return 3', () => {
    expect(nThRoot(9, 2)).toBe(3);
  });
  it('should return 2', () => {
    expect(nThRoot(8, 3)).toBe(2);
  });
  it('should return given number', () => {
    expect(nThRoot(9, 1)).toBe(9);
  });

  it('should return given numbers mirror value', () => {
    expect(nThRoot(4, -1)).toBe(0.25);
  });
  it('should return given numbers mirror value', () => {
    expect(nThRoot(1000, -1)).toBe(0.001);
  });

  it('root -0.1 of 0', () => {
    expect(nThRoot(0, -0.1)).toBe(undefined);
  });
  it('root 0.1 of 0', () => {
    expect(nThRoot(0, 0.1)).toBe(0);
  });
  it('root -1 of 0', () => {
    expect(nThRoot(0, -1)).toBe(undefined);
  });
  it('root 1 of 0', () => {
    expect(nThRoot(0, 1)).toBe(0);
  });

  it('root -3 of 8', () => {
    expect(nThRoot(8, -3)).toBe(0.5);
  });
  it('root -1.5 of 8', () => {
    expect(nThRoot(8, -1.5)).toBe(0.25);
  });

  it('root 0.3 of 8', () => {
    expect(nThRoot(8, 0.3)).toBe(1024);
  });
  it('root 0.5 of 8', () => {
    expect(nThRoot(8, 0.5)).toBe(64);
  });
  it('root -0.6 of 8', () => {
    expect(nThRoot(8, -0.6)).toBe(0.03125);
  });
  it('root -0.5 of 4', () => {
    expect(nThRoot(4, -0.5)).toBe(0.0625);
  });
});
