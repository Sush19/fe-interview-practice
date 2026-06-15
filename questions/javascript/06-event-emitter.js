/**
 * QUESTION 6 — EventEmitter (Medium)
 * ─────────────────────────────────────────────────────────
 * Implement a class `EventEmitter` with the following methods:
 *
 *  - `on(event, listener)`    → subscribe to an event
 *  - `off(event, listener)`   → unsubscribe a specific listener
 *  - `emit(event, ...args)`   → call all listeners for the event
 *  - `once(event, listener)`  → subscribe, but auto-remove after first call
 *
 * Requirements:
 *  - Multiple listeners per event are supported
 *  - `off` removes only the specific listener (not all)
 *  - `emit` passes all extra args to each listener
 *  - Emitting an event with no listeners does nothing (no error)
 *
 * Example:
 *   const emitter = new EventEmitter();
 *   emitter.on('click', (x) => console.log(x));
 *   emitter.emit('click', 42); // logs 42
 *
 * Your solution → solutions/javascript/06-event-emitter.js
 */
