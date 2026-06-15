const { describe, it, expect, runSuite } = require('../utils/test-helpers');
const { memoize } = require('../solutions/javascript/08-memoize');

describe('memoize', () => {
  it('returns correct result', () => {
    const add = memoize((a, b) => a + b);
    expect(add(1, 2)).toBe(3);
  });

  it('does not recompute on same args', () => {
    let calls = 0;
    const fn = memoize((x) => { calls++; return x * 2; });
    fn(5);
    fn(5);
    expect(calls).toBe(1);
  });

  it('recomputes on different args', () => {
    let calls = 0;
    const fn = memoize((x) => { calls++; return x; });
    fn(1);
    fn(2);
    expect(calls).toBe(2);
  });

  it('works with multiple arguments', () => {
    const fn = memoize((a, b, c) => a + b + c);
    expect(fn(1, 2, 3)).toBe(6);
    expect(fn(1, 2, 3)).toBe(6);
  });

  it('distinguishes (1,2) from (2,1)', () => {
    let calls = 0;
    const fn = memoize((a, b) => { calls++; return a - b; });
    fn(1, 2);
    fn(2, 1);
    expect(calls).toBe(2);
  });

  it('caches result of zero', () => {
    let calls = 0;
    const fn = memoize(() => { calls++; return 0; });
    fn();
    fn();
    expect(calls).toBe(1);
  });
});

module.exports = { run: runSuite };
