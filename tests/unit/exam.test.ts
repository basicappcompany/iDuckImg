import { describe, expect, it } from 'vitest';
import { EXAMS, describeRequirements, findExam, validatePresets, type ExamPreset } from '../../src/lib/exam-presets';
import { checkOptions, kbToBytes, outputName, planFit, presetOptions, type ExamOptions } from '../../src/tools/exam/options';
import { padJpegToMinimum } from '../../src/tools/exam/jpeg-pad';
import { stripJpeg } from '../../src/tools/exam/../exif/strip';
import { syntheticJpeg } from '../helpers/exif-builders';

describe('preset data', () => {
  it('passes the evidence rules: https source, location, read date, sane numbers', () => {
    expect(validatePresets(EXAMS)).toEqual([]);
  });

  it('matches the official documents it was copied from (guards against accidental edits)', () => {
    const ibps = findExam('ibps-po-xv')!;
    const pick = (id: string) => {
      const d = ibps.documents.find((x) => x.id === id)!;
      return [d.width, d.height, d.minKb, d.maxKb];
    };
    expect(pick('photo')).toEqual([200, 230, 20, 50]);
    expect(pick('signature')).toEqual([140, 60, 10, 20]);
    expect(pick('left-thumb')).toEqual([240, 240, 20, 50]);
    expect(pick('declaration')).toEqual([800, 400, 50, 100]);
    expect(ibps.source.url).toBe('https://www.ibps.in/wp-content/uploads/Detailed-Notification_CRP-PO-XV.pdf');

    const ssc = findExam('ssc-cgl-2026')!;
    expect(ssc.documents.map((d) => d.id)).toEqual(['signature']);
    const sig = ssc.documents[0]!;
    // The notice gives centimetres only, so no pixel size is claimed.
    expect([sig.width, sig.height, sig.minKb, sig.maxKb]).toEqual([null, null, 10, 20]);
    expect(sig.physical).toContain('6.0 cm x 2.0 cm');
  });

  const base: ExamPreset = {
    country: 'IN',
    id: 'x',
    name: 'X',
    cycle: 'c',
    source: { title: 't', url: 'https://example.org/a.pdf', location: 'p1', retrieved: '2026-01-01' },
    documents: [{ id: 'd', name: 'D', width: 10, height: 10, minKb: 1, maxKb: 2, fit: 'crop' }],
  };

  it('accepts a minimal valid preset', () => {
    expect(validatePresets([base])).toEqual([]);
  });

  it('rejects a preset with no evidence', () => {
    expect(validatePresets([{ ...base, source: { ...base.source, url: 'http://example.org' } }])).toEqual(
      expect.arrayContaining([expect.stringContaining('https')]),
    );
    expect(validatePresets([{ ...base, source: { ...base.source, retrieved: 'yesterday' } }])).toEqual(
      expect.arrayContaining([expect.stringContaining('YYYY-MM-DD')]),
    );
    expect(validatePresets([{ ...base, source: { ...base.source, location: '' } }])).not.toEqual([]);
    expect(validatePresets([{ ...base, cycle: '' }])).not.toEqual([]);
  });

  it('rejects impossible numbers and half-given sizes', () => {
    const doc = base.documents[0]!;
    expect(validatePresets([{ ...base, documents: [{ ...doc, minKb: 5, maxKb: 2 }] }])).not.toEqual([]);
    expect(validatePresets([{ ...base, documents: [{ ...doc, width: 10, height: null }] }])).not.toEqual([]);
    expect(validatePresets([{ ...base, documents: [{ ...doc, width: 1.5 }] }])).not.toEqual([]);
    expect(validatePresets([base, base])).not.toEqual([]); // duplicate id
  });
});

describe('describeRequirements', () => {
  it('writes size and KB range', () => {
    expect(describeRequirements({ id: 'a', name: 'a', width: 200, height: 230, minKb: 20, maxKb: 50, fit: 'crop' })).toBe(
      '200 x 230 px, 20 to 50 KB, JPG',
    );
    expect(describeRequirements({ id: 'a', name: 'a', width: null, height: null, minKb: null, maxKb: 20, fit: 'pad' })).toBe(
      'up to 20 KB, JPG',
    );
  });
});

