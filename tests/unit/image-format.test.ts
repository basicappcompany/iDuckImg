import { describe, expect, it } from 'vitest';
import { detectFormat, detectInputFormat, isHeic } from '../../src/tools/image-format';
import { isAccepted } from '../../src/lib/files';
import { CONVERT_ACCEPTS } from '../../src/tools/convert/options';

describe('isHeic', () => {
  it('recognises the MIME types', () => {
    expect(isHeic({ type: 'image/heic', name: 'x' })).toBe(true);
    expect(isHeic({ type: 'image/heif', name: 'x' })).toBe(true);
  });
  it('recognises the extension when the browser reports no type (common for HEIC)', () => {
    expect(isHeic({ type: '', name: 'IMG_0001.HEIC' })).toBe(true);
    expect(isHeic({ type: '', name: 'photo.heif' })).toBe(true);
  });
  it('rejects other files', () => {
    expect(isHeic({ type: 'image/jpeg', name: 'a.jpg' })).toBe(false);
    expect(isHeic({ type: '', name: 'heic.txt' })).toBe(false);
  });
});

describe('detectInputFormat', () => {
  it('adds HEIC on top of detectFormat', () => {
    expect(detectInputFormat({ type: '', name: 'IMG_1.heic' })).toBe('heic');
    expect(detectInputFormat({ type: 'image/png', name: 'a.png' })).toBe('png');
    expect(detectInputFormat({ type: 'image/gif', name: 'a.gif' })).toBeNull();
  });
  it('leaves detectFormat unchanged, so tools that cannot read HEIC still reject it', () => {
    expect(detectFormat({ type: 'image/heic', name: 'a.heic' })).toBeNull();
  });
});

describe('the convert dropzone', () => {
  it('accepts a HEIC file even with an empty MIME type', () => {
    const heic = new File(['x'], 'IMG_1234.HEIC', { type: '' });
    expect(isAccepted(heic, CONVERT_ACCEPTS)).toBe(true);
  });
  it('still rejects unsupported images', () => {
    expect(isAccepted(new File(['x'], 'a.gif', { type: 'image/gif' }), CONVERT_ACCEPTS)).toBe(false);
  });
});
