import { describe, expect, it } from 'vitest';
import {
  clampQuality,
  detectFormat,
  outputName,
  shouldKeepOriginal,
  targetFormat,
} from '../../src/tools/compress/options';

describe('detectFormat', () => {
  it('uses the MIME type first', () => {
    expect(detectFormat({ type: 'image/jpeg', name: 'x' })).toBe('jpeg');
    expect(detectFormat({ type: 'image/png', name: 'x' })).toBe('png');
    expect(detectFormat({ type: 'image/webp', name: 'x' })).toBe('webp');
  });
  it('falls back to the extension', () => {
    expect(detectFormat({ type: '', name: 'A.JPEG' })).toBe('jpeg');
    expect(detectFormat({ type: '', name: 'a.png' })).toBe('png');
  });
  it('returns null for unsupported files', () => {
    expect(detectFormat({ type: 'image/gif', name: 'a.gif' })).toBeNull();
  });
});

describe('targetFormat', () => {
  it('keeps the input format or converts to webp', () => {
    expect(targetFormat('png', { quality: 70, format: 'same' })).toBe('png');
    expect(targetFormat('jpeg', { quality: 70, format: 'webp' })).toBe('webp');
  });
});

describe('clampQuality', () => {
  it('clamps and rounds', () => {
    expect(clampQuality(0)).toBe(1);
    expect(clampQuality(150)).toBe(100);
    expect(clampQuality(72.6)).toBe(73);
    expect(clampQuality(NaN)).toBe(75);
  });
});

describe('outputName', () => {
  it('adds a suffix and follows the output extension', () => {
    expect(outputName('photo.jpeg', 'jpeg')).toBe('photo-compressed.jpg');
    expect(outputName('photo.png', 'webp')).toBe('photo-compressed.webp');
    expect(outputName('noext', 'png')).toBe('noext-compressed.png');
  });
});

describe('shouldKeepOriginal', () => {
  it('keeps the original only when same format and not smaller', () => {
    expect(shouldKeepOriginal(100, 120, true)).toBe(true);
    expect(shouldKeepOriginal(100, 100, true)).toBe(true);
    expect(shouldKeepOriginal(100, 60, true)).toBe(false);
    expect(shouldKeepOriginal(100, 120, false)).toBe(false);
  });
});
