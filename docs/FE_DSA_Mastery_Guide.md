# Frontend DSA Mastery Guide
### Full explanations, step-by-step approach, code, and complexity for every must-know problem

This expands PART 3 of your main prep plan. Every problem below includes: **what's being asked, why it's asked in FE interviews, the step-by-step approach, working code, complexity, and edge cases** to mention out loud (interviewers notice when you proactively raise edge cases).

I've also added problems that are extremely common in FE rounds but were missing from your original list — flagged with **[NEW]**.

---

## How to use this guide
For each problem: read the problem → try it yourself for 10-15 min → then read the approach and compare. Don't skip straight to code. In the actual interview, narrate the same structure: **clarify → brute force → optimize → code → test with an example → state complexity.**

---

# SECTION A — TWO POINTERS

Two pointers work when you can eliminate possibilities by moving inward from both ends, or moving two pointers at different speeds, avoiding an O(n²) brute force.

## A1. Pair Sum (Two Sum on a Sorted Array)
**Problem:** Given a *sorted* array and a target, find two numbers that add up to the target.

**Why asked:** Tests whether you reach for two pointers instead of brute-forcing O(n²), and whether you know when hashmaps aren't needed (array is already sorted).

**Approach:**
1. Place `left` pointer at index 0, `right` pointer at the last index.
2. Compute `sum = arr[left] + arr[right]`.
3. If `sum === target`, return the pair.
4. If `sum < target`, move `left` forward (need a bigger sum).
5. If `sum > target`, move `right` backward (need a smaller sum).
6. Stop when `left >= right`.

```js
function pairSumSorted(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [arr[left], arr[right]];
    if (sum < target) left++;
    else right--;
  }
  return null; // no pair found
}

pairSumSorted([1, 2, 3, 4, 6], 6); // [2, 4]
```

**Complexity:** O(n) time, O(1) space — better than the hashmap version because it needs no extra memory (only works because the array is sorted).

**Edge cases to mention:** empty array, no valid pair, duplicate values, array not sorted (must sort first, adding O(n log n)).

---

## A2. Valid Palindrome
**Problem:** Check if a string is a palindrome, ignoring non-alphanumeric characters and case.

**Approach:**
1. Two pointers: `left` at start, `right` at end.
2. Skip non-alphanumeric characters on either side by advancing the pointer.
3. Compare lowercase versions of `s[left]` and `s[right]`.
4. If they don't match, return `false`. If they do, move both pointers inward.
5. If pointers cross without mismatch, it's a palindrome.

```js
function isPalindrome(s) {
  const isAlnum = (c) => /[a-z0-9]/i.test(c);
  let left = 0, right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlnum(s[left])) left++;
    while (left < right && !isAlnum(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}

isPalindrome("A man, a plan, a canal: Panama"); // true
isPalindrome("race a car"); // false
```

**Complexity:** O(n) time, O(1) space.

**Edge cases:** empty string (true), single character (true), all non-alphanumeric characters (true, since nothing to compare).

---

## A3. Move All Zeros to the End (in-place)
**Problem:** Given an array, move all `0`s to the end while keeping the relative order of non-zero elements, without using extra array space.

**Approach:**
1. Keep a pointer `insertPos` starting at 0 — tracks where the next non-zero value should go.
2. Loop through the array; whenever you find a non-zero value, swap it into `arr[insertPos]` and increment `insertPos`.
3. By the end, all non-zero values are shifted to the front in order, and swaps naturally push zeros to the back.

```js
function moveZeroes(arr) {
  let insertPos = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      [arr[insertPos], arr[i]] = [arr[i], arr[insertPos]];
      insertPos++;
    }
  }
  return arr;
}

moveZeroes([0, 1, 0, 3, 12]); // [1, 3, 12, 0, 0]
```

**Complexity:** O(n) time, O(1) space (in-place).

**Edge cases:** all zeros, no zeros, single element.

---

## A4. [NEW] Reverse an Array/String In-Place
**Problem:** Reverse an array (or string) without using `.reverse()`.

**Why asked:** Base-level warmup question, but interviewers watch for whether you handle it in-place with O(1) space vs. creating a new array.

**Approach:**
1. Two pointers at start and end.
2. Swap values, move pointers inward until they meet.

```js
function reverseArray(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}

reverseArray([1, 2, 3, 4, 5]); // [5, 4, 3, 2, 1]

// Strings are immutable in JS, so you can't swap in-place —
// convert to array, reverse, join:
function reverseString(str) {
  return reverseArray(str.split('')).join('');
}
```

