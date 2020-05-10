import { sum } from './util';

describe('util tests', () => {
  it('simple sum', () => {
    expect(sum(4, 5)).toBe(9);
  });

  it('simple sum 0', () => {
    expect(sum(3, 0)).toBe(3);
  });

  it('simple sum neg', () => {
    expect(sum(2, -4)).toBe(-2);
  });
});
