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
