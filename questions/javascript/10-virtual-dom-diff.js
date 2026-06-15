/**
 * QUESTION 10 — Virtual DOM Diff (Hard)
 * ─────────────────────────────────────────────────────────
 * Implement `diff(oldVNode, newVNode)` that computes a list of patches
 * needed to transform the old virtual DOM tree into the new one.
 *
 * A VNode looks like:
 *   { type: 'div', props: { id: 'app' }, children: [ ...VNodes ] }
 *   or a string for text nodes: 'Hello'
 *
 * Your diff function should return an array of patch objects, e.g.:
 *   { op: 'REPLACE', node: newVNode }       — node type changed
 *   { op: 'PROPS',   props: { changed } }   — props changed
 *   { op: 'TEXT',    text: 'new text' }     — text content changed
 *   { op: 'REMOVE' }                        — node removed
 *   { op: 'INSERT',  node: newVNode }       — node added
 *   { op: 'CHILDREN', patches: [...] }      — recurse into children
 *
 * Requirements:
 *  - Handle text nodes vs element nodes
 *  - Detect prop changes (added, removed, modified)
 *  - Recurse into children (no key-based reconciliation needed)
 *
 * Example:
 *   const oldTree = { type: 'div', props: { class: 'a' }, children: [] };
 *   const newTree = { type: 'div', props: { class: 'b' }, children: [] };
 *   diff(oldTree, newTree);
 *   // [{ op: 'PROPS', props: { class: 'b' } }]
 *
 * Your solution → solutions/javascript/10-virtual-dom-diff.js
 */
