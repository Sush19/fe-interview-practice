const { describe, it, expect, runSuite, notImplemented } = require('../utils/test-helpers');
const { throttle } = require('../solutions/javascript/05-throttle');

describe('throttle', () => {
  it('returns a function', () => {
    const fn = throttle(() => {}, 100);
    expect(typeof fn).toBe('function');
  });

  it('invokes fn immediately on the first call (leading)', () => {
    let count = 0;
    const fn = throttle(() => { count += 1; }, 100);
    fn();
    expect(count).toBe(1);
  });

  it('ignores extra calls within the interval', () => {
    let count = 0;
    const fn = throttle(() => { count += 1; }, 100);
    fn();
    fn();
    fn();
    // only the leading call has run synchronously
    expect(count).toBe(1);
  });

  it('passes arguments through to fn', () => {
    let received;
    const fn = throttle((x) => { received = x; }, 100);
    fn('hello');
    expect(received).toBe('hello');
  });

  it('does not invoke on the first call when leading is false', () => {
    let count = 0;
    const fn = throttle(() => { count += 1; }, 100, { leading: false });
    fn();
    expect(count).toBe(0);
  });

  it('has a .cancel() method', () => {
    const fn = throttle(() => {}, 100);
    expect(typeof fn.cancel).toBe('function');
  });

  it('cancel prevents a pending trailing call', () => {
    let count = 0;
    const fn = throttle(() => { count += 1; }, 100);
    fn(); // leading → count = 1
    fn(); // schedules a trailing call
    fn.cancel();
    // no synchronous change beyond the leading invocation
    expect(count).toBe(1);
  });
});

module.exports = { run: runSuite };
