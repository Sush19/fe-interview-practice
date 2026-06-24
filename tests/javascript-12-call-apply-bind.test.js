const { describe, it, expect, runSuite } = require('../utils/test-helpers');
const { myCall, myApply, myBind } = require('../solutions/javascript/12-call-apply-bind');

const person = { name: 'Ada' };
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation || ''}`;
}

describe('myCall', () => {
  it('binds this and passes args', () => {
    expect(myCall(greet, person, 'Hi')).toBe('Hi, Ada');
  });

  it('passes multiple args', () => {
    expect(myCall(greet, person, 'Hi', '!')).toBe('Hi, Ada!');
  });
});

describe('myApply', () => {
  it('binds this and passes an args array', () => {
    expect(myApply(greet, person, ['Hello', '?'])).toBe('Hello, Ada?');
  });

  it('works with no args array', () => {
    const get = function () { return this.name; };
    expect(myApply(get, person)).toBe('Ada');
  });
});

describe('myBind', () => {
  it('returns a function bound to context', () => {
    const bound = myBind(greet, person);
    expect(bound('Hey')).toBe('Hey, Ada');
  });

  it('supports partial application', () => {
    const add = function (a, b) { return a + b; };
    const add5 = myBind(add, null, 5);
    expect(add5(10)).toBe(15);
  });

  it('merges bound args with call-time args', () => {
    const boundGreet = myBind(greet, person, 'Yo');
    expect(boundGreet('!!')).toBe('Yo, Ada!!');
  });
});

module.exports = { run: runSuite };
