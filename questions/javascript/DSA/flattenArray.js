function flatArrInbuilt(arr) {
  return arr.flat(Infinity);
}

function flatArrayPush(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...flatArrayPush(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function flatArrayReduce(arr) {
  return arr.reduce(
    (acc, val) => [
      ...acc,
      ...(Array.isArray(val) ? flatArrayReduce(val) : [val]),
    ],
    [],
  );
}

const nested = [1, [2, 3, [4, [5, 6]]], 7];
console.log(flatArrInbuilt(nested));
console.log(flatArrayPush(nested));
console.log(flatArrayReduce(nested));
