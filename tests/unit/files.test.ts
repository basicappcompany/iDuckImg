import { describe, expect, it } from 'vitest';
import {
  dedupeNames,
  formatBytes,
  isAccepted,
  partitionFiles,
  percentChange,
  withExtension,
} from '../../src/lib/files';

const f = (name: string, type = '') => new File(['x'], name, { type });

describe('isAccepted', () => {
  it('matches by exact mime, wildcard and extension', () => {
    expect(isAccepted(f('a.png', 'image/png'), ['image/png'])).toBe(true);
    expect(isAccepted(f('a.webp', 'image/webp'), ['image/*'])).toBe(true);
    expect(isAccepted(f('a.pdf', 'application/pdf'), ['image/*'])).toBe(false);
  });

  it('falls back to extension when the browser gives no type (HEIC on Windows)', () => {
    expect(isAccepted(f('IMG_1.HEIC'), ['.heic'])).toBe(true);
    expect(isAccepted(f('IMG_1.heic'), ['image/png'])).toBe(false);
  });
});

describe('partitionFiles', () => {
  it('splits accepted and rejected', () => {
    const { accepted, rejected } = partitionFiles(
      [f('a.png', 'image/png'), f('b.txt', 'text/plain')],
      ['image/png'],
    );
    expect(accepted.map((x) => x.name)).toEqual(['a.png']);
    expect(rejected.map((x) => x.name)).toEqual(['b.txt']);
  });
});

describe('formatBytes', () => {
  it('formats across units', () => {
    expect(formatBytes(500)).toBe('500 B');
    expect(formatBytes(2048)).toBe('2.0 KB');
    expect(formatBytes(150 * 1024)).toBe('150 KB');
    expect(formatBytes(5 * 1024 * 1024)).toBe('5.00 MB');
    expect(formatBytes(-1)).toBe('-');
  });
});

describe('percentChange', () => {
  it('reports shrinkage as negative', () => {
    expect(percentChange(1000, 580)).toBe(-42);
    expect(percentChange(0, 10)).toBe(0);
  });
});

describe('dedupeNames', () => {
  it('suffixes duplicates case-insensitively', () => {
    expect(dedupeNames(['a.jpg', 'A.jpg', 'b.jpg', 'a.jpg'])).toEqual([
      'a.jpg',
      'A (2).jpg',
      'b.jpg',
      'a (3).jpg',
    ]);
  });
});

describe('withExtension', () => {
  it('swaps or adds an extension', () => {
    expect(withExtension('photo.heic', 'jpg')).toBe('photo.jpg');
    expect(withExtension('photo', '.png')).toBe('photo.png');
    expect(withExtension('my.photo.png', 'webp')).toBe('my.photo.webp');
  });
});
