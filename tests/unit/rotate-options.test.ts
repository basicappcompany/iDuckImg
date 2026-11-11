import { describe, expect, it } from 'vitest';
import {
  defaultRotateOptions,
  flipHorizontal,
  flipVertical,
  isIdentity,
  outputName,
  previewTransform,
  rotateLeft,
  rotateRight,
  rotatedSize,
  type RotateOptions,
} from '../../src/tools/rotate/options';

const o = (patch: Partial<RotateOptions> = {}): RotateOptions => ({ ...defaultRotateOptions, ...patch });

describe('rotate buttons', () => {
  it('cycles right through 90, 180, 270 and back', () => {
    let s = o();
    const seen: number[] = [];
    for (let i = 0; i < 4; i++) {
      s = rotateRight(s);
      seen.push(s.rotation);
    }
    expect(seen).toEqual([90, 180, 270, 0]);
  });
  it('rotate left is the inverse of rotate right', () => {
    expect(rotateLeft(rotateRight(o())).rotation).toBe(0);
    expect(rotateLeft(o()).rotation).toBe(270);
  });
});

describe('flip buttons keep the normal form', () => {
  it('flip twice is the identity', () => {
    expect(isIdentity(flipHorizontal(flipHorizontal(o({ rotation: 90 }))))).toBe(false); // rotation stays 90
    expect(flipHorizontal(flipHorizontal(o({ rotation: 90 })))).toEqual(o({ rotation: 90 }));
    expect(isIdentity(flipVertical(flipVertical(o())))).toBe(true);
  });
  it('negates the stored rotation, because a mirror reverses turning', () => {
    expect(flipHorizontal(o({ rotation: 90 }))).toMatchObject({ rotation: 270, flipH: true });
    expect(flipVertical(o({ rotation: 90 }))).toMatchObject({ rotation: 270, flipV: true });
    expect(flipHorizontal(o({ rotation: 180 }))).toMatchObject({ rotation: 180, flipH: true });
  });
  it('flipping both axes equals a 180 degree turn (as a transform)', () => {
    const both = flipVertical(flipHorizontal(o()));
    expect(both).toMatchObject({ rotation: 0, flipH: true, flipV: true });
  });
});

describe('isIdentity', () => {
  it('is true only with no rotation and no flips', () => {
    expect(isIdentity(o())).toBe(true);
    expect(isIdentity(o({ rotation: 90 }))).toBe(false);
    expect(isIdentity(o({ flipH: true }))).toBe(false);
  });
});

describe('rotatedSize', () => {
  it('swaps sides for quarter turns only', () => {
    expect(rotatedSize(400, 300, 90)).toEqual({ width: 300, height: 400 });
    expect(rotatedSize(400, 300, 270)).toEqual({ width: 300, height: 400 });
    expect(rotatedSize(400, 300, 180)).toEqual({ width: 400, height: 300 });
    expect(rotatedSize(400, 300, 0)).toEqual({ width: 400, height: 300 });
  });
});

describe('previewTransform', () => {
  it('writes rotate then scale, which CSS applies as flip then rotate', () => {
    expect(previewTransform(o({ rotation: 90, flipH: true }))).toBe('rotate(90deg) scale(-1, 1)');
    expect(previewTransform(o())).toBe('rotate(0deg) scale(1, 1)');
  });
});

describe('outputName', () => {
  it('suffixes -rotated and normalises jpeg to jpg', () => {
    expect(outputName('a.jpeg', 'jpeg')).toBe('a-rotated.jpg');
    expect(outputName('shot.png', 'png')).toBe('shot-rotated.png');
  });
});
