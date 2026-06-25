/**
 * SOLUTION — Debounce
 * Write your solution below. Run `node runner.js` to test.
 */

function debounce(fn, delay) {
  let timerId = null;
  function debounced(...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }

  debounced.cancel = () => {
    clearTimeout(timerId);
    timerId = null;
  };

  return debounced;
}

module.exports = { debounce };
