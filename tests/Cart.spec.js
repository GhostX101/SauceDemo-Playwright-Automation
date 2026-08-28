import { test, expect } from '../Fixtures/test';
import { loginPage } from '../Page/login';
import { productPage } from '../Page/product';
import { CartPage } from '../Page/cart';

/// reuseable flow for login before each test case executed
test.beforeEach('Login', async ({page, userData}) =>{
 const login = new loginPage(page);
//login with valid credentials 
 await page.goto('/');
 await login.setUsername(userData.validUser.username);
 await login.setPassword(userData.validUser.password);
 await login.Clicklogin();

});

test('verify checkout button is visible', async ({page})=>{
    const cart = new CartPage(page)

    await expect(cart.Checkout()).toBeVisible()

});

test('verify the filterby is visible', async ({page}) =>{
    const cart = new CartPage(page)
    await expect(cart.filterby()).toBeVisible()

});

test('verify the Hamburger menu is visible and clickable', async ({page}) =>{
    const cart = new CartPage (page)
    await expect(cart.hamburgerMenu()).toBeVisible();

});

test('verify complete carting process', async ({page})=> {
    const cart = new CartPage(page)
    const product = new productPage(page);
    //add product 1
    await expect(product.selectproduct()).toHaveText('Sauce Labs Backpack');
    await cart.ProductCartBtn1().click()

    //adding product 2
     await expect(product.selectproduct2()).toHaveText('Sauce Labs Bolt T-Shirt');
     await cart.ProductCartBtn2().click()

     //adding product 3
     await expect(product.selectproduct3()).toHaveText('Sauce Labs Onesie')
     await cart.ProductCartBtn3().click()

     //checkout 
     await cart.Checkout().click()

     //verify the badge 
     await expect (cart.cartbadge()).toBeVisible();
    await expect(cart.cartbadge()).toHaveText('3')
    

    
     // vertify we are in the cart page 
     await expect (cart.yourcart()).toHaveText('Your Cart')
     await expect (cart.cartQty()).toBeVisible('QTY')

    /// verify you can remove product
    await cart.removeprd1().click()
    await cart.removeprd2().click()
    await cart.removeprd3().click()

    ///confirming cart badge return to 0
    await expect(cart.cartbadge()).toHaveCount(0)
});