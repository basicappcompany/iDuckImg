import { describe, expect, it } from 'vitest';
import { MIN_PLANNED_TOOLS, PLAN, PLAN_CATEGORIES, planByCategory, planCounts } from '../../src/lib/tool-plan';
import { TOOLS, TOOL_GROUPS } from '../../src/lib/tools';

describe('the master tool plan', () => {
  it('plans at least 50 tools', () => {
    expect(PLAN.length).toBeGreaterThanOrEqual(MIN_PLANNED_TOOLS);
    expect(planCounts().total).toBe(PLAN.length);
  });

  it('has unique ids and a use for every entry', () => {
    expect(new Set(PLAN.map((p) => p.id)).size).toBe(PLAN.length);
    expect(new Set(PLAN.map((p) => p.title)).size).toBe(PLAN.length);
    for (const p of PLAN) {
      expect(p.title.length, p.id).toBeGreaterThan(3);
      expect(p.summary.length, p.id).toBeGreaterThan(15);
    }
  });

  describe('URLs are meaningful', () => {
    it('every id is lowercase words joined by hyphens, short and free of filler', () => {
      for (const { id } of PLAN) {
        expect(id, id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)+$/);
        expect(id.length, id).toBeLessThanOrEqual(40);
        expect(id, id).not.toMatch(/(^|-)(tool|tools|online|free|best|app|page)(-|$)/);
      }
    });

    it('every id contains a word people search for', () => {
      const words = /image|photo|picture|pdf|png|jpg|gif|svg|qr|ocr|exif|favicon|base64|meme|collage|watermark|signature|color|palette|aspect|pixel|background|border|sketch|ascii|alt|text|handwriting|caption|prompt|product|sticker|scanner|faces|duplicate|compare|crop|rotate|resize|compress|convert|merge|split|blur|passport|exam|id-|social/;
      for (const { id } of PLAN) expect(id, id).toMatch(words);
    });
  });

  describe('categories', () => {
    it('has 7 categories, each used, with nothing left over', () => {
      const names = PLAN_CATEGORIES.map((c) => c.id);
      expect(new Set(names).size).toBe(names.length);
      expect(names).toHaveLength(7);
      for (const p of PLAN) expect(names, p.id).toContain(p.category);
      for (const c of planByCategory()) expect(c.tools.length, c.category.id).toBeGreaterThanOrEqual(6);
      expect(planByCategory().reduce((n, c) => n + c.tools.length, 0)).toBe(PLAN.length);
    });

    it('the groups shown in the sidebar are real categories of the plan', () => {
      const names = PLAN_CATEGORIES.map((c) => c.id);
      for (const g of TOOL_GROUPS) expect(names, g).toContain(g);
    });
  });

  describe('live tools are real', () => {
    const live = PLAN.filter((p) => p.status === 'live');

    it('every live entry exists in the tool list with the same address, title and category', () => {
      for (const p of live) {
        const tool = TOOLS.find((x) => x.slug === p.id);
        expect(tool, `${p.id} is marked live but has no page`).toBeDefined();
        expect(tool!.group, p.id).toBe(p.category);
        expect(tool!.name, p.id).toBe(p.title);
      }
    });

    it('every tool that exists is marked live in the plan', () => {
      expect(live.map((p) => p.id).sort()).toEqual(TOOLS.map((t) => t.slug).sort());
    });
  });

  it('planned tools that depend on AI keys or models say what to check first', () => {
    for (const p of PLAN) {
      if (p.engine === 'your-ai-key') expect(p.check, p.id).toMatch(/security policy/);
      if (p.engine === 'local-model' && p.status !== 'live') expect(p.check, p.id).toBeTruthy();
    }
  });

  it('the AI tools wait; the cheap ones are ready to build', () => {
    for (const p of PLAN.filter((x) => x.engine === 'your-ai-key')) expect(p.status, p.id).toBe('later');
    expect(planCounts().live).toBe(24);
    expect(planCounts().next).toBeGreaterThanOrEqual(10);
  });
});
