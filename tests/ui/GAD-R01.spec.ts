import { Menu } from '../../components/menu';
import { Helpers } from '../../utils/helpers';
import test, { expect } from '@playwright/test';

const articleText = 'Myth: Testing is only for finding bugs';
const commentText = `I couldn't agree more with the points you've made. This is a must-read for everyone in the field. So good!`;
const homeHeader = 'Explore and create testing content!';

test('@GAD-R01-01 Home page title contains sentence GAD', async ({ page }) => {
  const helpers = new Helpers(page);
  await helpers.verifyPageTitle('/', '🦎 GAD');
});

test('@GAD-R01-02-1 User can access without logging in to Articles page', async ({ page }) => {
  const helpers = new Helpers(page);
  await helpers.verifyPageTitle('/articles.html', 'Articles');
  await expect(page.getByText(articleText)).toBeVisible();
});

test('@GAD-R01-02-2 User can access without logging in to Comments page', async ({ page }) => {
  const helpers = new Helpers(page);
  await helpers.verifyPageTitle('/comments.html', 'Comments');
  await expect(page.getByText(commentText)).toBeVisible();
});

test('@GAD-R01-03 User can use menu buttons to navigate between Articles, Comments and Home page', async ({ page }) => {
  const menu = new Menu(page);
  await page.goto('/');
  await menu.clickLetsStartButton();
  await menu.navigateToComments();
  await expect(page.getByText(commentText)).toBeVisible();
  await menu.navigateToArticles();
  await expect(page.getByText(articleText)).toBeVisible();
  await menu.navigateToHome();
  await expect(page.getByText(homeHeader)).toBeVisible();
});
