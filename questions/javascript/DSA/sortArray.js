function sortArray(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}

console.log(sortArray([3, 0, 6, 0, 1, 9, 0, 3, 6]));
console.log(sortArray("sushil").join(""));

function sortArray2(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return a;
}

console.log(sortArray2([3, 0, 6, 0, 1, 9, 0, 3, 6]));
console.log(sortArray2("sushil").join(""));
