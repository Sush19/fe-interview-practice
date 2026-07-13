/* 
Worth knowing for the interview — this vs. the two-pointer version:
Both are O(n) time and O(n) space on paper, but there's a meaningful practical difference:

Two-pointer version: stops as soon as it finds a mismatch — best case can exit early 
(e.g., first and last characters already differ → O(1) in practice for that case).
Reverse-and-compare version: always does the full split, reverse, join, and comparison 
regardless of whether the string is obviously not a palindrome — no early exit is possible, 
since you need the entire reversed string built before you can compare.

So if an interviewer asks "can you optimize this further?", the answer is: 
the two-pointer approach is the better one to lead with, since it can short-circuit early 
and doesn't need to allocate two extra arrays/strings — this version, 
while correct and often what people write first, 
does strictly more work in both time and space than necessary.
*/

function isPalindrome(str) {
  const input = str.toLowerCase(); // O(n)
  const len = input.length; // O(1)
  for (let i = 0; i < Math.floor(len / 2); i++) {
    // O(n)
    if (input[i] !== input[len - 1 - i]) return false;
  }
  return true;
}

const str1 = "madam";
console.log(isPalindrome(str1) ? "Is palindrome" : "Not palindrome");
// Output: Is palindrome
const str2 = "madam is madam";
console.log(isPalindrome(str2) ? "Is palindrome" : "Not palindrome");
// Output: Not palindrome

// Time Complexity  = O(n)
// Space Complexity = O(n)

// ------------------------------------------------------------------

function isPalindromeReverseStr(str) {
  const input = str.toLowerCase(); // O(n)
  const reverseInput = input.split("").reverse().join(""); // O(n)
  return input === reverseInput;
}

const str3 = "madam";
console.log(isPalindromeReverseStr(str3) ? "Is palindrome" : "Not palindrome");
// Output: Is palindrome
const str4 = "madam is madam";
console.log(isPalindromeReverseStr(str4) ? "Is palindrome" : "Not palindrome");
// Output: Not palindrome

// Time Complexity  = O(n)
// Space Complexity = O(n)

// -------------------------------------------------------------------------

function isPalindromeReverseStr(str) {
  const input = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // O(n)
  const reverseInput = input.split("").reverse().join(""); // O(n)
  return input === reverseInput;
}

const str = "A man, a plan, a canal:!@#$%^&*()_+=-{}[];<>?/\| Panama";
console.log(isPalindromeReverseStr(str) ? "Is palindrome" : "Not palindrome");
// Output: Is palindrome

// Time Complexity  = O(n)
// Space Complexity = O(n)
