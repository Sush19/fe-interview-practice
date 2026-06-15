/**
 * QUESTION REACT-2 — useLocalStorage Hook (Medium)
 * ─────────────────────────────────────────────────────────
 * Implement `useLocalStorage(key, initialValue)`.
 *
 * Behaves like useState, but persists to localStorage.
 *
 * Requirements:
 *  - Returns [storedValue, setValue] like useState
 *  - Reads initial value from localStorage (falls back to initialValue)
 *  - Writes to localStorage on every setValue call
 *  - Handles JSON serialisation / deserialisation
 *  - Handles errors gracefully (e.g. localStorage disabled in private mode)
 *
 * Your solution → solutions/react/02-use-local-storage.jsx
 */
import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  // YOUR CODE HERE
}
