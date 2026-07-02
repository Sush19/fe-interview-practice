/**
 * SOLUTION — Throttle
 * Write your solution below. Run `node runner.js` to test.
 */

function throttle(fn, interval, options = {}) {
  const { leading = true, trailing = true } = options;
  let timerId = null;
  let lastArgs = null;
  let lastThis = null;
  let lastCallTime = 0;

  function invoke(time) {
    lastCallTime = time;
    fn.apply(lastThis, lastArgs);
    lastArgs = lastThis = null;
  }

  function throttled(...args) {
    const now = Date.now();
    if (lastCallTime === 0 && !leading) lastCallTime = now;

    const remaining = interval - (now - lastCallTime);
    lastArgs = args;
    lastThis = this;

    if (remaining <= 0 || remaining > interval) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      invoke(now);
    } else if (!timerId && trailing) {
      timerId = setTimeout(() => {
        lastCallTime = leading ? Date.now() : 0;
        timerId = null;
        invoke(Date.now());
      }, remaining);
    }
  }

  throttled.cancel = () => {
    clearTimeout(timerId);
    timerId = null;
    lastCallTime = 0;
    lastArgs = lastThis = null;
  };

  return throttled;
}

module.exports = { throttle };
