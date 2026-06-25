/**
 * SOLUTION — Array Polyfills: map / filter / reduce
 * Write your solution below. Run `node runner.js` to test.
 */

function myMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

function myFilter(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

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

module.exports = { myMap, myFilter, myReduce };
