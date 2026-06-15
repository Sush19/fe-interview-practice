/**
 * QUESTION 8 — Memoize (Medium)
 * ─────────────────────────────────────────────────────────
 * Implement `memoize(fn)` that caches results based on arguments.
 *
 * Requirements:
 *  - Works with any number of arguments
 *  - Returns cached result on repeated calls with same args
 *  - Cache key must account for ALL arguments
 *  - Does not break if arguments are objects (use JSON.stringify for key)
 *
 * Example:
 *   let callCount = 0;
 *   const add = memoize((a, b) => { callCount++; return a + b; });
 *   add(1, 2); // 3 — computed
 *   add(1, 2); // 3 — from cache, callCount still 1
 *
 * Bonus: add a `.cache` property to the returned function to inspect the cache.
 *
 * Your solution → solutions/javascript/08-memoize.js
 */
