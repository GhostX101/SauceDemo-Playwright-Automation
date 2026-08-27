import { test, expect } from '../Fixtures/test';
import { loginPage } from '../Page/login';

test('verify URL', async ({page, userData}) =>{
  await page.goto('/');
  await expect(page).toHaveURL(/saucedemo/);

});

test('login with Valid credentials', async ({ page, userData }) => {
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
   await login.expectErrorMessage(
        'Epic sadface: Username and password do not match any user in this service'
    );

});

test('login with valid username and wrong password', async ({page, userData})=>{
  const login = new loginPage(page);
    await page.goto ('/')
    await login.setUsername(userData.validUser.username);
    await login.setPassword(userData.invalidUser.password);
    await login.Clicklogin();
    await login.expectErrorMessage(
        'Epic sadface: Username and password do not match any user in this service'
    );
});



test('login with wrong username and valid password', async ({page, userData})=>{
  const login = new loginPage(page);
    await page.goto ('/')
    await login.setUsername(userData.invalidUser.username);
    await login.setPassword(userData.validUser.password);
    await login.Clicklogin();
    await login.expectErrorMessage(
        'Epic sadface: Username and password do not match any user in this service'
    );
});

test('login with empty credentials', async ({page, userData})=>{
  const login = new loginPage(page);
    await page.goto ('/')
    await login.setUsername('');
    await login.setPassword('');
    await login.Clicklogin();
    await login.expectErrorMessage(
        'Epic sadface: Username is required'
    );
});
