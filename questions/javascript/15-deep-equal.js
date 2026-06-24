/**
 * QUESTION 15 — Deep Equal (Medium)
 * ─────────────────────────────────────────────────────────
 * Implement `deepEqual(a, b)` that returns true when two values are
 * structurally equal — recursing into nested objects and arrays.
 *
 * Requirements:
 *  - Primitives compare by value (use a strict comparison)
 *  - Objects are equal when they have the same set of keys and each
 *    corresponding value is deeply equal
 *  - Arrays are equal when they have the same length and equal elements
 *    in the same order
 *  - Order of object keys does NOT matter
 *  - null is only equal to null (and distinct from {})
 *
 * Example:
 *   deepEqual(1, 1);                                  // true
 *   deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 });        // true
 *   deepEqual([1, [2, 3]], [1, [2, 3]]);              // true
 *   deepEqual({ a: 1 }, { a: 1, b: 2 });              // false
 *   deepEqual(null, {});                              // false
 *
 * Hints (expand only if stuck):
 *  - If a === b, they're equal (covers primitives and same reference)
 *  - typeof null is "object" — guard for null explicitly
 *  - Compare Object.keys(a).length to Object.keys(b).length, then recurse
 *
 * Your solution → solutions/javascript/15-deep-equal.js
 */
