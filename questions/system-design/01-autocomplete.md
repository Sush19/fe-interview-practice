# System Design — Autocomplete / Type-ahead (Medium)

## Problem

Design a production-ready autocomplete component for a search input.
When the user types, suggestions appear in a dropdown below the input.

---

## Requirements to cover in your design

### Functional
- Show up to 10 suggestions as the user types
- Keyboard navigable (↑ ↓ Enter Escape)
- Clicking a suggestion fills the input
- Works with both a local dataset and a remote API

### Non-functional
- Fast perceived performance (no jank)
- Handles slow/failing network gracefully
- Accessible (ARIA attributes, screen reader friendly)

---

## Questions to answer (write your answers below)

### 1. API & data flow
- What does the fetch call look like? What's the URL structure?
- How do you handle the response?

```
YOUR ANSWER:
```

### 2. Debouncing
- Why do you need debounce here?
- What delay would you choose and why?

```
YOUR ANSWER:
```

### 3. Caching
- How would you cache previous query results to avoid redundant API calls?
- Where does the cache live (memory, localStorage)?

```
YOUR ANSWER:
```

### 4. Race conditions
- What happens if the user types fast and responses come back out of order?
- How do you ensure only the latest response is displayed?

```
YOUR ANSWER:
```

### 5. Loading & error states
- What does the UI show while loading?
- What does it show if the API fails?

```
YOUR ANSWER:
```

### 6. Accessibility
- What ARIA roles/attributes does the component need?
- How should keyboard navigation work?

```
YOUR ANSWER:
```

### 7. Component API (if building as a reusable component)
- What props would you expose?
- Example:

```jsx
// YOUR ANSWER:
<Autocomplete
  // list your props here
/>
```

---

## Bonus: draw the component tree

```
App
└── SearchBar
    ├── Input
    └── SuggestionList
        └── SuggestionItem (×n)
```

Extend or modify the tree above as needed.

---

## Reference checklist (check after you're done)

- [ ] Debounce on input
- [ ] AbortController or flag to cancel stale requests
- [ ] Cache layer for repeated queries
- [ ] Loading spinner / skeleton
- [ ] Error message with retry
- [ ] Keyboard navigation (↑↓ Enter Esc)
- [ ] ARIA: role="combobox", role="listbox", aria-activedescendant
- [ ] Click outside to dismiss
- [ ] Highlight matched text in suggestions
