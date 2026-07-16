function getIntersectionItems(a, b) {
  return a.filter((item) => new Set(b).has(item));
}

function getUnionItems(a, b) {
  return [...new Set([...a, ...b])];
}

const a = [1, 2, 3, 4];
const b = [3, 4, 5, 6];
console.log(getIntersectionItems(a, b));
console.log(getUnionItems(a, b));