**Complexity:** O(n) time, O(1) space (excluding the string's array conversion, which is O(n) space, unavoidable since strings are immutable).

---

## A5. [NEW] Valid Anagram
**Problem:** Check if two strings are anagrams of each other (same characters, same frequency).

**Approach (two ways):**
1. **Sort-and-compare:** sort both strings' characters and check equality. Simple, but O(n log n).
2. **Frequency map (better):** count character frequency in the first string, decrement while scanning the second. If any count goes negative or lengths differ, it's not an anagram.

```js
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  const counts = {};
  for (const ch of s1) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of s2) {
    if (!counts[ch]) return false; // missing or already zeroed out
    counts[ch]--;
  }
  return true;
}

isAnagram("listen", "silent"); // true
isAnagram("rat", "car");       // false
```

**Complexity:** O(n) time, O(k) space where k = number of unique characters.

---

# SECTION B — SLIDING WINDOW

Sliding window avoids re-scanning overlapping parts of an array/string when solving "longest/shortest/contains X within a subrange" problems.

## B1. Longest Substring Without Repeating Characters
**Problem:** Find the length of the longest substring without repeating characters.

**Approach:**
1. Keep a `Map` of character → last seen index, and a `windowStart` pointer marking the left edge of the current valid window.
2. Iterate `windowEnd` through the string.
3. If the current character was seen before **and** its last index is inside the current window, move `windowStart` to just after that previous occurrence.
4. Update the map with the character's current index.
5. Track the max window size (`windowEnd - windowStart + 1`) at each step.

```js
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let windowStart = 0;
  let maxLength = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const char = s[windowEnd];
    if (lastSeen.has(char) && lastSeen.get(char) >= windowStart) {
      windowStart = lastSeen.get(char) + 1;
    }
    lastSeen.set(char, windowEnd);
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  return maxLength;
}

lengthOfLongestSubstring("abcabcbb"); // 3 ("abc")
lengthOfLongestSubstring("bbbbb");    // 1 ("b")
```

**Complexity:** O(n) time, O(min(n, charset size)) space.

**Edge cases:** empty string (0), all unique characters (whole string length), all same character (1).

---

## B2. Maximum Sum Subarray of Size K
**Problem:** Given an array and a number `k`, find the maximum sum of any contiguous subarray of size `k`.

**Approach:**
1. Compute the sum of the first `k` elements — this is your initial window.
2. Slide the window one step at a time: subtract the element leaving the window (leftmost), add the element entering the window (new rightmost).
3. Track the maximum sum seen.

```js
function maxSumSubarray(arr, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  let maxSum = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}

maxSumSubarray([2, 1, 5, 1, 3, 2], 3); // 9 ([5,1,3])
```

**Complexity:** O(n) time, O(1) space — vs. the brute-force O(n·k) of recomputing every window's sum from scratch.

**Edge cases:** `k` larger than array length (invalid input, decide how to handle), `k = 0`.

---

## B3. [NEW] Minimum Window Substring (harder — good for senior rounds)
**Problem:** Given strings `s` and `t`, find the smallest substring of `s` that contains all characters of `t` (including duplicates).

**Approach:**
1. Build a frequency map of characters needed from `t`.
2. Expand a `right` pointer over `s`, decrementing the needed count for each character seen.
3. Track how many *required* characters are currently satisfied.
4. Once all required characters are satisfied, try shrinking from the `left` to find the smallest valid window, updating the best answer each time before the window becomes invalid again.

```js
function minWindow(s, t) {
  if (!s || !t) return "";
  const need = {};
  for (const ch of t) need[ch] = (need[ch] || 0) + 1;

  let required = Object.keys(need).length;
  let formed = 0;
  const windowCounts = {};
  let left = 0;
  let best = [Infinity, 0, 0]; // [length, start, end]

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    windowCounts[ch] = (windowCounts[ch] || 0) + 1;
    if (need[ch] && windowCounts[ch] === need[ch]) formed++;

    while (formed === required) {
      if (right - left + 1 < best[0]) best = [right - left + 1, left, right];
      const leftChar = s[left];
      windowCounts[leftChar]--;
      if (need[leftChar] && windowCounts[leftChar] < need[leftChar]) formed--;
      left++;
    }
  }
  return best[0] === Infinity ? "" : s.slice(best[1], best[2] + 1);
}

minWindow("ADOBECODEBANC", "ABC"); // "BANC"
```

**Complexity:** O(n) time (each character visited at most twice — once by `right`, once by `left`), O(k) space.

*Note: mention this is a "hard"-tier problem — if it comes up, walking through the approach clearly matters more than a perfect first-try implementation.*

---

# SECTION C — HASHMAP / ARRAY PATTERNS

## C1. Two Sum (Unsorted Array)
**Problem:** Given an unsorted array and a target, return the indices of two numbers that add up to the target.

**Approach:**
1. Create a hashmap of `value → index` as you go.
2. For each number, compute `complement = target - number`.
3. If `complement` already exists in the map, you've found your pair — return the stored index and the current index.
4. Otherwise, add the current number and its index to the map, and continue.

```js
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}

twoSum([2, 7, 11, 15], 9); // [0, 1]
```

**Complexity:** O(n) time, O(n) space — vs. O(n²) brute force checking every pair.

**Edge cases:** no solution, duplicate values, negative numbers.

---

## C2. First Non-Repeating Character
**Problem:** Find the first character in a string that doesn't repeat.

**Approach:**
1. First pass: build a frequency map of every character.
2. Second pass: scan the string in order, return the first character whose count is 1.

```js
function firstNonRepeatingChar(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of str) if (counts[ch] === 1) return ch;
  return null;
}

firstNonRepeatingChar("swiss"); // "w"
```

**Complexity:** O(n) time, O(k) space (k = unique characters).

---

## C3. Group Anagrams
**Problem:** Group an array of strings into sets of anagrams.

**Approach:**
1. For each string, compute a "signature" — sorting its characters gives identical signatures for anagrams.
2. Use a hashmap keyed by this signature; push each string into the matching group.
3. Return the map's values.

```js
function groupAnagrams(strs) {
  const groups = new Map();
  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(str);
  }
  return [...groups.values()];
}

groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

**Complexity:** O(n · k log k) time (n strings, k = avg string length for sorting), O(n · k) space.

**Follow-up interviewers ask:** can you avoid sorting? Yes — use a character-count signature (e.g., `a2b1c0...`) instead of sorted string, bringing it to O(n · k).

---

## C4. Find the Missing Number (1 to n)
**Problem:** Given an array containing `n` distinct numbers from `0` to `n` with exactly one missing, find the missing number.

**Approach 1 — Sum formula:**
1. Expected sum of `0..n` is `n*(n+1)/2`.
2. Subtract the actual sum of the array.
3. The difference is the missing number.

```js
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
```

**Approach 2 — XOR trick (avoids overflow on huge arrays, and is a favorite "do you know this trick" follow-up):**
```js
function missingNumberXOR(nums) {
  let result = nums.length;
  for (let i = 0; i < nums.length; i++) {
    result ^= i ^ nums[i];
  }
  return result;
}
```
XOR-ing a number with itself cancels to 0, and XOR-ing with 0 leaves it unchanged — so every index/value pair cancels out except the missing number.

**Complexity:** O(n) time, O(1) space for both.

---

## C5. [NEW] Find All Duplicates in an Array
**Problem:** Given an array, return all elements that appear more than once.

**Approach:**
1. Use a `Set` to track numbers seen once, and another `Set` (or array) to collect duplicates.
2. As you iterate, if the number is already in "seen," add it to "duplicates" (guard against adding the same duplicate twice by checking it's not already recorded).

```js
function findDuplicates(nums) {
  const seen = new Set();
  const duplicates = new Set();
  for (const num of nums) {
    if (seen.has(num)) duplicates.add(num);
    else seen.add(num);
  }
  return [...duplicates];
}

findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]); // [2, 3]
```

**Complexity:** O(n) time, O(n) space.

---

## C6. [NEW] Chunk an Array into Groups of Size N
**Problem:** Split an array into subarrays ("chunks") of a given size. Very common as a quick "implementation" warm-up in FE rounds.

**Approach:**
1. Loop through the array in steps of `size`.
2. Use `.slice(i, i + size)` to extract each chunk.

```js
function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

