const { describe, it, expect, runSuite } = require('../utils/test-helpers');
const { deepEqual } = require('../solutions/javascript/15-deep-equal');

describe('deepEqual', () => {
  it('compares equal primitives', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('x', 'x')).toBe(true);
  });

  it('compares unequal primitives', () => {
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual(1, '1')).toBe(false);
  });

  it('compares flat objects ignoring key order', () => {
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
  });

  it('detects a missing key', () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it('detects a differing value', () => {
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('recurses into nested objects', () => {
    expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true);
  });

  it('compares arrays by order and value', () => {
    expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(deepEqual([1, 2, 3], [3, 2, 1])).toBe(false);
  });

  it('treats null distinctly from an object', () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(null, {})).toBe(false);
  });

  it('handles empty containers', () => {
    expect(deepEqual({}, {})).toBe(true);
    expect(deepEqual([], [])).toBe(true);
  });
});

module.exports = { run: runSuite };
