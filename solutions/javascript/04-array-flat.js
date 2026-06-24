/**
 * SOLUTION — Array Flat
 * Write your solution below. Run `node runner.js` to test.
 */

function flatten(arr, depth = 1) {
  if (!Array.isArray(arr)) {
    return [arr];
  }

  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 0) {
      acc.push(...flatten(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

module.exports = { flatten };
