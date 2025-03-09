import { Page, expect } from '@playwright/test';

export class WelcomePage {
  welcomeMessage = this.page.getByTestId('hello');

  constructor(private page: Page) {}

  async verifySuccessfulLogin(username: string) {
    await expect(this.welcomeMessage).toContainText(`Hi ${username}!`);
    await expect(this.page).toHaveTitle('🦎 GAD | Welcome');
  }
}
