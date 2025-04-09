import { expect, test } from '@playwright/test';

test.describe('Verify articles API endpoint @GAD-R08-01 @api', () => {
  const articlesEndpoint = '/api/articles';

  test('GET articles returns 200', async ({ request }) => {
    const response = await request.get(articlesEndpoint);
    expect(response.status()).toBe(200);
  });

  test('GET articles should return at least one article', async ({ request }) => {
    const response = await request.get(articlesEndpoint);
    const responseJson = await response.json();
    expect(responseJson.length).toBeGreaterThanOrEqual(10);
  });

  test('GET articles should return object', async ({ request }) => {
    const response = await request.get(articlesEndpoint);
    const responseJson = await response.json();
    const article = responseJson[0];

    const expectedRequiredFields = ['id', 'title', 'user_id', 'body', 'date', 'image'];
    expectedRequiredFields.forEach((field) => {
      expect.soft(article, `Expected field "${field}" should be in object`).toHaveProperty(field);
    });
  });
});
