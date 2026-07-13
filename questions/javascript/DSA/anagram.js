/*
An anagram is a word or phrase formed by rearranging the letters of another word 
or phrase using all the original letters exactly once. 
A common example is "listen," which can be rearranged to spell "silent". 
*/

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false; // O(1)
  let inputStr1 = str1.toLowerCase(); // O(n)
  let inputStr2 = str2.toLowerCase(); // O(k)
  inputStr1 = inputStr1.split("").sort().join(""); // sort takes O(n log n)
  inputStr2 = inputStr2.split("").sort().join(""); // sort takes O(k log k)
  return inputStr1 === inputStr2;
}

const str1 = "listen";
const str2 = "silent";
console.log(isAnagram(str1, str2));
// Output: true

// Time Complexity  = O(n log n + k log k)
// Space Complexity = O(n + k)

/* ------------------------------------------------------- */
function isAnagramFreqMap(s1, s2) {
  if (s1.length !== s2.length) return false;

  const counts = {}; // O(1)

  for (const ch of s1) {
    // O(n)
    counts[ch.toLowerCase()] = (counts[ch.toLowerCase()] || 0) + 1;
  }

  for (const ch of s2) {
    // O(k)
    if (!counts[ch.toLowerCase()]) return false;
    counts[ch.toLowerCase()]--;
  }

  return true;
}

const s1 = "throw";
const s2 = "worth";
console.log(isAnagramFreqMap(s1, s2)); // Output: true

const s3 = "Eastwood";
const s4 = "Woodeast";
console.log(isAnagramFreqMap(s3, s4)); // Output: true

// Time Complexity  = O(n + k) = O(n) if n >= k
// Space Complexity = O(1)
