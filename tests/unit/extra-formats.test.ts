import { describe, expect, it } from 'vitest';
import {
  EXTRA_ACCEPTS,
  SVG_MAX_SIDE,
  SVG_MIN_SIDE,
  detectExtraFormat,
  parseSvgSize,
  pngName,
  svgRenderSize,
  takesPictures,
} from '../../src/lib/extra-formats';
import { isAccepted } from '../../src/lib/files';

describe('detectExtraFormat', () => {
  it('knows the four formats by type or by extension', () => {
    expect(detectExtraFormat({ type: 'image/bmp', name: 'a' })).toBe('bmp');
    expect(detectExtraFormat({ type: '', name: 'SCAN.BMP' })).toBe('bmp');
    expect(detectExtraFormat({ type: 'image/gif', name: 'a' })).toBe('gif');
    expect(detectExtraFormat({ type: '', name: 'logo.svg' })).toBe('svg');
    expect(detectExtraFormat({ type: 'image/svg+xml', name: 'x' })).toBe('svg');
    expect(detectExtraFormat({ type: '', name: 'photo.avif' })).toBe('avif');
  });

  it('leaves ordinary pictures alone', () => {
    for (const name of ['a.jpg', 'a.png', 'a.webp', 'a.heic', 'a.pdf']) {
      expect(detectExtraFormat({ type: '', name })).toBeNull();
    }
  });

  it('is accepted by the picker list, even when the browser reports no type', () => {
    for (const name of ['a.bmp', 'a.gif', 'a.svg', 'a.avif']) {
      expect(isAccepted({ type: '', name } as File, EXTRA_ACCEPTS)).toBe(true);
    }
    expect(isAccepted({ type: 'image/gif', name: 'x' } as File, EXTRA_ACCEPTS)).toBe(true);
    expect(isAccepted({ type: 'application/pdf', name: 'a.pdf' } as File, EXTRA_ACCEPTS)).toBe(false);
  });

  it('only extends tools that take ordinary pictures', () => {
    expect(takesPictures(['image/jpeg', 'image/png', 'image/webp'])).toBe(true);
    expect(takesPictures(['application/pdf'])).toBe(false);
  });
});

describe('svgRenderSize', () => {
  it('draws a small vector bigger so it stays sharp, keeping its proportions', () => {
    expect(svgRenderSize(200, 100)).toEqual({ width: SVG_MIN_SIDE, height: 512 });
    expect(svgRenderSize(24, 24)).toEqual({ width: SVG_MIN_SIDE, height: SVG_MIN_SIDE });
  });

  it('keeps a size that is already in range and caps a huge one', () => {
    expect(svgRenderSize(2000, 1000)).toEqual({ width: 2000, height: 1000 });
    expect(svgRenderSize(10000, 5000)).toEqual({ width: SVG_MAX_SIDE, height: 2048 });
  });

  it('falls back to a square when the size is unknown', () => {
    expect(svgRenderSize(0, 0)).toEqual({ width: SVG_MIN_SIDE, height: SVG_MIN_SIDE });
    expect(svgRenderSize(NaN, 10)).toEqual({ width: SVG_MIN_SIDE, height: SVG_MIN_SIDE });
  });
});

describe('parseSvgSize', () => {
  it('reads width and height, with or without px', () => {
    expect(parseSvgSize('<svg width="200" height="100"></svg>')).toEqual({ width: 200, height: 100 });
    expect(parseSvgSize("<svg width='64px' height='32px'/>")).toEqual({ width: 64, height: 32 });
  });

  it('uses the viewBox when there is no size, or the size is a percentage', () => {
    expect(parseSvgSize('<svg viewBox="0 0 300 150"></svg>')).toEqual({ width: 300, height: 150 });
    expect(parseSvgSize('<svg width="100%" height="100%" viewBox="0 0 40 20"></svg>')).toEqual({ width: 40, height: 20 });
    expect(parseSvgSize('<svg viewBox="0,0,10,10"></svg>')).toEqual({ width: 10, height: 10 });
  });

  it('keeps the viewBox proportions when only one side is given', () => {
    expect(parseSvgSize('<svg width="200" viewBox="0 0 100 50"></svg>')).toEqual({ width: 200, height: 100 });
  });

  it('returns null when there is nothing to go on', () => {
    expect(parseSvgSize('<svg></svg>')).toBeNull();
    expect(parseSvgSize('hello')).toBeNull();
    expect(parseSvgSize('<svg viewBox="0 0 0 0"></svg>')).toBeNull();
  });

  it('does not mistake stroke-width on an inner element for the size', () => {
    expect(parseSvgSize('<svg viewBox="0 0 50 50"><rect stroke-width="9" height="9"/></svg>')).toEqual({ width: 50, height: 50 });
  });
});

describe('pngName', () => {
  it('swaps the extension', () => {
    expect(pngName('photo.gif')).toBe('photo.png');
    expect(pngName('my.logo.svg')).toBe('my.logo.png');
    expect(pngName('noext')).toBe('noext.png');
  });
});
