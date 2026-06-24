const { describe, it, expect, runSuite } = require('../utils/test-helpers');
const { myMap, myFilter, myReduce } = require('../solutions/javascript/14-array-polyfills');

describe('myMap', () => {
  it('maps values', () => {
    expect(myMap([1, 2, 3], (x) => x * 2)).toEqual([2, 4, 6]);
  });

  it('passes index to callback', () => {
    expect(myMap([10, 20], (x, i) => x + i)).toEqual([10, 21]);
  });

  it('does not mutate the original', () => {
    const arr = [1, 2, 3];
    myMap(arr, (x) => x * 2);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('handles empty array', () => {
    expect(myMap([], (x) => x)).toEqual([]);
  });
});

describe('myFilter', () => {
  it('keeps truthy matches', () => {
    expect(myFilter([1, 2, 3, 4], (x) => x % 2 === 0)).toEqual([2, 4]);
  });

  it('returns empty when nothing matches', () => {
    expect(myFilter([1, 3, 5], (x) => x % 2 === 0)).toEqual([]);
  });

  it('passes index to callback', () => {
    expect(myFilter([10, 20, 30], (x, i) => i > 0)).toEqual([20, 30]);
  });
});

describe('myReduce', () => {
  it('reduces with an initial value', () => {
    expect(myReduce([1, 2, 3], (acc, x) => acc + x, 0)).toBe(6);
  });

  it('reduces without an initial value', () => {
    expect(myReduce([1, 2, 3], (acc, x) => acc + x)).toBe(6);
  });

  it('returns the initial value for an empty array', () => {
    expect(myReduce([], (acc, x) => acc + x, 100)).toBe(100);
  });

  it('builds an object accumulator', () => {
    const out = myReduce(['a', 'b'], (acc, k) => { acc[k] = true; return acc; }, {});
    expect(out).toEqual({ a: true, b: true });
  });
});

module.exports = { run: runSuite };
