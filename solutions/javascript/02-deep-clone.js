/**
 * SOLUTION — Deep Clone
 * Write your solution below. Run `node runner.js` to test.
 */

function deepClone(value) {
  const visited = new WeakMap();

  function clone(val) {
    if (val === null || typeof val !== "object") {
      return val;
    }

    if (val instanceof Date) {
      return new Date(val.getTime());
    }

    if (visited.has(val)) {
      return visited.get(val);
    }

    const result = Array.isArray(val) ? [] : {};
    visited.set(val, result);

    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key)) {
        // ← safer
        result[key] = clone(val[key]);
      }
    }

    return result;
  }

  return clone(value);
}

module.exports = { deepClone };
