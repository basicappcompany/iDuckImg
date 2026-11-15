import { describe, expect, it } from 'vitest';
import {
  A4,
  A4_MARGIN,
  MAX_PDF_SIDE,
  clampQuality,
  losesTransparency,
  mimeOfTarget,
  outputName,
  pdfPlacement,
} from '../../src/tools/convert/options';

describe('outputName', () => {
  it('swaps the extension and keeps the base name', () => {
    expect(outputName('photo.png', 'jpeg')).toBe('photo.jpg');
    expect(outputName('photo.JPEG', 'webp')).toBe('photo.webp');
    expect(outputName('scan.jpg', 'pdf')).toBe('scan.pdf');
    expect(outputName('noext', 'png')).toBe('noext.png');
  });
});

describe('mimeOfTarget', () => {
  it('maps each target', () => {
    expect(mimeOfTarget('pdf')).toBe('application/pdf');
    expect(mimeOfTarget('jpeg')).toBe('image/jpeg');
    expect(mimeOfTarget('png')).toBe('image/png');
    expect(mimeOfTarget('webp')).toBe('image/webp');
    expect(mimeOfTarget('avif')).toBe('image/avif');
  });
});

describe('clampQuality', () => {
  it('clamps and falls back on bad input', () => {
    expect(clampQuality(0)).toBe(1);
    expect(clampQuality(500)).toBe(100);
    expect(clampQuality(NaN)).toBe(90);
  });
});

describe('losesTransparency', () => {
  it('is true only for JPG', () => {
    expect(losesTransparency('jpeg')).toBe(true);
    expect(losesTransparency('png')).toBe(false);
    expect(losesTransparency('webp')).toBe(false);
    expect(losesTransparency('pdf')).toBe(false);
  });
});

describe('pdfPlacement fit', () => {
  it('makes the page the size of the image', () => {
    expect(pdfPlacement(800, 600, 'fit')).toEqual({
      pageWidth: 800,
      pageHeight: 600,
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    });
  });
  it('scales down a page that exceeds the PDF limit, keeping proportions', () => {
    const p = pdfPlacement(MAX_PDF_SIDE * 2, MAX_PDF_SIDE, 'fit');
    expect(p.pageWidth).toBe(MAX_PDF_SIDE);
    expect(p.pageHeight).toBe(MAX_PDF_SIDE / 2);
  });
});

describe('pdfPlacement a4', () => {
  it('uses portrait for a tall image and centres it inside the margin', () => {
    const p = pdfPlacement(1000, 2000, 'a4');
    expect(p.pageWidth).toBe(A4.width);
    expect(p.pageHeight).toBe(A4.height);
    expect(p.x).toBeGreaterThanOrEqual(A4_MARGIN - 1e-9);
    expect(p.y).toBeGreaterThanOrEqual(A4_MARGIN - 1e-9);
    expect(p.x + p.width).toBeLessThanOrEqual(A4.width - A4_MARGIN + 1e-9);
    expect(p.y + p.height).toBeLessThanOrEqual(A4.height - A4_MARGIN + 1e-9);
    expect(p.width / p.height).toBeCloseTo(0.5, 6);
  });
  it('uses landscape for a wide image', () => {
    const p = pdfPlacement(2000, 1000, 'a4');
    expect(p.pageWidth).toBe(A4.height);
    expect(p.pageHeight).toBe(A4.width);
    expect(p.width / p.height).toBeCloseTo(2, 6);
  });
  it('enlarges a small image to fill the page area', () => {
    const p = pdfPlacement(10, 10, 'a4');
    expect(p.width).toBeGreaterThan(400);
    expect(p.width).toBe(p.height);
  });
});
