/**
 * QUESTION 2 — Deep Clone (Easy)
 * ─────────────────────────────────────────────────────────
 * Implement `deepClone(value)` WITHOUT using JSON.parse / JSON.stringify.
 *
 * Requirements:
 *  - Handles primitives (string, number, boolean, null, undefined)
 *  - Handles plain objects (nested)
 *  - Handles arrays (nested)
 *  - Handles Date objects (clone as new Date)
 *  - Cloned object shares NO references with the original
 *
 * Example:
 *   const obj = { a: 1, b: { c: [2, 3] }, d: new Date() };
 *   const clone = deepClone(obj);
 *   clone.b.c.push(99);
 *   console.log(obj.b.c); // [2, 3] — untouched
 *
 * Bonus: handle circular references without crashing.
 *
 * Your solution → solutions/javascript/02-deep-clone.js
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
      if (val.hasOwnProperty(key)) {
        result[key] = clone(val[key]);
      }
    }

    return result;
  }

  return clone(value);
}
