/**
 * QUESTION 5 — Throttle (Medium)
 * ─────────────────────────────────────────────────────────
 * Implement `throttle(fn, interval, options)`.
 *
 * A throttled function executes at most once per `interval` milliseconds,
 * no matter how many times it is called.
 *
 * Options:
 *  - `leading`  (default: true)  — invoke on the first call
 *  - `trailing` (default: true)  — invoke after the last call if skipped
 *
 * Requirements:
 *  - Returns a new function that wraps `fn`
 *  - `fn` runs at most once per `interval`
 *  - `fn` is called with the correct `this` context and latest arguments
 *  - The returned function has a `.cancel()` method to clear any pending call
 *
 * Example:
 *   const log = throttle(console.log, 1000);
 *   log(1); // fires immediately (leading)
 *   log(2); // ignored
 *   log(3); // fires 1000ms after first call (trailing, with latest args → 3)
 *
 * Hints (expand only if stuck):
 *  - Track the timestamp of the last invocation in a closure variable
 *  - Compare Date.now() against that timestamp to decide "run now" vs "later"
 *  - Use setTimeout for the trailing call; store the latest args/this for it
 *
 * Your solution → solutions/javascript/05-throttle.js
 */

function throttle(fn, interval) {
    let isCoolDown = false;
    
    return function(...arg) {
        if(isCoolDown) {
            return;
        }
        
        fn(...arg);
        isCoolDown = true;
        setTimeout(() => {
            isCoolDown = false;
        }, interval);
    }
}

const log = throttle((arg) => console.log(arg), 1000);
log(1);     // runs immediately -> logs 1
log(2);     // still on cooldown -> ignored

setTimeout(() => {
    log(3);     // called 1500ms later -> cooldown has lifted -> runs -> logs 3
}, 1000);

/* *-----------------------------------------* */

function throttle2(fn, interval, options = {}) {
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

const log2 = throttle2((n) => console.log(n), 1000);
log2(1); // fires immediately (leading)
log2(2); // ignored
log2(3); // fires 1000ms after the first call (trailing, latest args → 3)
