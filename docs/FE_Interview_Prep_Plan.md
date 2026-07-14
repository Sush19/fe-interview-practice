# Frontend Interview Mastery Plan
### JavaScript + ES6+ + DSA + React + Next.js + TypeScript
**Built for:** Sushil Sarraf | 12+ years experience, urgent interview prep
**Daily commitment:** 3+ hours | **Duration:** 14-day intensive sprint

---

## How to use this document

Each day has 3 blocks: **JS/TS (60 min) → DSA (60 min) → React/Next (60 min)**.
Don't just read the Q&A — say answers out loud or explain to a rubber duck. Interviewers judge *how* you explain, not just *what* you know. For every "explain X" question below, practice a 60-90 second spoken answer.

---

## THE 14-DAY SPRINT

| Day | JS / ES6+ / TS Focus | DSA Focus | React / Next Focus |
|---|---|---|---|
| 1 | Execution context, hoisting, scope, `this` | Arrays & strings basics, Big-O | JSX, Virtual DOM, reconciliation |
| 2 | Closures, IIFE, currying | Two pointers, sliding window | Component lifecycle, hooks basics |
| 3 | Prototypes, prototypal inheritance, classes | Hashmaps/objects for lookups | useState, useEffect deep dive |
| 4 | Event loop, microtask vs macrotask | Recursion basics | useRef, useMemo, useCallback |
| 5 | Promises, async/await, error handling | String manipulation problems | Custom hooks, rules of hooks |
| 6 | ES6+ destructuring, spread/rest, modules | Sorting algorithms overview | Context API, prop drilling solutions |
| 7 | **Mock interview + review weak areas** | **Mixed problem set (timed)** | **Build a mini component from scratch** |
| 8 | Generators, iterators, Symbol, Map/Set | Linked list basics (conceptual) | Reconciliation, keys, Fiber architecture |
| 9 | Polyfills: debounce, throttle, deep clone | Array flattening, grouping | Performance: React.memo, lazy, Suspense |
| 10 | `call/apply/bind`, currying, memoization | Frequency counting, two-sum family | Next.js: SSR vs SSG vs ISR vs CSR |
| 11 | TypeScript: types, interfaces, generics | Practice mixed set (timed) | Next.js: App Router, data fetching, API routes |
| 12 | TypeScript: utility types, narrowing | Practice mixed set (timed) | Next.js: middleware, image/font optimization |
| 13 | **Full mock interview (JS + React + Next)** | **Full mock DSA round (timed, 45 min)** | **System design: build a scalable component** |
| 14 | Review all weak spots + flashcard pass | Review all weak spots | Review all weak spots |

**Daily rhythm suggestion (3 hrs):**
- 60 min: Read 8-10 Q&A from the relevant section below, write your own answer *before* checking mine
- 60 min: Solve 3-5 DSA problems on paper/editor without looking at solutions first
- 60 min: Read React/Next section + rebuild one small pattern from scratch (e.g., a custom `useFetch` hook)

---

# PART 1 — JAVASCRIPT FUNDAMENTALS

### Q1. What is hoisting?
JavaScript moves variable and function *declarations* to the top of their scope during compilation, before code executes. `var` declarations are hoisted and initialized as `undefined`. `let`/`const` are hoisted but stay in the "temporal dead zone" (TDZ) until their declaration line runs — accessing them earlier throws a `ReferenceError`. Function declarations are hoisted with their full body; function *expressions* and arrow functions are not.

```js
console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError
let b = 5;
```

### Q2. Explain the difference between `var`, `let`, and `const`.
- `var` is function-scoped, hoisted with `undefined`, can be redeclared.
- `let` is block-scoped, hoisted into TDZ, cannot be redeclared in the same scope, can be reassigned.
- `const` is block-scoped like `let`, but cannot be reassigned. Note: for objects/arrays, `const` prevents reassigning the *binding*, not mutation of contents.

### Q3. What is a closure? Give a practical example.
A closure is a function that retains access to its lexical scope even after the outer function has returned. It "closes over" variables.

```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
counter(); // 1
counter(); // 2
```
**Practical use:** private state (like the `count` above), memoization, debounce/throttle implementations, currying, and the module pattern.

