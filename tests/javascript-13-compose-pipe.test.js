const { describe, it, expect, runSuite } = require('../utils/test-helpers');
const { compose, pipe } = require('../solutions/javascript/13-compose-pipe');

const inc = (n) => n + 1;
const double = (n) => n * 2;

describe('compose', () => {
  it('runs right-to-left', () => {
    expect(compose(inc, double)(5)).toBe(11); // inc(double(5))
  });

  it('handles three functions', () => {
    expect(compose(inc, double, inc)(5)).toBe(13); // inc(double(inc(5)))
  });

  it('is identity with no functions', () => {
    expect(compose()(42)).toBe(42);
  });

  it('passes multiple args to the first (rightmost) fn', () => {
    const add = (a, b) => a + b;
    expect(compose(double, add)(3, 4)).toBe(14); // double(add(3,4))
  });
});

describe('pipe', () => {
  it('runs left-to-right', () => {
    expect(pipe(inc, double)(5)).toBe(12); // double(inc(5))
  });

  it('handles three functions', () => {
    expect(pipe(inc, double, inc)(5)).toBe(13); // inc(double(inc(5)))
  });

  it('is identity with no functions', () => {
    expect(pipe()(42)).toBe(42);
  });

  it('passes multiple args to the first (leftmost) fn', () => {
    const add = (a, b) => a + b;
    expect(pipe(add, double)(3, 4)).toBe(14); // double(add(3,4))
  });
});

module.exports = { run: runSuite };
