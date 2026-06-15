# System Design — Infinite Scroll Feed (Medium)

## Problem

Design an infinite scrolling feed (like a Twitter/LinkedIn timeline).
New items load automatically as the user scrolls to the bottom.

---

## Questions to answer

### 1. Scroll detection
- How do you detect "near the bottom"?
- Compare: scroll event listener vs IntersectionObserver. Which do you prefer and why?

```
YOUR ANSWER:
```

### 2. Pagination strategy
- Cursor-based vs offset-based pagination — which is better here and why?
- What does your API request/response look like?

```
YOUR ANSWER:
```

### 3. State shape
- What does your React state look like?

```js
// YOUR ANSWER — fill in the state shape:
const [state, setState] = useState({

});
```

### 4. Memory management
- After 500 items are loaded, the DOM is huge. How do you handle this?
- When would you remove items from the top of the list?

```
YOUR ANSWER:
```

### 5. Loading states
- What does the UI show while the next page loads?
- What happens when there are no more items?
- What happens if a page fetch fails?

```
YOUR ANSWER:
```

### 6. Avoiding duplicate fetches
- What prevents the fetch from firing twice when the user is near the bottom?

```
YOUR ANSWER:
```

### 7. Performance
- Why is rendering 500+ DOM nodes a problem?
- How would you combine infinite scroll with virtualisation?

```
YOUR ANSWER:
```

---

## Implementation task (optional)

Build a minimal working version using JSONPlaceholder:

```
GET https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10
GET https://jsonplaceholder.typicode.com/posts?_page=2&_limit=10
```

Your solution → `solutions/system-design/02-infinite-scroll.jsx`

---

## Reference checklist

- [ ] IntersectionObserver on a sentinel element at the bottom
- [ ] Loading flag to prevent duplicate requests
- [ ] Cursor/page stored in state
- [ ] Loading skeleton between pages
- [ ] "No more items" end state
- [ ] Error + retry UI
- [ ] Memory management plan (DOM pruning or virtualisation)
- [ ] Accessible: announce new content to screen readers