chunkArray([1, 2, 3, 4, 5, 6, 7], 3); // [[1,2,3],[4,5,6],[7]]
```

**Complexity:** O(n) time, O(n) space.

---

# SECTION D — RECURSION & TREES

## D1. Flatten a Nested Array
**Problem:** Flatten an arbitrarily nested array into a single-level array.

**Approach:**
1. Use `reduce` to build up a result array.
2. For each element: if it's an array, recursively flatten it and concatenate; otherwise, concatenate the value directly.

```js
function flatten(arr) {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
    []
  );
}

flatten([1, [2, [3, [4, 5]], 6]]); // [1, 2, 3, 4, 5, 6]
```

**Complexity:** O(n) time where n = total number of elements across all nesting levels, O(depth) space for the recursion stack.

**Follow-up:** implement with a given `depth` limit (see `myFlat` below in Section F), and mention `Array.prototype.flat(Infinity)` as the built-in.

---

## D2. Deep Clone an Object/Array
**Problem:** Create a full copy of a nested object/array so that mutating the copy doesn't affect the original.

**Approach (recursive, handles nested objects/arrays):**
1. If the value isn't an object (primitive), return it directly — nothing to clone.
2. If it's an array, map over it and recursively clone each element.
3. If it's a plain object, build a new object and recursively clone each value.

```js
function deepClone(value) {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(deepClone);

  const result = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepClone(value[key]);
    }
  }
  return result;
}

