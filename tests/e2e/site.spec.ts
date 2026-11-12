import { expect, test, type Page } from '@playwright/test';

/** Same order as the sidebar and the homepage: grouped. */
const GROUPS: Record<string, string[]> = {
  'Shrink & resize': ['/compress-image/', '/resize-image/', '/exam-photo-resizer/'],
  'Edit & transform': ['/crop-image/', '/rotate-image/'],
  'Add text & effects': ['/add-watermark-to-image/'],
  'Convert & combine': ['/convert-image/', '/image-to-pdf/'],
  'Privacy & cleanup': ['/remove-exif-data/'],
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

    const dialog = (page: Page) => page.getByRole('dialog', { name: 'Search' });
    const box = (page: Page) => page.getByRole('combobox', { name: /Search tools, pages and actions/ });

    test('Ctrl K opens the search window from anywhere, focuses it, and Esc closes it', async ({ page }) => {
      await page.goto('/rotate-image/');
      await page.waitForLoadState('networkidle');
      await page.keyboard.press('Control+k');
      await expect(dialog(page)).toBeVisible();
      await expect(box(page)).toBeFocused();
      await page.keyboard.press('Control+k');
      await expect(dialog(page)).toBeHidden();
      await page.keyboard.press('Control+k');
      await page.keyboard.press('Escape');
      await expect(dialog(page)).toBeHidden();
    });

    test('"/" opens it too, but not while typing in a field', async ({ page }) => {
      await page.goto('/');
      await page.getByLabel('Find a tool').focus();
      await page.keyboard.type('a/b');
      await expect(dialog(page)).toBeHidden();
      await page.locator('body').click({ position: { x: 5, y: 5 } });
      await page.keyboard.press('/');
      await expect(dialog(page)).toBeVisible();
    });

    test('it groups results, filters by words, moves with the arrows and Enter opens the pick', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Control+k');
      await expect(dialog(page).getByText('Tools', { exact: true })).toBeVisible();
      await expect(dialog(page).getByText('Pages', { exact: true })).toBeVisible();

      await box(page).fill('heic');
      const options = dialog(page).getByRole('option');
      await expect(options.first()).toContainText('Convert images');
      await expect(dialog(page).getByText('Shortcuts', { exact: true })).toBeVisible();
      await expect(options.first()).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press('ArrowDown');
      await expect(options.nth(1)).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/\/convert-image\/$/);
    });

    test('it finds exam signatures, pages and the theme action, and says so when nothing matches', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Control+k');
      await box(page).fill('signature');
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/\/exam-photo-resizer\/$/);
      await page.waitForLoadState('networkidle');

      await page.keyboard.press('Control+k');
      await box(page).fill('privacy');
      await expect(dialog(page).getByRole('option', { name: /Privacy policy/ })).toBeVisible();

      await box(page).fill('dark');
      await dialog(page).getByRole('option', { name: /Switch light \/ dark/ }).click();
      await expect(dialog(page)).toBeHidden();
      await expect(page.locator('html')).toHaveAttribute('data-theme', /light|dark/);

      await page.keyboard.press('Control+k');
      await box(page).fill('qqqqq');
      await expect(dialog(page).getByText('Nothing matches')).toBeVisible();
    });

    test('clicking the dim backdrop closes it', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: 'Open search' }).click();
      await expect(dialog(page)).toBeVisible();
      await page.mouse.click(5, 5);
      await expect(dialog(page)).toBeHidden();
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

    test('the search button opens the search window with the box ready', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: 'Open search' }).click();
      await expect(page.getByRole('dialog', { name: 'Search' })).toBeVisible();
      await expect(page.getByRole('combobox', { name: /Search tools, pages and actions/ })).toBeFocused();
    });
  });
});
