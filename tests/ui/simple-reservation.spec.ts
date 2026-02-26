import { expect, test } from '@playwright/test';

test('Simple reservation with one feature', async ({ page }) => {
  await page.goto('practice/simple-reservation-v1.html');
  await page.getByRole('row', { name: 'Food' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: '23.10.2024' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Assert the expected result
  const expectedResult = 'Reservation for 23.10.2024 with features: Food for total price: 150$';
  await expect(page.getByTestId('dti-results')).toHaveText(expectedResult);
});
