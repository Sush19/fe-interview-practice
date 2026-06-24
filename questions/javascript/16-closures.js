/**
 * QUESTION 16 — Closures (Easy)
 * ─────────────────────────────────────────────────────────
 * A closure is a function that "remembers" the variables from the scope in
 * which it was created, even after that scope has finished executing.
 * These two exercises both rely on private state captured in a closure.
 *
 * 1) createCounter(initial = 0)
 *    Returns an object with methods that share ONE private count variable:
 *      - increment()  → adds 1, returns the new count
 *      - decrement()  → subtracts 1, returns the new count
 *      - reset()      → sets count back to the initial value, returns it
 *      - value()      → returns the current count (without changing it)
 *    The count must NOT be accessible/mutable from outside except via methods.
 *    Two separate counters must keep independent state.
 *
 * 2) once(fn)
 *    Returns a wrapped function that invokes `fn` only the FIRST time it is
 *    called. Every later call returns the cached result of that first call
 *    (and does NOT call `fn` again). Arguments/`this` of the first call apply.
 *
 * Example:
 *   const c = createCounter(10);
 *   c.increment(); // 11
 *   c.increment(); // 12
 *   c.value();     // 12
 *   c.reset();     // 10
 *
 *   let calls = 0;
 *   const init = once(() => { calls++; return 'done'; });
 *   init(); // 'done', calls === 1
 *   init(); // 'done', calls still 1
 *
 * Hints (expand only if stuck):
 *  - Declare the private variable in the outer function; the returned
 *    methods/closure read & write it.
 *  - For once, keep a boolean "called" flag and a cached "result" in scope.
 *
 * Your solution → solutions/javascript/16-closures.js
 */
