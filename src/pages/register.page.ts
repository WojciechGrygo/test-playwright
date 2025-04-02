import { Page, expect } from '@playwright/test';

export class RegisterPage {
  url = '/register.html';
  emailError = this.page.locator('#octavalidate_email');

  constructor(private page: Page) {}

  async clickRegisterButton() {
    await this.page.getByTestId('register-button').click();
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillForm(user) {
    await this.page.getByTestId('firstname-input').fill(user.firstName);
    await this.page.getByTestId('lastname-input').fill(user.lastName);
    await this.page.getByTestId('email-input').fill(user.email);
    await this.page.getByTestId('password-input').fill(user.password);
  }

  async verifyAlertPopup(expectedText: string) {
    await expect(this.page.getByTestId('alert-popup')).toHaveText(expectedText);
  }

  async verifyEmailError(expectedText: string) {
    await expect(this.emailError).toHaveText(expectedText);
  }
}
