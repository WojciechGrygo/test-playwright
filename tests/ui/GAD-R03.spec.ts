import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { generateUserData } from '../../src/utils/generator';
import test from '@playwright/test';

let randomUserData;
let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  randomUserData = generateUserData(); // Generate user data
  registerPage = new RegisterPage(page);
});

test('@GAD-R03-01 User can register to the service using required fields', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await registerPage.goto();
  await registerPage.fillForm(randomUserData);
  await registerPage.clickRegisterButton();
  await registerPage.verifyAlertPopup('User created');
  await loginPage.verifyPageTitle();
});

test('@GAD-R03-02 When user provide incorrect email, message "Please provide a valid email address" is presented', async () => {
  randomUserData.email = 'invalidEmail'; // Set an invalid email

  await registerPage.goto();
  await registerPage.fillForm(randomUserData);
  await registerPage.clickRegisterButton();
  await registerPage.verifyEmailError('Please provide a valid email address');
});
