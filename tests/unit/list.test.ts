import { describe, expect, it } from 'vitest';
import { moveItem, removeAt } from '../../src/lib/list';

describe('moveItem', () => {
  it('moves an item down and up', () => {
    expect(moveItem(['a', 'b', 'c'], 0, 1)).toEqual(['b', 'a', 'c']);
    expect(moveItem(['a', 'b', 'c'], 2, 0)).toEqual(['c', 'a', 'b']);
  });
  it('ignores out-of-range or no-op moves and never mutates the input', () => {
    const list = ['a', 'b', 'c'];
    expect(moveItem(list, 0, -1)).toEqual(['a', 'b', 'c']);
    expect(moveItem(list, 2, 3)).toEqual(['a', 'b', 'c']);
    expect(moveItem(list, 1, 1)).toEqual(['a', 'b', 'c']);
    expect(list).toEqual(['a', 'b', 'c']);
  });
});

describe('removeAt', () => {
  it('removes one item without mutating', () => {
    const list = ['a', 'b', 'c'];
    expect(removeAt(list, 1)).toEqual(['a', 'c']);
    expect(list).toHaveLength(3);
    expect(removeAt(list, 9)).toEqual(['a', 'b', 'c']);
  });
});
