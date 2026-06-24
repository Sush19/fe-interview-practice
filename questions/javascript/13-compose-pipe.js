/**
 * QUESTION 13 — Compose & Pipe (Medium)
 * ─────────────────────────────────────────────────────────
 * Implement two higher-order functions for function composition.
 *
 *   compose(...fns) → returns a function that runs the fns RIGHT-to-LEFT
 *   pipe(...fns)    → returns a function that runs the fns LEFT-to-RIGHT
 *
 * Both take the output of one function and feed it as the input of the next.
 * The first function in the chain may take multiple arguments; every
 * subsequent function takes a single value.
 *
 * Requirements:
 *  - compose(f, g, h)(x) === f(g(h(x)))
 *  - pipe(f, g, h)(x)    === h(g(f(x)))
 *  - With no functions, the result is the identity (returns its input)
 *  - The first function receives all arguments passed to the composed fn
 *
 * Example:
 *   const inc = (n) => n + 1;
 *   const double = (n) => n * 2;
 *   compose(inc, double)(5);  // inc(double(5)) = 11
 *   pipe(inc, double)(5);     // double(inc(5)) = 12
 *
 * Hints (expand only if stuck):
 *  - Array.prototype.reduce / reduceRight are a natural fit
 *  - Identity for an empty chain: (x) => x
 *
 * Your solution → solutions/javascript/13-compose-pipe.js
 */
