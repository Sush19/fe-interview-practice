function removeDuplicate(arr) {
  const uniqueItems = new Set(arr);
  return [...uniqueItems];
}

function getDuplicateItems(arr) {
  const seen = new Set();
  const duplicateItems = new Set();

  for (const item of arr) {
    if (!seen.has(item)) seen.add(item);
    else duplicateItems.add(item);
  }
  return [...duplicateItems];
}

const numbers = [1, 2, 2, 3, 4, 4, 5];
console.log(removeDuplicate(numbers));
console.log(getDuplicateItems(numbers));
