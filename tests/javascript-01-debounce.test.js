const { describe, it, expect, runSuite, notImplemented } = require('../utils/test-helpers');
const { debounce } = require('../solutions/javascript/01-debounce');

describe('debounce', () => {
  it('returns a function', () => {
    const fn = debounce(() => {}, 100);
    expect(typeof fn).toBe('function');
  });

  it('delays the function call', (done) => {
    let called = false;
    const fn = debounce(() => { called = true; }, 50);
    fn();
    expect(called).toBe(false); // not called immediately
  });

  it('calls fn with the latest arguments', () => {
    let lastArg;
    const fn = debounce((x) => { lastArg = x; }, 0);
    fn('a');
    fn('b');
    fn('c');
    // synchronously, fn should not have been called yet
    expect(lastArg).toBe(undefined);
  });

  it('has a .cancel() method', () => {
    const fn = debounce(() => {}, 100);
    expect(typeof fn.cancel).toBe('function');
  });

  it('cancel prevents the pending call', () => {
    let called = false;
    const fn = debounce(() => { called = true; }, 50);
    fn();
    fn.cancel();
    expect(called).toBe(false);
  });
});

module.exports = { run: runSuite };
