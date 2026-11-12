import { expect, test } from '@playwright/test';

test.describe('ask the helper', () => {
  test('is in the sidebar, stays out of search results, and answers with a tool that opens', async ({ page, request }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Ask the helper' }).click();
    await expect(page).toHaveURL(/\/chat\/$/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    expect(await (await request.get('/sitemap-0.xml')).text()).not.toContain('/chat/');

    const log = page.getByRole('log', { name: 'Conversation with the helper' });
    await expect(log).toContainText('I am Duck');
    await page.waitForLoadState('networkidle');
    await page.getByLabel('Describe what you want to do').fill('make my photo under 100 KB');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(log.getByText('make my photo under 100 KB')).toBeVisible();
    const card = log.getByRole('link', { name: /Compress image to 100 KB/ });
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(/\/compress-image-to-100kb\/$/);
  });

  test('a starter chip sends itself, and the safety answer links to the privacy policy', async ({ page }) => {
    await page.goto('/chat/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Is my picture safe?' }).click();
    const log = page.getByRole('log', { name: 'Conversation with the helper' });
    await expect(log.getByRole('link', { name: 'Privacy policy' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send' })).toBeDisabled(); // the box is empty again
  });

  test('Ctrl K lists it too', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.keyboard.press('Control+k');
    await page.getByRole('combobox', { name: /Search tools, pages and actions/ }).fill('helper');
    await expect(page.getByRole('dialog', { name: 'Search' }).getByRole('option', { name: /Ask the helper/ })).toBeVisible();
  });
});
