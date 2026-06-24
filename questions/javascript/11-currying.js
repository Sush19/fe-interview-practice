/**
 * QUESTION 11 — Currying (Medium)
 * ─────────────────────────────────────────────────────────
 * Implement `curry(fn)` that transforms a function of N arguments into a
 * sequence of calls that each take a subset of those arguments.
 *
 * The curried function should keep returning a new function until it has
 * received at least `fn.length` arguments, then invoke `fn`.
 *
 * Requirements:
 *  - Supports calling one argument at a time:   curry(fn)(1)(2)(3)
 *  - Supports passing several at once:           curry(fn)(1, 2)(3)
 *  - Supports all at once:                       curry(fn)(1, 2, 3)
 *  - Uses the original function's arity (fn.length) to know when to invoke
 *  - Preserves `this` context
 *
 * Example:
 *   const sum = (a, b, c) => a + b + c;
 *   const curried = curry(sum);
 *   curried(1)(2)(3);   // 6
 *   curried(1, 2)(3);   // 6
 *   curried(1)(2, 3);   // 6
 *   curried(1, 2, 3);   // 6
 *
 * Hints (expand only if stuck):
 *  - Compare collected args length against fn.length
 *  - When you have enough args, call fn.apply(this, args)
 *  - Otherwise return a function that concatenates new args and recurses
 *
 * Your solution → solutions/javascript/11-currying.js
 */
