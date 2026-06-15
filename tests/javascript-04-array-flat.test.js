const { describe, it, expect, runSuite } = require('../utils/test-helpers');
const { flatten } = require('../solutions/javascript/04-array-flat');

describe('flatten', () => {
  it('default depth 1', () => {
    expect(flatten([1, [2, 3]])).toEqual([1, 2, 3]);
  });

  it('depth 1 does not flatten deeper', () => {
    expect(flatten([1, [2, [3]]])).toEqual([1, 2, [3]]);
  });

  it('depth 2', () => {
    expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });

  it('depth Infinity flattens completely', () => {
    expect(flatten([1, [2, [3, [4]]]], Infinity)).toEqual([1, 2, 3, 4]);
  });

  it('handles empty array', () => {
    expect(flatten([])).toEqual([]);
  });

  it('handles already flat array', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('does not mutate original', () => {
    const arr = [1, [2, 3]];
    flatten(arr);
    expect(arr.length).toBe(2);
  });
});

module.exports = { run: runSuite };
