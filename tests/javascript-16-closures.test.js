const { describe, it, expect, runSuite } = require('../utils/test-helpers');
const { createCounter, once } = require('../solutions/javascript/16-closures');

describe('createCounter', () => {
  it('starts at the initial value', () => {
    expect(createCounter(10).value()).toBe(10);
  });

  it('defaults the initial value to 0', () => {
    expect(createCounter().value()).toBe(0);
  });

  it('increments and decrements', () => {
    const c = createCounter(0);
    expect(c.increment()).toBe(1);
    expect(c.increment()).toBe(2);
    expect(c.decrement()).toBe(1);
  });

  it('resets back to the initial value', () => {
    const c = createCounter(5);
    c.increment();
    c.increment();
    expect(c.reset()).toBe(5);
    expect(c.value()).toBe(5);
  });

  it('keeps separate counters independent', () => {
    const a = createCounter(0);
    const b = createCounter(100);
    a.increment();
    expect(a.value()).toBe(1);
    expect(b.value()).toBe(100);
  });
});

describe('once', () => {
  it('calls the underlying fn only the first time', () => {
    let calls = 0;
    const init = once(() => { calls++; return 'done'; });
    init();
    init();
    init();
    expect(calls).toBe(1);
  });

  it('returns the cached first result on later calls', () => {
    let n = 0;
    const fn = once(() => ++n);
    expect(fn()).toBe(1);
    expect(fn()).toBe(1);
  });

  it('passes first-call arguments through to fn', () => {
    const add = once((a, b) => a + b);
    expect(add(2, 3)).toBe(5);
    expect(add(10, 10)).toBe(5); // ignored — cached result returned
  });
});

module.exports = { run: runSuite };
