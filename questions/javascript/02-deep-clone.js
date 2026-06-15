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
