import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { test } from '@playwright/test';

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

// Add tags to the test cases

test('User can login using login page @GAD-R02-01', async () => {
  await loginPage.login(user.email, user.password);
  await welcomePage.verifySuccessfulLogin(user.email);
});

test('Login with remember me checked @GAD-R02-02', async () => {
  await loginPage.login(user.email, user.password, true);
  await welcomePage.verifySuccessfulLogin(user.email);
});

test('Failed login with invalid email @GAD-R02-03', async () => {
  await loginPage.login('invalid@email.com', user.password);
  await loginPage.verifyUnsuccessfulLogin();
});

test('Failed login with invalid password @GAD-R02-04', async () => {
  await loginPage.login(user.email, 'wrongPassword');
  await loginPage.verifyUnsuccessfulLogin();
});

test('Failed login with empty fields @GAD-R02-05', async () => {
  await loginPage.loginButton.click();
  await loginPage.verifyUnsuccessfulLogin();
});
