import { test, expect } from '../Fixtures/test';
import { loginPage } from '../Page/login';
import { productPage } from '../Page/product';

/// reuseable flow for login before each test case executed
test.beforeEach('Login', async ({page, userData}) =>{
 const login = new loginPage(page);
//login with valid credentials 
 await page.goto('/');
 await login.setUsername(userData.validUser.username);
 await login.setPassword(userData.validUser.password);
 await login.Clicklogin();

});

test('verify product name',async ({ page}) => {
const product = new productPage(page);

///verifying product names
 await expect(product.selectproduct()).toHaveText('Sauce Labs Backpack');
 await expect(product.selectproduct2()).toHaveText('Sauce Labs Bolt T-Shirt');
 await expect(product.selectproduct3()).toHaveText('Sauce Labs Onesie');


})

test('verify the product are visible on the webapp', async ({page}) =>{
 const product = new productPage(page);

//verifying product names
 await expect(product.selectproduct()).toBeVisible();
 await expect(product.selectproduct2()).toBeVisible();
 await expect(product.selectproduct3()).toBeVisible();

});

test ('verify product price', async ({page}) =>{
  const product = new productPage(page);

 //verify product price 
 await expect(product.price1()).toHaveText('$29.99')
 await expect(product.price2()).toHaveText('$15.99')
 await expect(product.price3()).toHaveText('$7.99')

});

test('verify product label description', async ({page}) =>{
 const product = new productPage(page);

    // verify the product label/description
  await expect(product.productInfo1()).toContainText('carry.allTheThings()')
  await expect(product.productInfo2()).toContainText('A red light')
  await expect(product.productinfo3()).toContainText('Rib snap infant onesie for the junior')


});


test('verify product image is visible', async ({page}) =>{
 const product = new productPage(page);

    ///verifying the product image is visible on the webpage 
 await expect(product.productImg1()).toBeVisible();
 await expect (product.productImg2()).toBeVisible();
 await expect(product.productImag3()).toBeVisible();
 
});


test('verify numbers of product on the page', async ({page}) =>{
const product = new productPage(page);
await expect(product.productCount()).toHaveCount(6)
await expect(product.productCount()).toHaveText(['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']) 
expect(await product.productCount().count()).toBeGreaterThan(5)
});

