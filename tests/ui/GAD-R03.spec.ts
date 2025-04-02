import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { generateUserData } from '../../src/utils/generator';
import test from '@playwright/test';

let user;
let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  user = generateUserData(); // Generate user data
  registerPage = new RegisterPage(page);
});

test('User can register to the service using required fields @GAD-R03-01', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await registerPage.goto();
  await registerPage.fillForm(user);
  await registerPage.clickRegisterButton();
  await registerPage.verifyAlertPopup('User created');
  await loginPage.verifyPageTitle();
});

test('When user provide incorrect email, message "Please provide a valid email address" is presented @GAD-R03-04', async () => {
  user.email = 'invalidEmail'; // Set an invalid email

  await registerPage.goto();
  await registerPage.fillForm(user);
  await registerPage.clickRegisterButton();
  await registerPage.verifyEmailError('Please provide a valid email address');
});
