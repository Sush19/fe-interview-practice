const { describe, it, expect, runSuite } = require('../utils/test-helpers');
const { EventEmitter } = require('../solutions/javascript/06-event-emitter');

describe('EventEmitter', () => {
  it('on + emit calls the listener', () => {
    const emitter = new EventEmitter();
    let result = null;
    emitter.on('test', (val) => { result = val; });
    emitter.emit('test', 42);
    expect(result).toBe(42);
  });

  it('supports multiple listeners for one event', () => {
    const emitter = new EventEmitter();
    let count = 0;
    emitter.on('x', () => count++);
    emitter.on('x', () => count++);
    emitter.emit('x');
    expect(count).toBe(2);
  });

  it('off removes a specific listener', () => {
    const emitter = new EventEmitter();
    let count = 0;
    const handler = () => count++;
    emitter.on('y', handler);
    emitter.off('y', handler);
    emitter.emit('y');
    expect(count).toBe(0);
  });

  it('off does not remove other listeners', () => {
    const emitter = new EventEmitter();
    let count = 0;
    const h1 = () => count++;
    const h2 = () => count++;
    emitter.on('z', h1);
    emitter.on('z', h2);
    emitter.off('z', h1);
    emitter.emit('z');
    expect(count).toBe(1);
  });

  it('once fires only once', () => {
    const emitter = new EventEmitter();
    let count = 0;
    emitter.once('ping', () => count++);
    emitter.emit('ping');
    emitter.emit('ping');
    expect(count).toBe(1);
  });

  it('emitting unknown event does not throw', () => {
    const emitter = new EventEmitter();
    emitter.emit('doesNotExist'); // should not throw
    expect(true).toBeTruthy();
  });

  it('passes multiple arguments to listener', () => {
    const emitter = new EventEmitter();
    let args = [];
    emitter.on('multi', (...a) => { args = a; });
    emitter.emit('multi', 1, 2, 3);
    expect(args).toEqual([1, 2, 3]);
  });
});

module.exports = { run: runSuite };
