/**
 * QUESTION 7 — Promise.all() (Medium)
 * ─────────────────────────────────────────────────────────
 * Implement `promiseAll(promises)` that mirrors Promise.all().
 *
 * Requirements:
 *  - Returns a Promise that resolves with an array of results in order
 *  - Rejects immediately if any promise rejects
 *  - Handles an empty array (resolves with [])
 *  - Non-promise values in the array are treated as resolved
 *
 * Example:
 *   promiseAll([Promise.resolve(1), Promise.resolve(2)])
 *     .then(values => console.log(values)); // [1, 2]
 *
 *   promiseAll([Promise.resolve(1), Promise.reject('err')])
 *     .catch(err => console.log(err)); // 'err'
 *
 * Do NOT use Promise.all, Promise.allSettled, or Promise.race internally.
 *
 * Your solution → solutions/javascript/07-promise-all.js
 */