deepClone({ a: 1, b: { c: [1, 2, { d: 3 }] } });
```

**Modern shortcut:** `structuredClone(obj)` — built into modern JS runtimes, handles circular references, Dates, Maps, Sets. Mention it, but be ready to hand-write the above since interviewers want to see you understand the mechanics.

**Complexity:** O(n) time/space where n = total number of properties/elements.

**Edge case to mention:** circular references break the naive recursive version (infinite loop) — `structuredClone` handles this natively; a hand-rolled version would need a `WeakMap` to track already-cloned objects.

---

## D3. DOM Tree Traversal (BFS and DFS)
**Problem:** Traverse a DOM tree (or any tree structure) to find a node or process every node — very relevant since the DOM *is* a tree.

**DFS approach (recursive):** visit a node, then recursively visit all its children before moving to siblings.
```js
function dfs(node, callback) {
  if (!node) return;
  callback(node);
  for (const child of node.children) {
    dfs(child, callback);
  }
}
```

**BFS approach (iterative, using a queue):** visit all nodes at the current depth before going deeper.
```js
function bfs(root, callback) {
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    callback(node);
    for (const child of node.children) {
      queue.push(child);
    }
  }
}
```

**Why it matters:** this exact pattern answers "find an element by some condition in a tree," "count all nodes," or "find the depth of a tree" — all common follow-ups.

**Complexity:** O(n) time for both (visit every node once). DFS uses O(h) space (h = tree height, call stack); BFS uses O(w) space (w = max width of the tree, the queue).

---

## D4. [NEW] Binary Tree Level Order / Max Depth (if given a tree, not DOM)
**Problem:** Find the maximum depth of a binary tree.

**Approach (recursive):**
1. Base case: an empty node has depth 0.
2. Recursively compute the depth of the left and right subtrees.
3. Return `1 + max(leftDepth, rightDepth)`.

```js
function maxDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}
```

**Complexity:** O(n) time, O(h) space (recursion stack, h = height).

---

# SECTION E — SORTING & SEARCHING

## E1. How `Array.prototype.sort()` Actually Works
**Key fact to state confidently:** by default, `.sort()` converts elements to strings and compares UTF-16 code units — so `[10, 1, 2].sort()` gives `[1, 10, 2]`, not `[1, 2, 10]`. Always pass a comparator for numbers:
```js
[10, 1, 2].sort((a, b) => a - b); // [1, 2, 10]
```

## E2. Explain Bubble Sort and Merge Sort Conceptually (rarely coded fully, but must explain)
**Bubble Sort:** repeatedly step through the array, swapping adjacent elements if they're in the wrong order; after each full pass, the largest unsorted element "bubbles" to its correct position. O(n²) time, O(1) space — simple but inefficient.

**Merge Sort:** divide the array in half recursively until each piece has one element, then merge pairs back together in sorted order. O(n log n) time, O(n) space — the "divide and conquer" approach interviewers expect you to at least describe even if not coded from scratch.

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}
```

## E3. [NEW] Binary Search
**Problem:** Search for a target in a *sorted* array in O(log n).

**Why asked:** Extremely common warm-up; also the foundation for many "find boundary" style problems.

**Approach:**
1. Track `low` and `high` bounds.
2. Check the middle element.
3. If it matches, return its index. If the target is smaller, search the left half; if larger, search the right half.
4. Repeat until the range is empty.

