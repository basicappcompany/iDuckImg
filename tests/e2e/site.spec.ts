import { expect, test } from '@playwright/test';

const TOOL_PATHS = [
  '/compress-images/',
  '/resize-image/',
  '/convert-image/',
  '/images-to-pdf/',
  '/rotate-image/',
  '/exam-photo-resizer/',
  '/remove-exif-data/',
];

test.describe('site', () => {
  test('the homepage lists every tool and no longer says coming soon', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'iDuckImg' })).toBeVisible();
    await expect(page.getByText(/coming soon/i)).toHaveCount(0);
    const hrefs = await page.getByRole('region', { name: 'Tools' }).getByRole('link').evaluateAll((links) =>
      links.map((a) => new URL((a as HTMLAnchorElement).href).pathname),
    );
    expect(hrefs).toEqual(TOOL_PATHS);
  });

  for (const path of TOOL_PATHS) {
    test(`${path} loads, has a canonical link, a way home, and links to the other tools`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://iduckimg.com${path}`);
      await expect(page.getByRole('link', { name: 'iDuckImg', exact: true })).toHaveAttribute('href', '/');
      const more = page.getByRole('navigation', { name: 'More tools' }).getByRole('link');
      const hrefs = await more.evaluateAll((links) => links.map((a) => new URL((a as HTMLAnchorElement).href).pathname));
      expect(hrefs).toEqual(TOOL_PATHS.filter((p) => p !== path));
    });
  }

  test('the sitemap lists the homepage and every tool', async ({ request }) => {
    const index = await request.get('/sitemap-index.xml');
    expect(index.ok()).toBe(true);
    const sitemap = await request.get('/sitemap-0.xml');
    const body = await sitemap.text();
    for (const path of ['/', ...TOOL_PATHS]) expect(body).toContain(`https://iduckimg.com${path}`);
  });

  test.describe('on a phone', () => {
    test.use({ viewport: { width: 375, height: 700 } });

    for (const path of ['/', ...TOOL_PATHS]) {
      test(`${path} does not scroll sideways`, async ({ page }) => {
        await page.goto(path);
        await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  });
});
