import { describe, expect, it } from 'vitest';
import { STARTERS, kbTarget, matchTools, nearestSizePage, respond } from '../../src/lib/helper';
import { TOOLS } from '../../src/lib/tools';
import { LANDING_PAGES } from '../../src/lib/landing';

const slugs = new Set<string>([...TOOLS.map((t) => t.slug), ...LANDING_PAGES.map((p) => p.slug)]);
const first = (text: string) => respond(text).tools[0]?.slug;

describe('the helper', () => {
  it('points plain words at the right tool', () => {
    expect(respond('I want to convert an iPhone photo').tools.map((t) => t.slug)).toContain('heic-to-jpg');
    expect(first('put my name on my photos')).toBe('add-watermark-to-image');
    expect(first('make a round profile picture')).toBe('circle-crop-image');
    expect(first('remove location from my photo')).toBe('remove-exif-data');
    expect(first('turn my photo sideways')).toBe('rotate-image');
    expect(first('cut my picture into 9 pieces for instagram')).toBe('split-image-into-grid');
    expect(first('make it look like pixel art')).toBe('pixel-art-maker');
    expect(first('photo for exam signature')).toBe('exam-photo-resizer');
    expect(first('make a pdf from my photos')).toBeDefined();
  });

  it('handles a size in KB: exact shortcut page, or the nearest plus the resize tool', () => {
    const exact = respond('make my photo under 100 KB');
    expect(exact.tools.map((t) => t.slug)).toEqual(['compress-image-to-100kb']);
    expect(exact.text).toContain('100 KB');
    const near = respond('compress to 150kb');
    expect(near.tools.map((t) => t.slug)).toEqual(['compress-image-to-100kb', 'resize-image']);
    expect(near.text).toContain('150');
    expect(kbTarget('under 75 kb please')).toBe(75);
    expect(kbTarget('no size here')).toBeNull();
    expect(nearestSizePage(30)).toBe(20);
    expect(nearestSizePage(1000)).toBe(200);
    expect(nearestSizePage(150)).toBe(100);
    expect(nearestSizePage(5)).toBe(20);
  });

  it('answers safety, feedback, requests, support and settings with the right links', () => {
    expect(respond('is my picture safe?').links.map((l) => l.href)).toContain('/privacy/');
    expect(respond('something is not working').links.map((l) => l.href)).toContain('/feedback/');
    expect(respond('can you add a collage maker').links.map((l) => l.href)).toContain('/request/');
    expect(respond('how can I donate').links.map((l) => l.href)).toContain('/support/');
    expect(respond('dark mode').links.map((l) => l.href)).toContain('/settings/');
    expect(respond('hello').text).toMatch(/Hi/);
  });

  it('does not treat a normal job as a privacy question', () => {
    expect(respond('resize my photo for upload to a form').text).not.toMatch(/browser tab/);
  });

  it('says so and offers the full list when it does not know', () => {
    const r = respond('qwertyuiop zzzz');
    expect(r.tools).toEqual([]);
    expect(r.links.map((l) => l.href)).toContain('/image-tools/');
  });

  it('only ever links to pages that exist', () => {
    const inputs = [...STARTERS, 'compress', 'resize', 'crop', 'rotate', 'watermark', 'text', 'pdf', 'heic', 'grid', 'circle', 'pixel', 'exif'];
    for (const text of inputs) {
      const r = respond(text);
      for (const t of r.tools) {
        expect(slugs.has(t.slug), `${text} -> ${t.slug}`).toBe(true);
        expect(t.href).toBe(`/${t.slug}/`);
      }
      for (const l of r.links) expect(l.href).toMatch(/^\/[a-z-]+\/$/);
    }
    expect(matchTools('compress', 3).length).toBeLessThanOrEqual(3);
  });

  it('gives every starter an answer', () => {
    for (const s of STARTERS) {
      const r = respond(s);
      expect(r.tools.length + r.links.length, s).toBeGreaterThan(0);
    }
  });
});
