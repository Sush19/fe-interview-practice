// ## A1. Pair Sum (Two Sum on a Sorted Array)
// **Problem:** Given a *sorted* array and a target, find two numbers that add up to the target.

// **Why asked:** Tests whether you reach for two pointers instead of brute-forcing O(n²), and whether you know when hashmaps aren't needed (array is already sorted).

// **Approach:**
// 1. Place `left` pointer at index 0, `right` pointer at the last index.
// 2. Compute `sum = arr[left] + arr[right]`.
// 3. If `sum === target`, return the pair.
// 4. If `sum < target`, move `left` forward (need a bigger sum).
// 5. If `sum > target`, move `right` backward (need a smaller sum).
// 6. Stop when `left >= right`.

// Sorted Array
function pairSumSortedArray(arr, target) {
  let left = 0; // O(1)
  let right = arr.length - 1; // O(1)

  while (left < right) {
    // O(n)
    const sum = arr[left] + arr[right]; // O(1)

    if (sum === target) {
      return [arr[left], arr[right]];
    }

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return null;
}

const sortedArr = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const target = 10;
console.log(pairSumSortedArray(sortedArr, target)); // Output [1, 9]
// Time Complexity = O(n);
// Space Complexity = O(1);

//----------------------------------------------------------------

function pairSumUnsorted(target, arr) {
  let left = 0; // O(1)
  let right = arr.length - 1; // O(1)
  const sortedArray = [...arr].sort((a, b) => a - b); // the spread creates a copy in O(n) time and space, then sort adds O(n log n) on top

  while (left < right) {
    // O(n)
    const sum = sortedArray[left] + sortedArray[right]; // O(1)

    if (sum === target) {
      return [sortedArray[left], sortedArray[right]];
    }

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return null;
}

const unSortedArr = [1, 4, 3, 2];
const target2 = 5;
console.log(pairSumUnsorted(target2, unSortedArr)); // Output [1, 4]

// Time Complexity = O(n log n);
// Space Complexity = O(n);

// -------------------------------------------------------------------

function pairSumHashmap(arr, target) {
  const seen = new Set(); // O(1)
  for (const num of arr) {
    // O(n)
    const complement = target - num; // O(1)
    if (seen.has(complement)) return [complement, num];
    seen.add(num); // O(n)
  }
  return null;
}

const arr = [3, 6, 1, 9, 3, 0, 1, 4];
const target3 = 7;
console.log(pairSumHashmap(arr, target3)); // output: [6, 1]

// Time Complexity  = O(n)
// Space Complexity = O(n)  — Set can hold up to n-1 elements in the worst case
