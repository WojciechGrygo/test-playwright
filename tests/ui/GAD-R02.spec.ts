import { LoginPage } from '../../pages/login.page';
import { WelcomePage } from '../../pages/welcome.page';
import { test } from '@playwright/test';

test.describe('Login Page', () => {
  let loginPage: LoginPage;
  let welcomePage: WelcomePage;

  const user = {
    email: process.env.EMAIL!,
    password: process.env.PASSWORD!,
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
    await loginPage.goto();
  });

  test('@GAD-R02-01 User can login using login page', async () => {
    await loginPage.login(user.email, user.password);
    await welcomePage.verifySuccessfulLogin(user.email);
  });

  test('login with remember me checked', async () => {
    await loginPage.login(user.email, user.password, true);
    await welcomePage.verifySuccessfulLogin(user.email);
  });

  test('failed login with invalid email', async () => {
    await loginPage.login('invalid@email.com', user.password);
    await loginPage.verifyUnsuccessfulLogin();
  });

  test('failed login with invalid password', async () => {
    await loginPage.login(user.email, 'wrongPassword');
    await loginPage.verifyUnsuccessfulLogin();
  });

  test('failed login with empty fields', async () => {
    await loginPage.loginButton.click();
    await loginPage.verifyUnsuccessfulLogin();
  });
});
