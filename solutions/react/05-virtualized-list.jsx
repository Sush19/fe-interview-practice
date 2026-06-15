/**
 * QUESTION REACT-5 — Virtualized List (Hard)
 * ─────────────────────────────────────────────────────────
 * Render a list of 10,000 items WITHOUT rendering all of them at once.
 * Only render the items currently visible in the viewport.
 *
 * Requirements:
 *  - Fixed row height (e.g. 40px per row)
 *  - Scrollable container with a fixed height (e.g. 400px)
 *  - Render ONLY visible rows + a small overscan buffer (±3 rows)
 *  - Total scroll height must feel correct (so the scrollbar behaves naturally)
 *  - No external libraries (react-window, react-virtual, etc.)
 *
 * Example items:
 *   const items = Array.from({ length: 10000 }, (_, i) => `Item #${i + 1}`);
 *
 * Your solution → solutions/react/05-virtualized-list.jsx
 */
import { useState, useRef, useCallback } from 'react';

const ROW_HEIGHT = 40;
const VISIBLE_HEIGHT = 400;
const OVERSCAN = 3;

export default function VirtualizedList({ items }) {
  // YOUR CODE HERE
}
