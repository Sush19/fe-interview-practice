const { describe, it, expect, runSuite } = require('../utils/test-helpers');
const { curry } = require('../solutions/javascript/11-currying');

describe('curry', () => {
  const sum = (a, b, c) => a + b + c;

  it('invokes when all args passed at once', () => {
    expect(curry(sum)(1, 2, 3)).toBe(6);
  });

  it('supports one argument at a time', () => {
    expect(curry(sum)(1)(2)(3)).toBe(6);
  });

  it('supports partial groups: (1, 2)(3)', () => {
    expect(curry(sum)(1, 2)(3)).toBe(6);
  });

  it('supports partial groups: (1)(2, 3)', () => {
    expect(curry(sum)(1)(2, 3)).toBe(6);
  });

  it('works for a two-arg function', () => {
    const mul = (a, b) => a * b;
    expect(curry(mul)(4)(5)).toBe(20);
  });

  it('returns a function before enough args are collected', () => {
    const partial = curry(sum)(1)(2);
    expect(typeof partial).toBe('function');
  });

  it('produces independent curried chains', () => {
    const curried = curry(sum);
    expect(curried(1)(2)(3)).toBe(6);
    expect(curried(10)(20)(30)).toBe(60);
  });
});

module.exports = { run: runSuite };
