import { expect, test } from '@playwright/test';
import { addFiles, makeImage, readResults } from './helpers';

test.describe('landing pages', () => {
  test('compress image to 100 KB produces a file of 100 KB or less at the same pixel size', async ({ page }) => {
    await page.goto('/compress-image-to-100kb/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Compress image to 100 KB');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'photo.jpg', 1600, 1200)]);
    await page.getByRole('button', { name: 'Resize', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.size).toBeLessThanOrEqual(100 * 1024);
    expect([r!.width, r!.height]).toEqual([1600, 1200]);
  });

  test('PNG to JPG converts to a real JPG without touching any option', async ({ page }) => {
    await page.goto('/png-to-jpg/');
    await addFiles(page, [await makeImage(page, 'image/png', 'logo.png', 600, 400)]);
    await page.getByRole('button', { name: 'Convert', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.type).toBe('image/jpeg');
    expect(r!.name).toBe('logo.jpg');
    expect([r!.width, r!.height]).toEqual([600, 400]);
  });

  test('JPG to PDF makes a PDF', async ({ page }) => {
    await page.goto('/jpg-to-pdf/');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'scan.jpg', 600, 400)]);
    await page.getByRole('button', { name: 'Convert', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.head).toBe('%PDF-');
  });

  test('every shortcut page has its answer, steps, questions, structured data and links to real pages', async ({ page, request }) => {
    // Visits every shortcut page in turn, so the time grows with the page list; 90 s was too tight.
    test.setTimeout(300_000);
    const hub = await page.goto('/image-tools/');
    expect(hub?.status()).toBe(200);
    const paths = await page
      .getByRole('region', { name: 'Shortcuts' })
      .getByRole('link')
      .evaluateAll((links) => links.map((a) => new URL((a as HTMLAnchorElement).href).pathname));
    expect(paths.length).toBeGreaterThanOrEqual(10);

    for (const path of paths) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://iduckimg.com${path}`);
      await expect(page.getByRole('region', { name: 'Quick answer' })).toContainText('To ');
      await expect(page.getByRole('region', { name: 'Common questions' }).locator('details').first()).toBeVisible();
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://iduckimg.com/og.png');
      const types = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
        els.map((e) => JSON.parse(e.textContent ?? '{}')['@type']),
      );
      expect(types, path).toEqual(expect.arrayContaining(['WebApplication', 'BreadcrumbList', 'HowTo', 'FAQPage']));
      // No dead links in the related list.
      const related = await page
        .getByRole('navigation', { name: 'Related tools' })
        .getByRole('link')
        .evaluateAll((links) => links.map((a) => new URL((a as HTMLAnchorElement).href).pathname));
      for (const href of related) expect((await request.get(href)).status(), `${path} -> ${href}`).toBe(200);
    }
  });

  test('privacy, terms, llms.txt and robots.txt exist; forms and settings stay out of the sitemap', async ({ request }) => {
    for (const path of ['/privacy/', '/terms/', '/image-tools/', '/about/']) {
      expect((await request.get(path)).status(), path).toBe(200);
    }
    const llms = await (await request.get('/llms.txt')).text();
    expect(llms).toContain('/heic-to-jpg/');
    expect(llms).toContain('/compress-image/');
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('GPTBot');
    expect(robots).toContain('Sitemap: https://iduckimg.com/sitemap-index.xml');
    const sitemap = await (await request.get('/sitemap-0.xml')).text();
    for (const path of ['/heic-to-jpg/', '/compress-image-to-100kb/', '/privacy/', '/terms/', '/image-tools/']) {
      expect(sitemap).toContain(`https://iduckimg.com${path}`);
    }
    for (const path of ['/feedback/', '/request/', '/settings/']) expect(sitemap).not.toContain(path);
  });
});

test.describe('quick tools in the sidebar', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('the section and each sub-category open and close, and the current page opens its own', async ({ page }) => {
    await page.goto('/heic-to-jpg/');
    const quick = page.getByRole('navigation', { name: 'Quick tools' });
    // The sub-category holding this page is open and marks the page; the others are closed.
    await expect(quick.getByRole('link', { name: 'HEIC to JPG' })).toBeVisible();
    await expect(quick.getByRole('link', { name: 'HEIC to JPG' })).toHaveAttribute('aria-current', 'page');
    await expect(quick.getByRole('link', { name: 'Compress image to 100 KB' })).toBeHidden();

    await quick.getByRole('button', { name: 'Compress & resize' }).click();
    await expect(quick.getByRole('link', { name: 'Compress image to 100 KB' })).toBeVisible();
    await quick.getByRole('button', { name: 'Compress & resize' }).click();
    await expect(quick.getByRole('link', { name: 'Compress image to 100 KB' })).toBeHidden();

    // The whole section folds away and comes back.
    await quick.getByRole('button', { name: /Quick tools/ }).click();
    await expect(quick.getByRole('button', { name: 'Convert a format' })).toBeHidden();
    await quick.getByRole('button', { name: /Quick tools/ }).click();
    await expect(quick.getByRole('button', { name: 'Convert a format' })).toBeVisible();
  });
});
