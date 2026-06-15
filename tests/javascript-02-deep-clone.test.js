const { describe, it, expect, runSuite } = require('../utils/test-helpers');
const { deepClone } = require('../solutions/javascript/02-deep-clone');

describe('deepClone', () => {
  it('clones primitives', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(null)).toBeNull();
  });

  it('clones a flat object', () => {
    const obj = { a: 1, b: 2 };
    const clone = deepClone(obj);
    expect(clone.a).toBe(1);
    expect(clone.b).toBe(2);
  });

  it('deep clone does not share references', () => {
    const obj = { a: { b: 1 } };
    const clone = deepClone(obj);
    clone.a.b = 99;
    expect(obj.a.b).toBe(1);
  });

  it('clones arrays', () => {
    const arr = [1, [2, 3], { x: 4 }];
    const clone = deepClone(arr);
    clone[1].push(99);
    expect(arr[1].length).toBe(2);
  });

  it('clones nested objects', () => {
    const obj = { a: { b: { c: { d: 42 } } } };
    const clone = deepClone(obj);
    expect(clone.a.b.c.d).toBe(42);
    clone.a.b.c.d = 0;
    expect(obj.a.b.c.d).toBe(42);
  });

  it('clones Date objects', () => {
    const d = new Date('2024-01-01');
    const clone = deepClone(d);
    expect(clone instanceof Date).toBeTruthy();
    expect(clone.getTime()).toBe(d.getTime());
  });

  it('cloned Date is a different instance', () => {
    const d = new Date('2024-01-01');
    const clone = deepClone(d);
    expect(clone === d).toBeFalsy();
  });
});

module.exports = { run: runSuite };
