/**
 * QUESTION 12 — Custom call / apply / bind (Medium)
 * ─────────────────────────────────────────────────────────
 * Re-implement the three core function-context methods as standalone helpers.
 * This tests your understanding of `this` binding.
 *
 *   myCall(fn, context, ...args)   → calls fn with `this = context`, returns result
 *   myApply(fn, context, argsArr)  → like myCall but args passed as an array
 *   myBind(fn, context, ...args)   → returns a NEW function permanently bound
 *                                     to context, with partial args pre-filled
 *
 * Requirements:
 *  - Do NOT use the native Function.prototype.call/apply/bind to do the work
 *    (the whole point is to recreate them — temporarily attaching fn to the
 *    context object is the classic trick).
 *  - myBind must support partial application:
 *      const add = (a, b) => a + b;
 *      myBind(add, null, 5)(10) === 15
 *
 * Example:
 *   const person = { name: 'Ada' };
 *   function greet(greeting) { return `${greeting}, ${this.name}`; }
 *   myCall(greet, person, 'Hi');          // "Hi, Ada"
 *   myApply(greet, person, ['Hello']);    // "Hello, Ada"
 *   const bound = myBind(greet, person);
 *   bound('Hey');                         // "Hey, Ada"
 *
 * Hints (expand only if stuck):
 *  - Assign fn to a temporary key on context, invoke it, then delete the key
 *  - Handle a null/undefined context by falling back to a plain object
 *  - For myBind, return a closure that concatenates the bound + new args
 *
 * Your solution → solutions/javascript/12-call-apply-bind.js
 */
