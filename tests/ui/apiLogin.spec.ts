import { loginViaAPI } from '../../utils/auth';
import { expect, test } from '@playwright/test';

test('API Login', async ({ request, page }) => {
  await loginViaAPI(request);
  await page.goto('http://localhost:3000/articles.html');
  await expect(page.getByText('Myth: Testing is only for finding bugs')).toBeVisible();
});
