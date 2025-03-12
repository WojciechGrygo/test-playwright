import { Page, expect } from '@playwright/test';

export class Helpers {
  constructor(private page: Page) {}

  async verifyPageTitle(url: string, title: string) {
    await this.page.goto(url);
    const pageTitle = await this.page.title();
    expect(pageTitle).toContain(title);
  }
}
