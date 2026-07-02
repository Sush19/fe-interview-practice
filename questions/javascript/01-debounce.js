/**
 * QUESTION 1 — Debounce (Easy)
 * ─────────────────────────────────────────────────────────
 * Implement a `debounce(fn, delay)` function.
 *
 * A debounced function delays invoking `fn` until after `delay` milliseconds
 * have elapsed since the last time the debounced function was called.
 *
 * Requirements:
 *  - Returns a new function that wraps `fn`
 *  - Each call resets the timer
 *  - `fn` is called with the correct `this` context and arguments
 *  - The returned function has a `.cancel()` method to cancel any pending call
 *
 * Example:
 *   const log = debounce((msg) => console.log(msg), 300);
 *   log('a'); // timer starts
 *   log('b'); // timer resets
 *   // 300ms later → logs 'b'  (only once)
 *
 * Hints (expand only if stuck):
 *  - Use setTimeout / clearTimeout
 *  - Store the timer ID in a closure variable
 *  - Use rest parameters (...args) to forward arguments
 *
 * Your solution → solutions/javascript/01-debounce.js
 */

function debounce(fn, delay) {
    let timerId;
    
    return function(...arg) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn(...arg);
        }, delay)
    }
}

const searchString = debounce((str) => console.log('searching for', str), 500);

searchString('a');
searchString('ap');
searchString('app');
searchString('appl');
searchString('apple');

// Ouput: searching for apple

/* *------------------------------------------------------------* */

function debounce2(fn, delay) {
  let timerId = null;
  function debounced(...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }

  debounced.cancel = () => {
    clearTimeout(timerId);
    timerId = null;
  };

  return debounced;
}

const log = debounce2((msg) => console.log(msg), 500);
log('a'); // timer starts
log('b'); // timer resets
// 500ms later → logs 'b'  (only once)