```js
function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

binarySearch([1, 3, 5, 7, 9, 11], 7); // 3
```

**Complexity:** O(log n) time, O(1) space (iterative version).

---

# SECTION F — JAVASCRIPT-SPECIFIC IMPLEMENTATION QUESTIONS

These are the questions unique to frontend interviews — reimplementing native JS behavior. Senior candidates are expected to nail these.

## F1. Implement `Array.prototype.map`, `filter`, `reduce`
```js
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) result.push(this[i]);
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;
  if (acc === undefined) {
    acc = this[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};
```
**Key detail interviewers probe:** what happens if `reduce` is called without an initial value? (Uses the first element as the accumulator and starts iterating from index 1 — and throws on an empty array with no initial value, matching native behavior.)

## F2. Implement `call`, `apply`, `bind`
```js
Function.prototype.myCall = function (context = globalThis, ...args) {
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

Function.prototype.myApply = function (context = globalThis, argsArray = []) {
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  const result = context[fnSymbol](...argsArray);
  delete context[fnSymbol];
  return result;
};

Function.prototype.myBind = function (context, ...boundArgs) {
  const originalFn = this;
  return function (...callArgs) {
    return originalFn.apply(context, [...boundArgs, ...callArgs]);
  };
};
```
**Step-by-step explanation of `myCall`:** temporarily attach the function as a method on the target `context` object (using a `Symbol` to avoid property name collisions), call it as `context.fn(...)` so `this` naturally becomes `context`, then clean up by deleting the temporary property.

## F3. Implement a Basic Promise from Scratch
This is a favorite senior-level question. Focus on explaining the three states and the `.then` queuing mechanism.

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.callbacks = [];

    const resolve = (value) => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      this.callbacks.forEach((cb) => cb.onFulfilled(value));
    };

    const reject = (reason) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.value = reason;
      this.callbacks.forEach((cb) => cb.onRejected(reason));
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          resolve(onFulfilled ? onFulfilled(value) : value);
        } catch (err) {
          reject(err);
        }
      };
      const handleRejected = (reason) => {
        try {
          if (onRejected) resolve(onRejected(reason));
          else reject(reason);
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === 'fulfilled') handleFulfilled(this.value);
      else if (this.state === 'rejected') handleRejected(this.value);
      else this.callbacks.push({ onFulfilled: handleFulfilled, onRejected: handleRejected });
    });
  }
}

// usage
new MyPromise((resolve) => setTimeout(() => resolve('done'), 100))
  .then((val) => console.log(val)); // "done"
```
**Step-by-step explanation:**
1. Constructor runs the `executor` immediately and synchronously, passing it `resolve`/`reject`.
2. State starts `pending`; once resolved/rejected, it locks (a Promise can only settle once).
3. If `.then` is called before the promise settles, the callback is queued in `this.callbacks` and fired later when `resolve`/`reject` runs.
4. If `.then` is called *after* it already settled, the callback fires immediately (this is why `.then` still works even on an already-resolved promise).
5. `.then` itself returns a **new** `MyPromise`, which is what makes chaining (`.then().then()`) possible.

*(You won't be expected to implement `Promise.all`/`race` from scratch typically, but be ready to explain them — see the flashcards doc.)*

## F4. [NEW] Implement `Promise.all` from Scratch
```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) resolve(results);

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((value) => {
          results[index] = value; // preserve order
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject); // reject fast on first failure
    });
  });
}
```
**Key detail:** results must preserve the original order even though promises may resolve out of order — hence writing to `results[index]` rather than pushing.

## F5. Implement Debounce and Throttle (with cancel support)
```js
function debounce(fn, delay) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}

function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```
**Follow-up interviewers ask:** "add a `cancel` method" (shown above for debounce) or "make throttle fire on the trailing edge too" — be ready to reason through it live rather than having it memorized perfectly.

## F6. Implement `Array.prototype.flat(depth)`
```js
function myFlat(arr, depth = 1) {
  if (depth <= 0) return arr.slice();
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? myFlat(val, depth - 1) : val),
    []
  );
}

myFlat([1, [2, [3, [4]]]], 2); // [1, 2, 3, [4]]
```

## F7. [NEW] Implement a Basic `EventEmitter` (Pub/Sub)
Very common "mini system design" coding question.
```js
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    (this.events[event] ||= []).push(callback);
    return this; // allow chaining
  }
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach((cb) => cb(...args));
  }
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

