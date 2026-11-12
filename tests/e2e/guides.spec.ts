import { expect, test } from '@playwright/test';

const FIRST = '/guides/how-to-compress-an-image/';

/** The @type values of every JSON-LD block on the page. */
async function ldTypes(page: import('@playwright/test').Page): Promise<string[]> {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  return blocks.flatMap((b) => {
    const data = JSON.parse(b);
    return (Array.isArray(data) ? data : [data]).map((d: { '@type': string }) => d['@type']);
  });
}

test.describe('how-to guides', () => {
  test('the hub lists every guide and links to real pages', async ({ page }) => {
    const response = await page.goto('/guides/');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('how-to');
    const links = page.getByRole('list', { name: 'Guides' }).getByRole('link');
    expect(await links.count()).toBe(25);
    expect(await links.evaluateAll((a) => a.map((x) => new URL((x as HTMLAnchorElement).href).pathname))).toContain(FIRST);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://iduckimg.com/guides/');
    expect(await ldTypes(page)).toEqual(expect.arrayContaining(['CollectionPage', 'BreadcrumbList']));
  });

  test('a guide answers first, links to its tool, and carries structured data', async ({ page }) => {
    const response = await page.goto(FIRST);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/How to Compress an Image Without Losing Quality.*iDuckImg/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('How to compress an image without losing quality');
    await expect(page.getByRole('region', { name: 'Quick answer' })).toContainText('To compress an image');
    await expect(page.getByRole('link', { name: /Open Compress images/ })).toHaveAttribute('href', '/compress-image/');
    await expect(page.getByRole('heading', { name: 'Steps' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Common questions' }).locator('details')).toHaveCount(3);
    await expect(page.getByRole('navigation', { name: 'Related guides' }).getByRole('link')).toHaveCount(3);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://iduckimg.com${FIRST}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Shrink JPG, PNG and WebP/);
    expect(await ldTypes(page)).toEqual(expect.arrayContaining(['Article', 'HowTo', 'FAQPage', 'BreadcrumbList']));
    const article = JSON.parse((await page.locator('script[type="application/ld+json"]').allTextContents()).find((t) => t.includes('"Article"'))!);
    const data = Array.isArray(article) ? article.find((a: { '@type': string }) => a['@type'] === 'Article') : article;
    expect(data.author.name).toBe('Basic App Company');
    expect(data.dateModified).toBe('2026-11-12');
  });

  test('every tool page links to its guide, and every guide opens', async ({ page }) => {
    await page.goto('/compress-image/');
    await expect(page.getByRole('link', { name: /Read the guide: How to compress an image/ })).toHaveAttribute('href', FIRST);
    await page.goto('/heic-to-jpg/'); // a landing page shows its parent tool's guide
    await expect(page.getByRole('link', { name: /Read the guide: How to convert images/ })).toBeVisible();

    await page.goto('/guides/');
    const hrefs = await page.getByRole('list', { name: 'Guides' }).getByRole('link').evaluateAll((a) => a.map((x) => (x as HTMLAnchorElement).pathname));
    for (const href of hrefs) {
      const r = await page.request.get(href);
      expect(r.status(), href).toBe(200);
      expect(await r.text(), href).toContain('Quick answer');
    }
  });

  test('is in the sidebar, the footer, the home page and the search window', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'How-to guides' })).toHaveAttribute('href', '/guides/');
    await expect(page.getByRole('region', { name: 'How-to guides' }).getByRole('link').first()).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'How-to guides' })).toBeVisible();
    await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
    await page.keyboard.press('Control+k');
    await page.getByRole('combobox', { name: /Search/ }).fill('how to blur');
    await expect(page.getByRole('option', { name: /How to blur or hide part of an image/ })).toBeVisible();
  });

  test('is listed for crawlers: sitemap, llms.txt and llms-full.txt', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap-0.xml')).text();
    expect(sitemap).toContain('https://iduckimg.com/guides/');
    expect(sitemap).toContain(`https://iduckimg.com${FIRST}`);
    const llms = await (await request.get('/llms.txt')).text();
    expect(llms).toContain('## How-to guides');
    expect(llms).toContain(`https://iduckimg.com${FIRST}`);
    const full = await request.get('/llms-full.txt');
    expect(full.headers()['content-type']).toContain('text/plain');
    const text = await full.text();
    expect(text).toContain('## How to compress an image without losing quality');
    expect(text).toContain('### Common questions');
    expect(text.length).toBeGreaterThan(40_000);
  });

  test('guide pages do not scroll sideways on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    for (const path of ['/guides/', FIRST, '/guides/how-to-resize-a-photo-and-signature-for-an-exam-form/']) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});
