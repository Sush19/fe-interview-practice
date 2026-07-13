function moveAllzeroToEnd(arr) {
  let insertPos = 0; // O(1)

  for (let i = 0; i < arr.length; i++) {
    // O(n)
    if (arr[i] !== 0) {
      [arr[insertPos], arr[i]] = [arr[i], arr[insertPos]];
      insertPos++;
    }
  }
  return arr;
}

const arr1 = [0, 5, 1, 0, 6, 1, 0, 9, 4, 2, 0];
console.log(moveAllzeroToEnd(arr1));
// Output : [5, 1, 6, 1, 9, 4, 2, 0, 0, 0, 0]
const arr2 = [0, 0, 0];
console.log(moveAllzeroToEnd(arr2));
// Output: [ 0, 0, 0 ]
const arr3 = [1, 2, 3];
console.log(moveAllzeroToEnd(arr3));
// Output: [ 1, 2, 3 ]
const arr4 = [];
console.log(moveAllzeroToEnd(arr4));
// Output: [ 1, 2, 3 ]

// Time Complexity  = O(n)
// Space Complexity = O(1)
