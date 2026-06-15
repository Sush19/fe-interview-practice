/**
 * QUESTION REACT-3 — Avoid Unnecessary Re-renders (Medium)
 * ─────────────────────────────────────────────────────────
 * The component below re-renders more than it should.
 * Fix it using React.memo, useMemo, and/or useCallback.
 *
 * Task:
 *  1. Identify which components are re-rendering unnecessarily
 *  2. Apply the correct optimisation to each
 *  3. Add a comment explaining WHY each optimisation is needed
 *
 * Your solution → solutions/react/03-avoid-rerenders.jsx
 */
import { useState, useCallback, useMemo, memo } from 'react';

// This component re-renders every time the parent re-renders
// even when its props haven't changed. Fix it.
function ExpensiveChild({ label, onClick }) {
  console.log(`ExpensiveChild "${label}" rendered`);
  return <button onClick={onClick}>{label}</button>;
}

// This calculation runs on every render even when `items` hasn't changed.
// Fix it.
function ItemList({ items, filter }) {
  const filteredItems = items.filter(i => i.includes(filter)); // make this efficient
  return <ul>{filteredItems.map(i => <li key={i}>{i}</li>)}</ul>;
}

export default function App() {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');
  const items = ['apple', 'banana', 'apricot', 'cherry', 'avocado'];

  const handleClick = () => setCount(c => c + 1); // causes re-renders

  return (
    <div>
      <p>Count: {count}</p>
      <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter..." />
      <ExpensiveChild label="Increment" onClick={handleClick} />
      <ItemList items={items} filter={filter} />
    </div>
  );
}
