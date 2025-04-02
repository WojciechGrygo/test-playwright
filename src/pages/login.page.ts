import { Page, expect } from '@playwright/test';

export class LoginPage {
  usernameInput = this.page.getByRole('textbox', { name: 'Enter User Email' });
  passwordInput = this.page.getByRole('textbox', { name: 'Enter Password' });
  loginButton = this.page.getByRole('button', { name: 'LogIn' });
  keepSignInCheckbox = this.page.locator('#keepSignIn');
  registerLink = this.page.getByRole('link', { name: 'Register' });
  errorMessage = this.page.getByTestId('login-error');

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login/');
  }

  async login(username: string, password: string, keepSignedIn: boolean = false) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    if (keepSignedIn) {
      await this.keepSignInCheckbox.check();
    }
    await this.loginButton.click();
  }

  async verifyUnsuccessfulLogin() {
    await expect(this.errorMessage).toContainText('Invalid username or password');
  }

  async verifyPageTitle() {
    await expect(this.page.locator('h2', { hasText: 'Login' })).toBeVisible();
    const title = await this.page.title();
    expect(title).toContain('Login');
  }
}
