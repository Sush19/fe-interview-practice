/**
 * QUESTION 3 — Event Delegation (Easy)
 * ─────────────────────────────────────────────────────────
 * Implement `delegate(parent, selector, eventType, handler)`.
 *
 * Instead of attaching listeners to each child element, attach ONE listener
 * to the parent and check if the event target matches the selector.
 *
 * Requirements:
 *  - Only ONE event listener added to `parent`
 *  - `handler` is called only when the event target matches `selector`
 *  - `handler` receives the original event object
 *  - Works for dynamically added children too
 *
 * Example:
 *   delegate(document.querySelector('#list'), 'li', 'click', (e) => {
 *     console.log(e.target.textContent);
 *   });
 *
 * Your solution → solutions/javascript/03-event-delegation.js
 */
