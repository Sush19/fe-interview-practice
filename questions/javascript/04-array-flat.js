/**
 * QUESTION 4 — Array.flat() (Easy)
 * ─────────────────────────────────────────────────────────
 * Implement `flatten(arr, depth)` that mirrors Array.prototype.flat().
 *
 * Requirements:
 *  - Default depth is 1
 *  - depth = Infinity flattens fully
 *  - Does not mutate the original array
 *  - Handles empty arrays and non-array items correctly
 *
 * Example:
 *   flatten([1, [2, [3, [4]]]]);         // [1, 2, [3, [4]]]
 *   flatten([1, [2, [3, [4]]]], 2);      // [1, 2, 3, [4]]
 *   flatten([1, [2, [3, [4]]]], Infinity); // [1, 2, 3, 4]
 *
 * Your solution → solutions/javascript/04-array-flat.js
 */