const emitter = new EventEmitter();
emitter.on('greet', (name) => console.log(`Hello, ${name}`));
emitter.emit('greet', 'Sushil'); // "Hello, Sushil"
```

## F8. [NEW] Implement `curry`
```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...moreArgs) => curried.apply(this, [...args, ...moreArgs]);
  };
}

const sum3 = curry((a, b, c) => a + b + c);
sum3(1)(2)(3);   // 6
sum3(1, 2)(3);   // 6
sum3(1, 2, 3);   // 6
```

## F9. [NEW] Implement `compose` and `pipe`
Common in questions about functional programming, especially if you've touched Redux middleware.
```js
// compose: right-to-left execution — compose(f, g)(x) === f(g(x))
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

// pipe: left-to-right execution — pipe(f, g)(x) === g(f(x))
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const addOne = (x) => x + 1;
const double = (x) => x * 2;

compose(double, addOne)(3); // double(addOne(3)) = 8
pipe(double, addOne)(3);    // addOne(double(3)) = 7
```

## F10. [NEW] Implement a Deep Equality Check
Common when explaining why React re-renders, or building custom memoization.
```js
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => deepEqual(a[key], b[key]));
}

deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // true
```

---

# SECTION G — STACKS & QUEUES

## G1. Valid Parentheses (Balanced Brackets)
**Problem:** Given a string of brackets `()[]{}`, determine if they're balanced/properly nested.

**Approach:**
1. Use a stack. Push every opening bracket.
2. On a closing bracket, pop the stack and check it matches the corresponding opening bracket.
3. If it doesn't match, or the stack is empty when you expect a matching open bracket, it's invalid.
4. At the end, the stack must be empty (no unclosed brackets left).

```js
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) return false;
    }
  }
  return stack.length === 0;
}

isValid("()[]{}"); // true
isValid("(]");      // false
isValid("([)]");    // false
```

**Complexity:** O(n) time, O(n) space.

**Edge cases:** empty string (valid, true), only opening brackets (invalid), only closing brackets (invalid).

---

## G2. [NEW] Implement a Queue Using Two Stacks (classic CS fundamentals question, occasionally asked)
**Approach:** Use one stack for enqueue (`inStack`) and one for dequeue (`outStack`). When dequeuing, if `outStack` is empty, pour all of `inStack` into it (reversing order), then pop from `outStack`.
```js
class QueueViaStacks {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }
  enqueue(val) {
    this.inStack.push(val);
  }
  dequeue() {
    if (this.outStack.length === 0) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack.pop();
  }
}
```
**Complexity:** Amortized O(1) per operation — each element is moved between stacks at most once.

---

## G3. [NEW] Implement a Basic LRU Cache
**Problem:** Design a cache with a fixed capacity that evicts the least recently used item when full.

**Approach:**
1. Use a `Map` — it preserves insertion order, which we exploit as a recency indicator.
2. On `get`: if the key exists, delete and re-insert it (moves it to the "most recent" end), then return its value.
3. On `put`: if the key exists, delete it first (to reposition). If at capacity, evict the oldest entry (the first key in the map's iteration order) before inserting the new one.

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value); // re-insert to mark as recently used
    return value;
  }

  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}

const cache = new LRUCache(2);
cache.put(1, 'a');
cache.put(2, 'b');
cache.get(1);       // 'a' (1 is now most recent)
cache.put(3, 'c');  // evicts 2 (least recently used)
cache.get(2);       // -1 (evicted)
```

**Complexity:** O(1) for both `get` and `put`, since `Map` operations are O(1) average.

---

# QUICK REFERENCE: PATTERN → PROBLEM TYPE

| If you see... | Reach for... |
|---|---|
| "sorted array, find pair/triplet" | Two pointers |
| "longest/shortest substring/subarray meeting a condition" | Sliding window |
| "count occurrences, check existence fast" | Hashmap |
| "nested structure, tree, recursive shape" | Recursion (+ maybe BFS/queue) |
| "matching brackets, undo/redo, most recent first" | Stack |
| "process in order, most recent last" | Queue |
| "reimplement a native JS method" | Know the spec's actual behavior first, then code |
| "cache with eviction" | Map/LRU |
| "search in sorted data efficiently" | Binary search |

---

*Pair this with FE_Interview_Prep_Plan.md, FE_Interview_Flashcards.md, and FE_Interview_Advanced_Plan.md. Recommendation: pick 2-3 problems per day from this doc, code them cold (no looking), then compare against the solutions here.*