### Q4. What is the difference between `==` and `===`?
`===` (strict equality) checks value and type without conversion. `==` (loose equality) performs type coercion before comparing, which can lead to surprising results (`'' == 0` is `true`, `null == undefined` is `true` but `null === undefined` is `false`). Always prefer `===` unless you have a specific coercion reason.

### Q5. Explain `this` in JavaScript — how is it determined?
`this` is determined by **how a function is called**, not where it's defined (except arrow functions):
- **Regular call** (`fn()`): `this` is `undefined` in strict mode, global object otherwise.
- **Method call** (`obj.fn()`): `this` is `obj`.
- **Constructor call** (`new Fn()`): `this` is the newly created object.
- **Explicit binding** (`call`/`apply`/`bind`): `this` is whatever you pass.
- **Arrow functions**: don't have their own `this` — they inherit it lexically from the enclosing scope.

### Q6. What's the difference between `call`, `apply`, and `bind`?
All three set `this` explicitly.
- `call(thisArg, arg1, arg2, ...)` — invokes immediately with args listed individually.
- `apply(thisArg, [argsArray])` — invokes immediately with args as an array.
- `bind(thisArg, ...)` — returns a *new function* with `this` bound, doesn't invoke immediately.

```js
function greet(greeting) { console.log(`${greeting}, ${this.name}`); }
const person = { name: "Sushil" };
greet.call(person, "Hi");     // Hi, Sushil
greet.apply(person, ["Hi"]);  // Hi, Sushil
const bound = greet.bind(person);
bound("Hi");                  // Hi, Sushil
```

### Q7. Explain the JavaScript event loop.
JS is single-threaded but handles async operations via the event loop:
1. **Call stack** executes synchronous code.
2. **Web APIs** (setTimeout, fetch, DOM events) run in the background.
3. Completed callbacks go into either the **microtask queue** (Promises, `queueMicrotask`) or **macrotask queue** (setTimeout, setInterval, I/O).
4. The event loop checks: is the call stack empty? If yes, it drains **all microtasks first**, then takes one macrotask, then repeats.

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2
```

### Q8. What is prototypal inheritance?
Every JS object has an internal link (`[[Prototype]]`, accessible via `__proto__` or `Object.getPrototypeOf`) to another object. When you access a property, JS walks up this **prototype chain** until it finds it or reaches `null`. `class` syntax in ES6 is syntactic sugar over this same mechanism.

### Q9. What's the difference between synchronous and asynchronous, and how does `async/await` relate to Promises?
`async/await` is syntactic sugar over Promises, making async code read like synchronous code. An `async` function always returns a Promise; `await` pauses execution *within that function* until the Promise settles, without blocking the main thread.

```js
async function getData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
```

### Q10. What is currying? Implement a simple curry function.
Currying transforms a function taking multiple arguments into a sequence of functions each taking one argument.

```js
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
  };
};

const add = curry((a, b, c) => a + b + c);
add(1)(2)(3); // 6
add(1, 2)(3); // 6
```

### Q11. Explain memoization and implement a generic `memoize` function.
Memoization caches function results based on input to avoid recomputation.

```js
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
```

### Q12. Implement `debounce` and `throttle`. What's the difference?
**Debounce**: delays execution until a pause in calls (good for search-input-as-you-type).
```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```
**Throttle**: guarantees execution at most once per interval (good for scroll/resize handlers).
```js
function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

### Q13. What's the difference between `null` and `undefined`?
`undefined` means a variable has been declared but not assigned a value (JS default). `null` is an intentional assignment representing "no value." `typeof undefined === 'undefined'`, `typeof null === 'object'` (a long-standing JS quirk).

