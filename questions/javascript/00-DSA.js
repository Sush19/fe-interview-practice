/**
 * Palindrome — checks whether a string reads the same forwards and backwards.
 *
 * Ignores case, spaces, and punctuation (e.g. "A man, a plan, a canal: Panama"
 * is treated as a palindrome).
 *
 * @param {string} str - The input string to test.
 * @returns {boolean} `true` if `str` is a palindrome, otherwise `false`.
 *
 * Approach: strip non-alphanumeric characters and lowercase the string, then
 * compare it against its reverse. Time & space complexity: O(n).
 */
const Palindrome1 = (str) => {
  const cleaned = str.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
};

console.log("/* *----------- PALINDROME TYPE-1 -----------* */");
console.log(
  Palindrome1("A man, a plan, a canal: Panama") === true
    ? "Palindrome"
    : "Not a Palindrome",
); // true
console.log(
  Palindrome1("race a car") === true ? "Palindrome" : "Not a Palindrome",
); // false

function palindrome2(input) {
  const str = input.toLowerCase();

  for (let i = 0; i < Math.floor(str.length) / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

console.log("/* *----------- PALINDROME TYPE-2 -----------* */");
console.log(palindrome2("madam") === true ? "Palindrome" : "Not a Palindrome");
console.log(palindrome2("hello") === true ? "Palindrome" : "Not a Palindrome");
console.log("/* *############## PALINDROME END ##############* */");

const reverseString1 = (str) => {
  return str.split("").reverse().join("");
};
console.log(reverseString1("hello")); // "olleh"

const reverseString2 = (str) => {
  let reversedString = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversedString += str[i];
  }

  return reversedString;
};
console.log(reverseString2("world")); // "dlrow"

// An anagram is a word or phrase formed by rearranging the letters of another word or phrase, using all the original letters exactly once
function isAnagram1(str1, str2) {
  const normalize = (str) => str.toLowerCase().split("").sort().join("");
  return normalize(str1) === normalize(str2);
}
console.log(isAnagram1("listen", "silent")); // true
console.log(isAnagram1("hello", "world"));   // false

function isAnagram2(str1, str2) {
  // without using built in function

}

function countVowels(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}
console.log(countVowels("hello world")); // 3