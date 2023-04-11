import { nThRoot } from '../operations/nthroot';
describe('test nth root function', () => {
  it('should return 3', () => {
    expect(nThRoot(2,9 )).toBe(3);
  });
  it('should return 2', () => {
    expect(nThRoot(3,8 )).toBe(2);
  });
  it('should return given number', () => {
    expect(nThRoot(1,9 )).toBe(9);
  });

  it('should return given numbers mirror value', () => {
    expect(nThRoot(-1,4 )).toBe(0.25);
  });
  it('should return given numbers mirror value', () => {
    expect(nThRoot(-1,1000 )).toBe(0.001);
  });

  it('root -0.1 of 0', () => {
    expect(nThRoot(-0.1,0 )).toBe(undefined);
  });
  it('root 0.1 of 0', () => {
    expect(nThRoot(0.1,0 )).toBe(0);
  });
  it('root -1 of 0', () => {
    expect(nThRoot(-1,0 )).toBe(undefined);
  });
  it('root 1 of 0', () => {
    expect(nThRoot(1,0 )).toBe(0);
  });

  it('root -3 of 8', () => {
    expect(nThRoot(-3,8 )).toBe(0.5);
  });
  it('root -1.5 of 8', () => {
    expect(nThRoot(-1.5,8 )).toBe(0.25);
  });

  it('root 0.3 of 8', () => {
    expect(nThRoot(0.3,8 )).toBe(1024);
  });
  it('root 0.5 of 8', () => {
    expect(nThRoot(0.5,8 )).toBe(64);
  });
  it('root -0.6 of 8', () => {
    expect(nThRoot(-0.6,8 )).toBe(0.03125);
  });
  it('root -0.5 of 4', () => {
    expect(nThRoot(-0.5,4 )).toBe(0.0625);
  });
});
