/**
 * QUESTION 9 — Async Scheduler with Concurrency Limit (Hard)
 * ─────────────────────────────────────────────────────────
 * Implement a `Scheduler` class that limits how many async tasks run at once.
 *
 * API:
 *   const scheduler = new Scheduler(2); // max 2 concurrent tasks
 *   scheduler.add(asyncTask);           // returns a Promise
 *
 * Requirements:
 *  - At most `concurrency` tasks run simultaneously
 *  - `add()` returns a Promise that resolves with the task's return value
 *  - Queued tasks start as soon as a slot opens
 *  - Order of completion follows task completion (not insertion order)
 *
 * Example:
 *   const delay = (ms, val) => new Promise(r => setTimeout(() => r(val), ms));
 *   const s = new Scheduler(2);
 *   s.add(() => delay(400, 'a')).then(console.log); // logs 'a' at t=400
 *   s.add(() => delay(200, 'b')).then(console.log); // logs 'b' at t=200
 *   s.add(() => delay(100, 'c')).then(console.log); // queued, logs 'c' at t=300
 *
 * Your solution → solutions/javascript/09-async-scheduler.js
 */
