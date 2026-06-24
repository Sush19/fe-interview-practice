/**
 * QUESTION 14 — Array Polyfills: map / filter / reduce (Easy)
 * ─────────────────────────────────────────────────────────
 * Re-implement the three workhorse array methods as standalone helpers,
 * without using the native Array.prototype versions.
 *
 *   myMap(arr, callback)            → new array of callback(el, i, arr) results
 *   myFilter(arr, callback)         → new array of els where callback is truthy
 *   myReduce(arr, callback, init)   → single accumulated value
 *
 * Requirements:
 *  - Each callback receives (element, index, array), matching the native API
 *  - myMap / myFilter return NEW arrays and do not mutate the input
 *  - myReduce: if no initial value is provided, use the first element as the
 *    accumulator and start iterating from index 1 (like the native method)
 *
 * Example:
 *   myMap([1, 2, 3], (x) => x * 2);            // [2, 4, 6]
 *   myFilter([1, 2, 3, 4], (x) => x % 2 === 0); // [2, 4]
 *   myReduce([1, 2, 3], (acc, x) => acc + x, 0); // 6
 *   myReduce([1, 2, 3], (acc, x) => acc + x);    // 6 (no initial value)
 *
 * Hints (expand only if stuck):
 *  - A simple for-loop is enough; push into a result array for map/filter
 *  - For reduce, track whether an initial value was supplied (arguments.length)
 *
 * Your solution → solutions/javascript/14-array-polyfills.js
 */
