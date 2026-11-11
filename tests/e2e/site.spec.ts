import { expect, test, type Page } from '@playwright/test';

/** Same order as the sidebar and the homepage: grouped. */
const GROUPS: Record<string, string[]> = {
  'Shrink & resize': ['/compress-image/', '/resize-image/', '/crop-image/', '/exam-photo-resizer/'],
  'Convert & combine': ['/convert-image/', '/image-to-pdf/'],
  'Fix & clean': ['/rotate-image/', '/remove-exif-data/'],
};
const TOOL_PATHS = Object.values(GROUPS).flat();
const groupOf = (path: string) => Object.entries(GROUPS).find(([, paths]) => paths.includes(path))![0];

const hrefs = (_page: Page, selector: ReturnType<Page['locator']>) =>
  selector.evaluateAll((links) => links.map((a) => new URL((a as HTMLAnchorElement).href).pathname));

const TOGGLE = 'Switch between light and dark mode';
const LIGHT_BG = 'rgb(255, 253, 245)';
const DARK_BG = 'rgb(18, 18, 18)';
const bodyBackground = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe('site', () => {
  test('the homepage lists every tool by group and no longer says coming soon', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Images, sorted.');
    await expect(page.getByText(/coming soon/i)).toHaveCount(0);
    expect(await hrefs(page, page.getByRole('region', { name: 'Tools' }).getByRole('link'))).toEqual(TOOL_PATHS);
    for (const group of Object.keys(GROUPS)) await expect(page.getByRole('heading', { name: group })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Common questions' }).locator('details')).toHaveCount(5);
  });

  for (const path of TOOL_PATHS) {
    test(`${path} has a canonical link, the sidebar, a quick answer, and links to its group`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://iduckimg.com${path}`);

      const sidebar = page.getByRole('navigation', { name: 'Tools' });
      expect(await hrefs(page, sidebar.getByRole('link').filter({ hasNotText: 'iDuckPDF' }))).toEqual(['/', ...TOOL_PATHS]);
      await expect(sidebar.locator('a[aria-current="page"]')).toHaveAttribute('href', path);

      await expect(page.getByRole('region', { name: 'Quick answer' })).toContainText('To ');
      await expect(page.getByText('Runs in your browser').first()).toBeVisible();

      const group = groupOf(path);
      const more = page.getByRole('navigation', { name: `More in ${group}` });
      const mates = GROUPS[group]!.filter((p) => p !== path);
      expect(await hrefs(page, more.getByRole('link'))).toEqual(mates);
    });
  }

  test('the sitemap lists the homepage and every tool', async ({ request }) => {
    const index = await request.get('/sitemap-index.xml');
    expect(index.ok()).toBe(true);
    const body = await (await request.get('/sitemap-0.xml')).text();
    for (const path of ['/', ...TOOL_PATHS]) expect(body).toContain(`https://iduckimg.com${path}`);
  });

  test('keyboard users can skip straight to the tool', async ({ page }) => {
    await page.goto('/compress-image/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to the tool' });
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute('href', '#main');
    await expect(skip).toBeInViewport();
  });

  test.describe('light and dark', () => {
    test.use({ colorScheme: 'light' });

    test('the toggle switches the theme and the choice is remembered', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.*/);
      expect(await bodyBackground(page)).toBe(LIGHT_BG);

      await page.getByRole('button', { name: TOGGLE }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      expect(await bodyBackground(page)).toBe(DARK_BG);
      await expect(page.getByRole('button', { name: TOGGLE })).toHaveAttribute('aria-pressed', 'true');

      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      expect(await bodyBackground(page)).toBe(DARK_BG);

      await page.getByRole('button', { name: TOGGLE }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
      expect(await bodyBackground(page)).toBe(LIGHT_BG);
    });

    test('a saved choice is applied before the page is drawn, so there is no flash', async ({ page }) => {
      await page.addInitScript(() => localStorage.setItem('duck.theme', 'dark'));
      await page.goto('/crop-image/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      expect(await bodyBackground(page)).toBe(DARK_BG);
    });

    test('a broken storage does not break the page', async ({ page }) => {
      await page.addInitScript(() => {
        Object.defineProperty(window, 'localStorage', { get: () => { throw new Error('blocked'); } });
      });
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await page.getByRole('button', { name: TOGGLE }).click(); // still switches for this visit
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });
  });

  test.describe('system dark mode', () => {
    test.use({ colorScheme: 'dark' });

    test('follows the system setting until the visitor chooses', async ({ page }) => {
      await page.goto('/');
      expect(await bodyBackground(page)).toBe(DARK_BG);
      await page.getByRole('button', { name: TOGGLE }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
      expect(await bodyBackground(page)).toBe(LIGHT_BG);
    });
  });

  test.describe('search', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('the sidebar search filters tools by words in their name or keywords', async ({ page }) => {
      await page.goto('/');
      const search = page.getByLabel('Search tools');
      const visibleTools = page.locator('#sidebar [data-tool]:not([hidden])');
      await expect(visibleTools).toHaveCount(TOOL_PATHS.length);

      await search.fill('heic');
      await expect(visibleTools).toHaveCount(1);
      await expect(visibleTools.first()).toContainText('Convert images');
      // Group headings with nothing left are hidden too.
      await expect(page.locator('#sidebar [data-group]:not([hidden])')).toHaveCount(1);

      await search.fill('pdf');
      expect(await hrefs(page, visibleTools.getByRole('link'))).toEqual(['/convert-image/', '/image-to-pdf/']);

      await search.fill('qqqqq');
      await expect(page.getByText('No tool matches that. Try "pdf"').first()).toBeVisible();
      await expect(visibleTools).toHaveCount(0);
    });

    test('Enter opens the first match', async ({ page }) => {
      await page.goto('/');
      await page.getByLabel('Search tools').fill('signature');
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/\/exam-photo-resizer\/$/);
    });

    test('Ctrl K jumps to the search box from anywhere', async ({ page }) => {
      await page.goto('/rotate-image/');
      await page.keyboard.press('Control+k');
      await expect(page.getByLabel('Search tools')).toBeFocused();
    });

    test('the homepage search box filters the cards', async ({ page }) => {
      await page.goto('/');
      await page.getByLabel('Find a tool').fill('exif');
      const cards = page.locator('[data-card]:not([hidden])');
      await expect(cards).toHaveCount(1);
      await expect(cards.first()).toContainText('Remove EXIF data');
      await page.getByLabel('Find a tool').fill('zzzz');
      await expect(page.getByText('No tool matches that. Try "pdf", "heic" or "resize".').last()).toBeVisible();
      await page.getByLabel('Find a tool').fill('');
      await expect(page.locator('[data-card]:not([hidden])')).toHaveCount(TOOL_PATHS.length);
    });
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

    test('the menu opens as a drawer, closes with Escape, and a link opens its tool', async ({ page }) => {
      await page.goto('/');
      const menu = page.getByRole('button', { name: 'Open the menu' });
      await expect(page.locator('#sidebar')).not.toBeInViewport();
      await menu.click();
      await expect(page.locator('#sidebar')).toBeInViewport();
      await expect(menu).toHaveAttribute('aria-expanded', 'true');

      await page.keyboard.press('Escape');
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      await expect(page.locator('#sidebar')).not.toBeInViewport();

      await menu.click();
      await page.locator('#sidebar').getByRole('link', { name: 'Rotate and flip' }).click();
      await expect(page).toHaveURL(/\/rotate-image\/$/);
    });

    test('the search button opens the drawer with the search box ready', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: 'Open search' }).click();
      await expect(page.locator('#sidebar')).toBeInViewport();
      await expect(page.locator('#tool-search')).toBeFocused();
    });
  });
});
