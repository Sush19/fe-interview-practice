/**
 * Lightweight test helper — no dependencies needed.
 * Usage:
 *   const { describe, it, expect, runSuite } = require('../utils/test-helpers');
 *   describe('My suite', () => { it('works', () => expect(1).toBe(1)); });
 *   module.exports = { run: runSuite };
 */

let _suites = [];
let _currentSuite = null;

function describe(name, fn) {
  _currentSuite = { name, tests: [] };
  _suites.push(_currentSuite);
  fn();
  _currentSuite = null;
}

function it(name, fn) {
  if (!_currentSuite) throw new Error('it() must be inside describe()');
  _currentSuite.tests.push({ name, fn });
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected)
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    },
    toEqual(expected) {
      const a = JSON.stringify(actual);
      const b = JSON.stringify(expected);
      if (a !== b)
        throw new Error(`Expected ${b}, got ${a}`);
    },
    toBeNull() {
      if (actual !== null)
        throw new Error(`Expected null, got ${JSON.stringify(actual)}`);
    },
    toBeTruthy() {
      if (!actual)
        throw new Error(`Expected truthy, got ${JSON.stringify(actual)}`);
    },
    toBeFalsy() {
      if (actual)
        throw new Error(`Expected falsy, got ${JSON.stringify(actual)}`);
    },
    toBeGreaterThan(n) {
      if (actual <= n)
        throw new Error(`Expected > ${n}, got ${actual}`);
    },
    toBeLessThan(n) {
      if (actual >= n)
        throw new Error(`Expected < ${n}, got ${actual}`);
    },
    toContain(item) {
      if (!actual.includes(item))
        throw new Error(`Expected ${JSON.stringify(actual)} to contain ${JSON.stringify(item)}`);
    },
    toThrow() {
      try { actual(); throw new Error('Expected function to throw, but it did not.'); }
      catch (e) { if (e.message.includes('Expected function to throw')) throw e; }
    },
    resolves: {
      async toBe(expected) {
        const val = await actual;
        if (val !== expected)
          throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(val)}`);
      },
      async toEqual(expected) {
        const val = await actual;
        if (JSON.stringify(val) !== JSON.stringify(expected))
          throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(val)}`);
      }
    }
  };
}

function runSuite() {
  let passed = 0, failed = 0, skipped = 0;
  const details = [];

  for (const suite of _suites) {
    for (const test of suite.tests) {
      try {
        const result = test.fn();
        if (result && typeof result.then === 'function') {
          // Skip async tests in sync runner (mark as pending)
          details.push({ name: `${suite.name} > ${test.name}`, skipped: true });
          skipped++;
        } else {
          details.push({ name: `${suite.name} > ${test.name}` });
          passed++;
        }
      } catch (e) {
        if (e.message === 'NOT_IMPLEMENTED') {
          details.push({ name: `${suite.name} > ${test.name}`, skipped: true });
          skipped++;
        } else {
          details.push({ name: `${suite.name} > ${test.name}`, error: e.message });
          failed++;
        }
      }
    }
  }

  // Reset for re-runs in watch mode
  _suites = [];
  _currentSuite = null;

  return { passed, failed, skipped, details };
}

function notImplemented() {
  throw new Error('NOT_IMPLEMENTED');
}

module.exports = { describe, it, expect, runSuite, notImplemented };
