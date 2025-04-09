import { expect, test } from '@playwright/test';

test.describe('Verify comments API endpoint', () => {
  const commentsEndpoint = '/api/comments';

  test('GET comments returns status code 200', async ({ request }) => {
    const response = await request.get(commentsEndpoint);
    expect(response.status()).toBe(200);
  });

  test('GET comments should return at least one comment', async ({ request }) => {
    const response = await request.get(commentsEndpoint);
    const responseJson = await response.json();
    expect(responseJson.length).toBeGreaterThanOrEqual(1);
  });

  test('GET comments return comment object', async ({ request }) => {
    const response = await request.get(commentsEndpoint);
    const responseJson = await response.json();
    const comment = responseJson[0];

    const expectedRequiredFields = ['id', 'article_id', 'user_id', 'body', 'date'];
    expectedRequiredFields.forEach((field) => {
      expect.soft(comment, `Expected field "${field}" should be in object`).toHaveProperty(field);
    });
  });
});
