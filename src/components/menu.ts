import { Page } from '@playwright/test';

export class Menu {
  constructor(private page: Page) {}

  async clickArticlesButton() {
    await this.page.getByRole('link', { name: ' Articles Explore and create' }).click();
  }

  async navigateToArticles() {
    await this.page.getByTestId('open-articles').click();
  }

  async navigateToComments() {
    await this.page.getByTestId('open-comments').click();
  }

  async navigateToHome() {
    await this.page.getByRole('link', { name: '🦎 GAD' }).click();
  }
}
