/**
 * QUESTION 4 — Array.flat() (Easy)
 * ─────────────────────────────────────────────────────────
 * Implement `flatten(arr, depth)` that mirrors Array.prototype.flat().
 *
 * Requirements:
 *  - Default depth is 1
 *  - depth = Infinity flattens fully
 *  - Does not mutate the original array
 *  - Handles empty arrays and non-array items correctly
 *
 * Example:
 *   flatten([1, [2, [3, [4]]]]);         // [1, 2, [3, [4]]]
 *   flatten([1, [2, [3, [4]]]], 2);      // [1, 2, 3, [4]]
 *   flatten([1, [2, [3, [4]]]], Infinity); // [1, 2, 3, 4]
 *
 * Your solution → solutions/javascript/04-array-flat.js
 */

const inbuiltFlatten = (obj, depth = 1) => {
  if (!Array.isArray(obj)) {
    return obj;
  }

  return obj.flat(depth);
};

console.log("----------Using flat()----------");
console.log("Flatten 1", inbuiltFlatten([1, [2, [3, [4]]]]));
console.log("Flatten 2", inbuiltFlatten([1, [2, [3, [4]]]], 2));
console.log("Flatten infinity", inbuiltFlatten([1, [2, [3, [4]]]], Infinity));
console.log("Flatten non-array", inbuiltFlatten(42));
console.log("Flatten empty array", inbuiltFlatten([]));
console.log("Flatten string", inbuiltFlatten("Hello"));
console.log("Flatten boolean", inbuiltFlatten(true));
console.log("Flatten null", inbuiltFlatten(null));
console.log("Flatten undefined", inbuiltFlatten(undefined));
console.log("Flatten object", inbuiltFlatten({ a: 1, b: 2 }));
console.log(
  "Flatten mixed types",
  inbuiltFlatten(
    [1, [2, [3, [4]]], "Hello", true, null, undefined, { a: 1 }],
    Infinity,
  ),
);

const flatArrayRecursion = (arr, depth = 1) => {
  if (!Array.isArray(arr)) {
    return [arr];
  }

  const flattenArray = [];
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      flattenArray.push(...flatArrayRecursion(item, depth - 1));
    } else {
      flattenArray.push(item);
    }
  }
  return flattenArray;
};

console.log("----------Using recursion()----------");
console.log("Flatten 1", flatArrayRecursion([1, [2, [3, [4]]]]));
console.log("Flatten 2", flatArrayRecursion([1, [2, [3, [4]]]], 2));
console.log(
  "Flatten infinity",
  flatArrayRecursion([1, [2, [3, [4]]]], Infinity),
);
console.log("Flatten non-array", flatArrayRecursion(42));
console.log("Flatten empty array", flatArrayRecursion([]));
console.log("Flatten string", flatArrayRecursion("Hello"));
console.log("Flatten boolean", flatArrayRecursion(true));
console.log("Flatten null", flatArrayRecursion(null));
console.log("Flatten undefined", flatArrayRecursion(undefined));
console.log("Flatten object", flatArrayRecursion({ a: 1, b: 2 }));
console.log(
  "Flatten mixed types",
  flatArrayRecursion(
    [1, [2, [3, [4]]], "Hello", true, null, undefined, { a: 1 }],
    Infinity,
  ),
);

const flatArrayRecursionReduce = (arr, depth = 1) => {
  if (!Array.isArray(arr)) {
    return [arr];
  }

  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 0) {
      acc.push(...flatArrayRecursionReduce(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
};

console.log("----------Using recursion reduce()----------");
console.log("Flatten 1", flatArrayRecursionReduce([1, [2, [3, [4]]]]));
console.log("Flatten 2", flatArrayRecursionReduce([1, [2, [3, [4]]]], 2));
console.log(
  "Flatten infinity",
  flatArrayRecursionReduce([1, [2, [3, [4]]]], Infinity),
);
console.log("Flatten non-array", flatArrayRecursionReduce(42));
console.log("Flatten empty array", flatArrayRecursionReduce([]));
console.log("Flatten string", flatArrayRecursionReduce("Hello"));
console.log("Flatten boolean", flatArrayRecursionReduce(true));
console.log("Flatten null", flatArrayRecursionReduce(null));
console.log("Flatten undefined", flatArrayRecursionReduce(undefined));
console.log("Flatten object", flatArrayRecursionReduce({ a: 1, b: 2 }));
console.log(
  "Flatten mixed types",
  flatArrayRecursionReduce(
    [1, [2, [3, [4]]], "Hello", true, null, undefined, { a: 1 }],
    Infinity,
  ),
);
