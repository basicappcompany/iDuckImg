import { expect, test } from '@playwright/test';

const TOOL_PATHS = [
  '/compress-image/',
  '/resize-image/',
  '/crop-image/',
  '/add-watermark-to-image/',
  '/add-logo-to-image/',
  '/exam-photo-resizer/',
  '/convert-image/',
  '/image-to-pdf/',
  '/rotate-image/',
  '/remove-exif-data/',
  '/circle-crop-image/',
  '/split-image-into-grid/',
  '/add-text-to-image/',
  '/pixel-art-maker/',
  '/merge-images/',
  '/blur-image/',
  '/pixel-to-cm-converter/',
  '/aspect-ratio-calculator/',
  '/adjust-image-colors/',
  '/add-border-to-image/',
  '/color-picker-from-image/',
  '/color-palette-generator/',
  '/image-to-base64/',
  '/favicon-generator/',
];

test.describe('unknown addresses', () => {
  for (const path of ['/this-page-does-not-exist/', '/compress-imagess/', '/crop-image/extra/segments', '/humans.txt']) {
    test(`${path} is a real 404, not the home page`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nothing here.');
      await expect(page.getByText('Error 404')).toBeVisible();
    });
  }

  test('the 404 page stays out of search results and helps people find a tool', async ({ page }) => {
    await page.goto('/nope/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    const links = await page
      .getByRole('region', { name: 'Tools' })
      .getByRole('link')
      .evaluateAll((a) => a.map((x) => new URL((x as HTMLAnchorElement).href).pathname));
    expect(links).toEqual(TOOL_PATHS);
    await page.getByRole('link', { name: 'Go to the home page' }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Images, sorted.');
  });

  test('real pages still answer 200', async ({ request }) => {
    for (const path of ['/', ...TOOL_PATHS]) expect((await request.get(path)).status(), path).toBe(200);
  });

  test('the sitemap does not list the 404 page', async ({ request }) => {
    const body = await (await request.get('/sitemap-0.xml')).text();
    expect(body).not.toContain('404');
  });

  test.describe('on a phone', () => {
    test.use({ viewport: { width: 375, height: 700 } });

    test('the 404 page does not scroll sideways', async ({ page }) => {
      await page.goto('/nope/');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
});

test.describe('robots.txt', () => {
  test('is plain text that allows crawling and points to the sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/plain');
    const body = await response.text();
    expect(body).toContain('User-agent: *');
    expect(body).toContain('Allow: /');
    expect(body).not.toMatch(/^Disallow:\s*\/\s*$/m); // never block the whole site by accident
    expect(body).toContain('Sitemap: https://iduckimg.com/sitemap-index.xml');
  });

  test('the sitemap it points to exists', async ({ request }) => {
    expect((await request.get('/sitemap-index.xml')).status()).toBe(200);
  });
});
