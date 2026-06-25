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

function myMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

console.log(myMap([1, 2, 3], (x) => x * 2)); // [2, 4, 6]

function myFilter(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(myFilter([1, 2, 3, 4], (x) => x % 2 === 0)); // [2, 4]

function myReduce(arr, callback, initialValue) {
  let accumulator;
  let startIndex;

  if (arguments.length >= 3) {
    // initial value WAS provided
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // no initial value
    accumulator = arr[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }
  return accumulator;
}

console.log(myReduce([1, 2, 3], (acc, x) => acc + x, 0)); // 6
console.log(myReduce([1, 2, 3], (acc, x) => acc + x)); // 6 (no initial value)
