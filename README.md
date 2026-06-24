# 🧠 Frontend Interview Practice Kit

A self-contained practice environment for frontend engineering interviews. Solve problems locally in VS Code, run tests instantly, and track your progress.

## 📁 Project Structure

```
fe-interview-practice/
├── questions/          # Problem statements (read these)
│   ├── javascript/
│   ├── css/
│   ├── react/
│   ├── performance/
│   └── system-design/
├── solutions/          # Your solutions go here (mirror of questions/)
│   ├── javascript/
│   ├── css/
│   ├── react/
│   ├── performance/
│   └── system-design/
├── tests/              # Auto-test your JS solutions
├── utils/              # Shared helpers
└── runner.js           # CLI test runner
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests for a specific topic
npm run test:js
npm run test:react

# Run a single question's tests
npm run test -- --question debounce

# Watch mode (re-runs on save)
npm run test:watch
```

## 📝 How to Practice

1. Open a question file in `questions/` and read the problem.
2. Create your solution file in the matching path under `solutions/`.
3. Run `npm test` to check your answer.
4. Compare with the reference solution in `solutions/` once you're done.

## 🗂️ Question Index

### JavaScript (16 questions)
| # | File | Difficulty | Topic |
|---|------|-----------|-------|
| 1 | `questions/javascript/01-debounce.js` | Easy | Closures, Timers |
| 2 | `questions/javascript/02-deep-clone.js` | Easy | Recursion, Objects |
| 3 | `questions/javascript/03-event-delegation.js` | Easy | DOM, Events |
| 4 | `questions/javascript/04-array-flat.js` | Easy | Arrays, Recursion |
| 5 | `questions/javascript/05-throttle.js` | Medium | Closures, Timers |
| 6 | `questions/javascript/06-event-emitter.js` | Medium | OOP, Patterns |
| 7 | `questions/javascript/07-promise-all.js` | Medium | Promises, Async |
| 8 | `questions/javascript/08-memoize.js` | Medium | Closures, Caching |
| 9 | `questions/javascript/09-async-scheduler.js` | Hard | Async, Queues |
| 10 | `questions/javascript/10-virtual-dom-diff.js` | Hard | Trees, Algorithms |
| 11 | `questions/javascript/11-currying.js` | Medium | Currying |
| 12 | `questions/javascript/12-call-apply-bind.js` | Medium | `this`, Function context |
| 13 | `questions/javascript/13-compose-pipe.js` | Medium | Closures, Functional |
| 14 | `questions/javascript/14-array-polyfills.js` | Easy | Prototypes, Arrays |
| 15 | `questions/javascript/15-deep-equal.js` | Medium | Recursion, Objects |
| 16 | `questions/javascript/16-closures.js` | Easy | Closures, Private state |

### CSS (3 questions)
| # | File | Difficulty |
|---|------|-----------|
| 1 | `questions/css/01-centering.html` | Easy |
| 2 | `questions/css/02-responsive-grid.html` | Medium |
| 3 | `questions/css/03-pure-css-accordion.html` | Hard |

### React (5 questions)
| # | File | Difficulty |
|---|------|-----------|
| 1 | `questions/react/01-use-fetch.jsx` | Medium |
| 2 | `questions/react/02-use-local-storage.jsx` | Medium |
| 3 | `questions/react/03-avoid-rerenders.jsx` | Medium |
| 4 | `questions/react/04-context-reducer.jsx` | Hard |
| 5 | `questions/react/05-virtualized-list.jsx` | Hard |

### System Design (2 questions — written answers)
| # | File | Difficulty |
|---|------|-----------|
| 1 | `questions/system-design/01-autocomplete.md` | Medium |
| 2 | `questions/system-design/02-infinite-scroll.md` | Medium |

## 💡 Tips
- Don't look at solutions until you've spent at least 20 minutes on a problem.
- After solving, read your solution aloud — can you explain every line?
- Try to handle edge cases: `null`, empty arrays, large inputs.
- Time yourself. Aim for 15 min (easy), 25 min (medium), 40 min (hard).
