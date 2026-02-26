import { expect, test } from '@playwright/test';

test('Auto waiting for button to click', async ({ page }) => {
  await page.goto('/practice/delayed-elements-and-delayed-result-1.html');
  await page.getByTestId('dti-button-element-1').click();
  await expect(page.getByTestId('dti-results')).toHaveText('You clicked the button!');
});

test('Auto waiting for button to click (Delayed)', async ({ page }) => {
  await page.goto('/practice/delayed-elements-and-delayed-result-2.html');
  await page.getByTestId('dti-button-element-2').click({ timeout: 8_000 });
  await expect(page.getByTestId('dti-results')).toHaveText('You clicked the button! (Delayed)', { timeout: 8_000 });
});
