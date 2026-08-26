import { test, expect } from '../Fixtures/test';
import { loginPage } from '../Page/login';
import { productPage } from '../Page/product';


test('verify product name',async ({ page, userData }) => {
const login = new loginPage(page);
const product = new productPage(page);

//login with valid credentials 
 await page.goto('/');
 await login.setUsername(userData.validUser.username);
 await login.setPassword(userData.validUser.password);
 await login.Clicklogin();

//verifying product names
 await expect(product.selectproduct()).toHaveText('Sauce Labs Backpack');
 await expect(product.selectproduct2()).toHaveText('Sauce Labs Bolt T-Shirt');
 await expect(product.selectproduct3()).toHaveText('Sauce Labs Onesie');


})

test('verify the product are visible on the webapp', async ({page, userData}) =>{

 const login = new loginPage(page);
const product = new productPage(page);

//login with valid credentials 
 await page.goto('/');
 await login.setUsername(userData.validUser.username);
 await login.setPassword(userData.validUser.password);
 await login.Clicklogin();

//verifying product names
 await expect(product.selectproduct()).toBeVisible();
 await expect(product.selectproduct2()).toBeVisible();
 await expect(product.selectproduct3()).toBeVisible();

});

test ('verify product price', async ({page, userData}) =>{
     const login = new loginPage(page);
const product = new productPage(page);

//login with valid credentials 
 await page.goto('/');
 await login.setUsername(userData.validUser.username);
 await login.setPassword(userData.validUser.password);
 await login.Clicklogin();


 //verify product price 
 await expect(product.price1()).toHaveText('$29.99')
 await expect(product.price2()).toHaveText('$15.99')
 await expect(product.price3()).toHaveText('$7.99')

});

test('verify product label description', async ({page, userData}) =>{
    const login = new loginPage(page);
const product = new productPage(page);

//login with valid credentials 
 await page.goto('/');
 await login.setUsername(userData.validUser.username);
 await login.setPassword(userData.validUser.password);
 await login.Clicklogin();


 // verify the product label/description
  await expect(product.productInfo1()).toContainText('carry.allTheThings()')
  await expect(product.productInfo2()).toContainText('A red light')
  await expect(product.productinfo3()).toContainText('Rib snap infant onesie for the junior')


});