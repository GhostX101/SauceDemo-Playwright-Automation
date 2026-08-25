import { test, expect } from '../Fixtures/test';
import { loginPage } from '../Page/login';

test.only('login with Valid credentials', async ({ page, userData }) => {
  const login = new loginPage(page);
  await page.goto('/');
  await login.setUsername(userData.validUser.username);
  await login.setPassword(userData.validUser.password);
  await login.Clicklogin();
});

test('login with Invalid credentials', async ({ page, userData }) => {
  const login = new loginPage(page);
  await page.goto('/');
  await login.setUsername(userData.invalidUser.username);
  await login.setPassword(userData.invalidUser.password);
  await login.Clicklogin();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});