### Q14. What are pure functions and why do they matter (especially for React)?
A pure function always returns the same output for the same input and has no side effects (doesn't mutate external state). React relies heavily on this concept — component render functions and reducers should be pure so React can safely re-run, memoize, or batch them.

### Q15. Explain shallow copy vs deep copy. How do you deep clone an object?
Shallow copy (`{...obj}`, `Object.assign`) copies only the top level — nested objects are still shared by reference. Deep copy duplicates all nested levels.
```js
const deepClone = (obj) => structuredClone(obj); // modern, handles most cases
// or: JSON.parse(JSON.stringify(obj)) — loses functions, undefined, dates become strings
```

---

# PART 2 — ES6+ FEATURES

### Q16. Destructuring — array and object, with defaults and renaming.
```js
const [a, b = 10, ...rest] = [1, undefined, 3, 4];
// a = 1, b = 10, rest = [3, 4]

const { name: userName, age = 25 } = { name: "Sushil" };
// userName = "Sushil", age = 25
```

### Q17. Spread vs Rest operator — same syntax (`...`), different roles.
- **Spread** expands an iterable into individual elements: `[...arr1, ...arr2]`, `{...obj1, ...obj2}`.
- **Rest** collects remaining elements into an array/object: `function fn(a, ...rest) {}`.

### Q18. What are template literals and tagged templates?
Template literals (`` `Hello ${name}` ``) allow interpolation and multi-line strings. Tagged templates let a function process a template literal:
```js
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => `${acc}${str}${values[i] ? `**${values[i]}**` : ''}`, '');
}
highlight`Hello ${name}, you are ${age}`;
```

### Q19. Explain optional chaining (`?.`) and nullish coalescing (`??`).
`?.` short-circuits to `undefined` instead of throwing when accessing a property on `null`/`undefined`. `??` returns the right-hand value only when the left is `null`/`undefined` (unlike `||`, which also treats `0`, `''`, `false` as falsy).
```js
user?.address?.city;      // undefined instead of throwing
const count = input ?? 0; // 0 only if input is null/undefined, not if it's 0
```

### Q20. What are generators? Give an example.
Generators (`function*`) can pause and resume execution using `yield`, producing an iterator.
```js
function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}
const gen = idGenerator();
gen.next().value; // 1
gen.next().value; // 2
```

### Q21. `Map`/`Set` vs plain objects/arrays — when to use which?
`Map` preserves insertion order, allows any type as key (not just strings), and has a direct `.size` property — better for frequent additions/removals with non-string keys. `Set` stores unique values, useful for deduplication. Plain objects/arrays are fine for simple, string-keyed structured data.

### Q22. What are ES modules, and how do `import`/`export` differ from CommonJS (`require`)?
ES modules are statically analyzed at parse time (enabling tree-shaking), support named/default exports, and are asynchronous by spec. CommonJS (`require`/`module.exports`) is synchronous and resolves at runtime. Modern bundlers (Webpack, Vite) and Next.js use ES modules by default.

### Q23. Explain `Promise.all`, `Promise.allSettled`, `Promise.race`, and `Promise.any`.
- `Promise.all` — resolves when *all* resolve, rejects immediately if *any* rejects.
- `Promise.allSettled` — waits for all to settle (fulfilled or rejected), never short-circuits.
- `Promise.race` — settles as soon as the *first* promise settles (resolve or reject).
- `Promise.any` — resolves as soon as *any* fulfills; rejects only if *all* reject.

### Q24. What is the difference between a `for...in` and `for...of` loop?
`for...in` iterates over **enumerable property keys** (works on objects, but on arrays gives indices as strings — avoid for arrays). `for...of` iterates over **values** of an iterable (arrays, strings, Maps, Sets) — preferred for arrays.

---

# PART 3 — DSA FOR FRONTEND INTERVIEWS

Frontend DSA rounds rarely go as deep as backend (rarely need Dijkstra's or DP-heavy problems). Focus on: **arrays/strings, hashmaps, two pointers, sliding window, recursion, and JS-specific implementation questions (polyfills)**. Time-box each problem to 15-20 min before checking a solution.

### Core patterns to master
1. **Two pointers** — pair sum, palindrome check, reverse array in-place
2. **Sliding window** — longest substring without repeats, max sum subarray of size k
3. **Hashmap lookups** — two-sum, first non-repeating character, group anagrams
4. **Recursion** — flatten nested array, deep clone, tree traversal (DOM tree!)
5. **Sorting fundamentals** — know how `Array.sort()` works (default is string-based!), be able to explain bubble/merge conceptually

### Must-practice problems (with approach hints)

1. **Two Sum** — use a hashmap to store `value → index` while iterating once. O(n).
2. **Valid Palindrome** — two pointers from both ends, skip non-alphanumeric, compare lowercase.
3. **Longest Substring Without Repeating Characters** — sliding window + Set/Map tracking last seen index.
4. **Flatten a nested array** (classic FE question):
   ```js
   const flatten = (arr) => arr.reduce((acc, val) =>
     Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
   ```
5. **Group Anagrams** — hashmap keyed by sorted-string signature.
6. **Implement your own `Array.prototype.map/filter/reduce`** (very common FE question):
   ```js
   Array.prototype.myMap = function (cb) {
     const result = [];
     for (let i = 0; i < this.length; i++) result.push(cb(this[i], i, this));
     return result;
   };
   ```
7. **Implement a Promise from scratch (basic version)** — expect this in senior FE interviews. Practice explaining `.then` chaining and state (`pending/fulfilled/rejected`).
8. **Find the missing number in an array of 1..n** — sum formula or XOR trick.
9. **Move all zeros to the end of an array in-place** — two-pointer swap technique.
10. **Check for balanced parentheses** — stack-based approach.
11. **DOM tree traversal** (BFS/DFS conceptually) — since the DOM is a tree, expect "traverse and find node" style questions using recursion or a queue.
12. **Debounce/Throttle** (already covered above) — extremely common as a "live coding" DSA-adjacent question in FE rounds.

### Complexity cheat sheet
| Structure/Op | Access | Search | Insert | Delete |
|---|---|---|---|---|
| Array | O(1) | O(n) | O(n) | O(n) |
| Hashmap/Object | — | O(1) avg | O(1) avg | O(1) avg |
| Set | — | O(1) avg | O(1) avg | O(1) avg |

---

# PART 4 — REACT (DEEP DIVE)

### Q25. Explain the Virtual DOM and reconciliation.
React keeps an in-memory representation of the UI (Virtual DOM). On state change, React builds a new Virtual DOM tree, **diffs** it against the previous one (reconciliation), and computes the minimal set of real DOM mutations needed, batching them for performance. This avoids expensive direct DOM manipulation on every change.

### Q26. What is Fiber, and why did React move to it?
Fiber (React 16+) is React's internal reconciliation engine, rewritten to support **incremental rendering** — work can be split into units, paused, prioritized, or aborted, enabling features like Concurrent Mode, Suspense, and time-slicing. The old "Stack Reconciler" processed the tree synchronously and couldn't be interrupted.

### Q27. Why are keys important in lists, and what happens with array index as key?
Keys help React identify which items changed, were added, or removed across renders, so it can match Virtual DOM nodes efficiently instead of re-rendering everything. Using array index as key breaks this when the list order changes (items get reordered/inserted/deleted) — React may reuse the wrong DOM node/state for a shifted item, causing bugs especially with form inputs or component state tied to list items.

### Q28. `useEffect` vs `useLayoutEffect` — when would you use each?
Both run side effects after render. `useEffect` runs **asynchronously after paint** (doesn't block the browser from painting). `useLayoutEffect` runs **synchronously before paint** — use it when you need to measure/mutate the DOM before the user sees a flicker (e.g., measuring an element's size and repositioning it).

### Q29. Explain the dependency array in `useEffect`, and common pitfalls.
The dependency array tells React when to re-run the effect — it re-runs only if any listed value changed since the last render (reference equality check). Common pitfalls: omitting a used variable (stale closure bug), passing a new object/array/function literal each render (causes effect to re-run every time), and using `[]` incorrectly to mean "run once" when it actually depends on external values.

### Q30. `useMemo` vs `useCallback` — what's the actual difference?
`useMemo(fn, deps)` memoizes the **return value** of `fn`. `useCallback(fn, deps)` memoizes the **function reference itself** (equivalent to `useMemo(() => fn, deps)`). Use `useCallback` when passing callbacks to memoized children (`React.memo`) to prevent unnecessary re-renders; use `useMemo` for expensive computed values.

### Q31. What are the Rules of Hooks and why do they exist?
1. Only call hooks at the top level (not inside loops/conditions/nested functions).
2. Only call hooks from React function components or custom hooks.
This is because React tracks hooks **by call order** in a linked list internally — conditionally skipping a hook call shifts every subsequent hook's identity, corrupting state.

### Q32. How do you build a custom hook? Give an example (`useFetch`).
```js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => { if (!cancelled) setData(json); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
```

### Q33. How does `React.memo` differ from `useMemo`, and when does `React.memo` fail to prevent re-renders?
`React.memo` wraps a **component** and skips re-rendering if props are shallowly equal to the previous render. It fails when a prop is a new object/array/function created inline each render (`<Child onClick={() => {}} />`) — shallow comparison sees a "new" reference every time. Fix with `useCallback`/`useMemo` in the parent.

### Q34. Explain the Context API and its performance pitfall.
Context lets you avoid prop drilling by providing a value accessible to any descendant via `useContext`. Pitfall: **every consumer re-renders whenever the context value changes**, even if the consumer only cares about part of it. Mitigate by splitting contexts, memoizing the provided value, or using state management libraries (Redux/Zustand) for frequently-changing global state.

### Q35. Controlled vs uncontrolled components.
Controlled: form input value is driven by React state (`value` + `onChange`), single source of truth. Uncontrolled: the DOM manages its own state internally, accessed via `ref` when needed (`<input ref={inputRef} defaultValue="..." />`). Controlled is more common in React apps for validation/consistency; uncontrolled can be simpler/faster for basic forms.

### Q36. What is code-splitting, and how do `React.lazy` and `Suspense` help?
Code-splitting breaks the JS bundle into smaller chunks loaded on demand instead of all upfront, improving initial load time. `React.lazy(() => import('./Component'))` dynamically imports a component; `Suspense` provides a fallback UI while it loads.

### Q37. How would you optimize a React app that's rendering slowly?
Talking points: identify with React DevTools Profiler → memoize expensive components (`React.memo`) and values (`useMemo`/`useCallback`) → virtualize long lists (react-window) → code-split routes/heavy components → avoid unnecessary context re-renders → debounce expensive input handlers → check for unkeyed/index-keyed lists causing full re-renders.

---

# PART 5 — NEXT.JS

### Q38. Explain SSR, SSG, ISR, and CSR — and when to use each.
- **CSR (Client-Side Rendering)**: HTML shell + JS renders content in the browser. Good for highly interactive, non-SEO-critical dashboards.
- **SSR (Server-Side Rendering)**: HTML generated per-request on the server. Good for dynamic, SEO-critical, frequently-changing content (e.g., a user's personalized order history).
- **SSG (Static Site Generation)**: HTML generated at build time, served from CDN. Best for content that rarely changes (marketing pages, blogs).
- **ISR (Incremental Static Regeneration)**: Static pages that regenerate in the background after a set interval (`revalidate`), combining SSG speed with near-fresh data — great for something like a pharmacy product catalog that updates periodically.

### Q39. App Router vs Pages Router — key differences.
App Router (`app/` directory, Next 13+) uses React Server Components by default, nested layouts, and colocated loading/error states (`loading.js`, `error.js`). Pages Router (`pages/` directory) is the older file-based system where every component is a Client Component by default and data fetching uses `getServerSideProps`/`getStaticProps`.

### Q40. What are Server Components vs Client Components in the App Router?
Server Components render on the server and send only HTML/serialized output to the client — no JS bundle cost, can directly access backend resources (DB, filesystem). Client Components (marked with `"use client"`) run in the browser, needed for interactivity, hooks, and browser APIs (`useState`, `onClick`, etc.).

### Q41. How does data fetching work in the App Router?
Fetching happens directly inside async Server Components using `fetch()`, which Next.js automatically caches and dedupes. You control freshness via `fetch(url, { cache: 'force-cache' | 'no-store', next: { revalidate: 60 } })` instead of separate `getStaticProps`/`getServerSideProps` functions.

### Q42. What are API routes / Route Handlers, and when would you use them?
They let you build backend endpoints inside a Next.js app (`app/api/.../route.js`), useful for things like form submissions, webhooks, or proxying third-party APIs without exposing keys to the client.

### Q43. What is Next.js Middleware?
Code that runs before a request completes, at the edge — used for things like authentication checks, redirects, A/B testing, or locale detection, before the page even renders.

### Q44. How does Next.js handle image and font optimization?
`next/image` automatically serves responsive, lazy-loaded, correctly-sized, modern-format (WebP/AVIF) images, and prevents layout shift by requiring width/height. `next/font` self-hosts and optimizes fonts (including Google Fonts) at build time, eliminating render-blocking external font requests.

### Q45. How would you handle authentication-protected routes in Next.js?
Talking points: middleware to check auth token/cookie and redirect unauthenticated users at the edge before rendering; alternatively check session in a Server Component/layout and conditionally render or redirect; libraries like NextAuth.js/Auth.js are common in production.

---

# PART 6 — TYPESCRIPT

### Q46. `interface` vs `type` — when to use which?
Both describe shapes. `interface` supports **declaration merging** (multiple declarations combine) and is generally preferred for public API/object shapes, especially in React props. `type` is more flexible — can represent unions, intersections, tuples, and primitives, which `interface` cannot.
```ts
type Status = 'idle' | 'loading' | 'success' | 'error'; // interface can't do unions like this
```

### Q47. What are generics? Give a React example.
Generics let you write reusable, type-safe code that works across multiple types while preserving type information.
```ts
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // implementation
}
const [count, setCount] = useLocalStorage<number>('count', 0);
```

### Q48. Explain common utility types: `Partial`, `Pick`, `Omit`, `Record`.
- `Partial<T>` — makes all properties optional.
- `Pick<T, K>` — selects a subset of keys.
- `Omit<T, K>` — excludes a subset of keys.
- `Record<K, V>` — builds an object type with keys `K` and values `V`.
```ts
interface User { id: string; name: string; email: string; }
type UserPreview = Pick<User, 'id' | 'name'>;
type UserWithoutEmail = Omit<User, 'email'>;
type PartialUser = Partial<User>;
type UserMap = Record<string, User>;
```

### Q49. What is type narrowing? Give examples with `typeof`, `in`, and discriminated unions.
Narrowing lets TypeScript refine a broader type to a more specific one within a conditional block.
```ts
function handle(value: string | number) {
  if (typeof value === 'string') value.toUpperCase(); // narrowed to string
}

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number };

function area(shape: Shape) {
  if (shape.kind === 'circle') return Math.PI * shape.radius ** 2; // narrowed
  return shape.side ** 2;
}
```

### Q50. How do you type React component props and children?
```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, children, variant = 'primary' }) => (
  <button onClick={onClick} className={variant}>{label}{children}</button>
);
```

### Q51. What is the difference between `any`, `unknown`, and `never`?
`any` disables type checking entirely (avoid it). `unknown` also accepts anything but forces you to narrow/check the type before using it — the type-safe alternative to `any`. `never` represents a value that can never occur (a function that always throws, or an exhaustive switch's unreachable default).

---

# PART 7 — INTERVIEW STRATEGY

### Before the interview
- Rebuild 2-3 patterns from memory without looking: debounce/throttle, custom `useFetch` hook, a `Promise` polyfill sketch, a `map`/`filter` polyfill.
- Prepare 2-3 STAR-format stories from your Digital Pharmacy/Marketplace projects (a performance win, an accessibility fix, a tricky bug you debugged) — senior interviews always probe real project depth.
- Re-read your own resume bullet points and be ready to go deep on any of them (interviewers often pick a random bullet and ask "walk me through that").

### During the interview
- **Think out loud.** Silence is worse than a wrong turn — interviewers are evaluating your reasoning process, not just the final answer.
- For DSA: state the naive approach first, then optimize. Never jump straight to "optimal" without narrating the thought process.
- For "explain X" questions: give a one-line definition first, then an example, then a real scenario from your own experience if relevant.
- If stuck, say what you *do* know and think aloud toward the gap — don't go silent.

### After each mock/real interview
- Write down every question you couldn't answer confidently. Review that gap within 24 hours (spaced repetition beats cramming everything once).

---

## Quick reference: what to review daily in your final 2-3 days
1. Closures, `this`, event loop, Promises (Part 1)
2. Debounce/throttle/memoize/curry implementations from memory (Part 1 & 3)
3. `useEffect`/`useMemo`/`useCallback` differences and pitfalls (Part 4)
4. SSR/SSG/ISR + App Router basics (Part 5)
5. `interface` vs `type`, utility types, narrowing (Part 6)

Good luck — with 12+ years of real production experience behind you, the gap here is usually **articulation and pattern recall under pressure**, not actual capability. This plan is designed to close exactly that gap in two weeks.