describe('planFit', () => {
  const t = { width: 200, height: 230 };

  it('stretch goes straight to the target', () => {
    expect(planFit({ width: 1600, height: 1200 }, t, 'stretch')).toEqual({
      resizeTo: t,
      offset: { x: 0, y: 0 },
      canvas: t,
    });
  });

  it('crop covers the target and centres the cut', () => {
    const p = planFit({ width: 1600, height: 1200 }, t, 'crop');
    expect(p.resizeTo.height).toBe(230); // height is the limiting side
    expect(p.resizeTo.width).toBeGreaterThan(200);
    expect(p.resizeTo.width).toBe(Math.round(1600 * (230 / 1200)));
    expect(p.offset.x).toBe(Math.floor((p.resizeTo.width - 200) / 2));
    expect(p.offset.y).toBe(0);
    expect(p.canvas).toEqual(t);
  });

  it('crop never ends up smaller than the target, even with rounding', () => {
    for (const [w, h] of [[1000, 999], [333, 1000], [1, 1], [10_000, 3]] as const) {
      const p = planFit({ width: w, height: h }, { width: 140, height: 60 }, 'crop');
      expect(p.resizeTo.width).toBeGreaterThanOrEqual(140);
      expect(p.resizeTo.height).toBeGreaterThanOrEqual(60);
      expect(p.offset.x).toBeGreaterThanOrEqual(0);
      expect(p.offset.y).toBeGreaterThanOrEqual(0);
    }
  });

  it('pad fits everything inside the target and centres it', () => {
    const p = planFit({ width: 1600, height: 1200 }, { width: 140, height: 60 }, 'pad');
    expect(p.resizeTo.width).toBeLessThanOrEqual(140);
    expect(p.resizeTo.height).toBeLessThanOrEqual(60);
    expect(p.resizeTo.height).toBe(60); // limited by height
    expect(p.offset.x).toBe(Math.floor((140 - p.resizeTo.width) / 2));
    expect(p.offset.y).toBe(0);
  });

  it('pad of a matching shape needs no bars', () => {
    const p = planFit({ width: 280, height: 120 }, { width: 140, height: 60 }, 'pad');
    expect(p.resizeTo).toEqual({ width: 140, height: 60 });
    expect(p.offset).toEqual({ x: 0, y: 0 });
  });
});

describe('options', () => {
  const ok: ExamOptions = { size: { width: 10, height: 10 }, fit: 'crop', minKb: 1, maxKb: 5, label: 'x' };

  it('checkOptions accepts good options and explains bad ones', () => {
    expect(checkOptions(ok)).toEqual([]);
    expect(checkOptions({ ...ok, maxKb: 0 })).not.toEqual([]);
    expect(checkOptions({ ...ok, minKb: 9 })[0]).toMatch(/minimum/i);
    expect(checkOptions({ ...ok, size: { width: 0, height: 5 } })[0]).toMatch(/whole numbers/);
    expect(checkOptions({ ...ok, size: null, minKb: null })).toEqual([]);
  });

  it('presetOptions copies the preset, with no size when the source gives none', () => {
    const ibps = findExam('ibps-po-xv')!;
    expect(presetOptions(ibps, ibps.documents[0]!)).toEqual({
      size: { width: 200, height: 230 },
      fit: 'crop',
      minKb: 20,
      maxKb: 50,
      label: 'ibps-po-xv-photo',
    });
    const ssc = findExam('ssc-cgl-2026')!;
    expect(presetOptions(ssc, ssc.documents[0]!).size).toBeNull();
  });

  it('names the output and converts KB', () => {
    expect(outputName('me.png', 'ibps-po-xv-photo')).toBe('me-ibps-po-xv-photo.jpg');
    expect(outputName('scan.jpeg', 'x')).toBe('scan-x.jpg');
    expect(kbToBytes(20)).toBe(20_480);
  });
});

describe('padJpegToMinimum', () => {
  const { file } = syntheticJpeg();
  const clean = stripJpeg(file);

  it('leaves a big enough file untouched', () => {
    expect(padJpegToMinimum(clean, clean.length)).toBe(clean);
    expect(padJpegToMinimum(clean, 1)).toBe(clean);
  });

  it('reaches the minimum (overshooting by at most 3 bytes) and keeps the file a valid JPEG', () => {
    for (const min of [clean.length + 1, clean.length + 4, clean.length + 5, 10_240, 70_000, 150_000]) {
      const out = padJpegToMinimum(clean, min);
      expect(out.length).toBeGreaterThanOrEqual(min);
      expect(out.length - min).toBeLessThan(4); // a comment segment is at least 4 bytes
      // Away from the tiny-gap case it is exact.
      if (min - clean.length >= 4) expect(out.length).toBe(min);
      expect([out[0], out[1]]).toEqual([0xff, 0xd8]);
      // Removing the filler gives back the original picture bytes: nothing in the image changed.
      expect(Array.from(stripJpeg(out))).toEqual(Array.from(clean));
    }
  });

  it('rejects non-JPEG input', () => {
    expect(() => padJpegToMinimum(new Uint8Array([1, 2, 3]), 100)).toThrow(/not a valid JPG/);
  });
});
