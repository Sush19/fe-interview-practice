/**
 * QUESTION 5 — Throttle (Medium)
 * ─────────────────────────────────────────────────────────
 * Implement `throttle(fn, interval, options)`.
 *
 * A throttled function executes at most once per `interval` milliseconds.
 *
 * Options:
 *  - `leading`  (default: true)  — invoke on the first call
 *  - `trailing` (default: true)  — invoke after the last call if skipped
 *
 * Example:
 *   const log = throttle(console.log, 1000);
 *   log(1); // fires immediately
 *   log(2); // ignored
 *   log(3); // fires 1000ms after first call
 *
 * Your solution → solutions/javascript/05-throttle.js
 */
