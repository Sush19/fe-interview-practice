const { describe, it, expect, runSuite } = require('../utils/test-helpers');
const { diff } = require('../solutions/javascript/10-virtual-dom-diff');

describe('diff', () => {
  it('returns empty patches for identical nodes', () => {
    const node = { type: 'div', props: {}, children: [] };
    const patches = diff(node, node);
    expect(Array.isArray(patches)).toBeTruthy();
    expect(patches.length).toBe(0);
  });

  it('detects type change as REPLACE', () => {
    const oldNode = { type: 'div', props: {}, children: [] };
    const newNode = { type: 'span', props: {}, children: [] };
    const patches = diff(oldNode, newNode);
    expect(patches.some(p => p.op === 'REPLACE')).toBeTruthy();
  });

  it('detects prop changes', () => {
    const oldNode = { type: 'div', props: { class: 'a' }, children: [] };
    const newNode = { type: 'div', props: { class: 'b' }, children: [] };
    const patches = diff(oldNode, newNode);
    expect(patches.some(p => p.op === 'PROPS')).toBeTruthy();
  });

  it('detects text node change', () => {
    const patches = diff('hello', 'world');
    expect(patches.some(p => p.op === 'TEXT')).toBeTruthy();
  });

  it('no patches when text is same', () => {
    const patches = diff('hello', 'hello');
    expect(patches.length).toBe(0);
  });

  it('detects REMOVE when new node is undefined', () => {
    const oldNode = { type: 'div', props: {}, children: [] };
    const patches = diff(oldNode, undefined);
    expect(patches.some(p => p.op === 'REMOVE')).toBeTruthy();
  });

  it('detects INSERT when old node is undefined', () => {
    const newNode = { type: 'div', props: {}, children: [] };
    const patches = diff(undefined, newNode);
    expect(patches.some(p => p.op === 'INSERT')).toBeTruthy();
  });
});

module.exports = { run: runSuite };
