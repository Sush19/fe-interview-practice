function reverseArray(arr) {
  let left = 0; // O(1)
  let right = arr.length - 1; // O(1)

  while (left < right) {
    // O(n)
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}

const str = "Sushil";
console.log(reverseArray(str.split("")).join(""));
// Output: lihsuS
const arr = [1, 2, 3, 4, 5];
console.log(reverseArray(arr));
// Output: [ 5, 4, 3, 2, 1 ]

// Time Complexity  = O(n)
// Space Complexity = O(1) for Array & O(n) for string as the string's array conversion takes O(n) space, unavoidable since strings are immutable
