import { test, expect } from '../Fixtures/test';
import { loginPage } from '../Page/login';
import { productPage } from '../Page/product';
import { checkoutPage } from '../Page/checkout';
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

test('verify check complete flow', async ({page})=>{
        const cart = new CartPage(page);
        const product = new productPage(page);
        const Chckout = new checkoutPage(page);

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

         //verify the cart contain the 3 items 
         await expect (Chckout.checkoutItem()).toHaveCount(3)

         
         //verify the continue shopping is visible before chekout 
         await expect(Chckout.contshopping()).toBeVisible()
         await expect(Chckout.contshopping()).toHaveText('Continue Shopping')

         // proceed to checkout 
         await Chckout.checkout().click()

         // fill in the checkout information 
         await Chckout.infocheck();

        ///verify cancle button is visible and have the right text 
         await expect(Chckout.cancelbtn()).toBeVisible();
         await expect(Chckout.cancelbtn()).toHaveText('Cancel')


         /// verify the continue button 
         await expect (Chckout.continueBtn()).toBeVisible();
         await expect (Chckout.continueBtn()).toHaveText('Continue')
         await Chckout.continueBtn().click();

         ///verifying the check overview is visible 
         await expect (Chckout.CheckoutOverview()).toBeVisible()
         await expect(Chckout.CheckoutOverview()).toContainText('Checkout')
         
  
        ///verifying product names on cart
        //  check item 3
       await expect(Chckout.ChckItemCheck1()).toBeVisible()
       await expect(Chckout.ChckItemCheck1()).toContainText('Sauce Labs Backpack')
       await expect(Chckout.ChckItemCheck1()).toContainText('$29.99')
        //Checkout item2
       await expect(Chckout.ChckItemCheck2()).toBeVisible()
       await expect(Chckout.ChckItemCheck2()).toContainText('Sauce Labs Bolt T-Shirt')
       await expect(Chckout.ChckItemCheck2()).toContainText('$15.99')
        //checkoutitem 3
       await expect(Chckout.ChckItemCheck3()).toBeVisible()
       await expect(Chckout.ChckItemCheck3()).toContainText('Sauce Labs Onesie')
       await expect(Chckout.ChckItemCheck3()).toContainText('$7.99')

        //verify the item total 
        await expect(Chckout.itemtotal()).toBeVisible()
        await expect(Chckout.itemtotal()).toContainText('$53.97')

        ///verify the tax price 
        await expect(Chckout.Taxprice()).toBeVisible()
        await expect(Chckout.Taxprice()).toContainText('$4.32')

        // verify the totalprice 
        await expect(Chckout.totalprice()).toBeVisible()
        await expect(Chckout.totalprice()).toContainText('$58.29')

        ///verify the cancel button is visible and clickable 
        await expect(Chckout.Cancebtn()).toBeVisible();
        await expect(Chckout.Cancebtn()).toBeEnabled();
        await expect(Chckout.Cancebtn()).toContainText('Cancel')

        ///verify the finish button and checkout 
        await expect(Chckout.FinishBtn()).toBeVisible()
        await expect(Chckout.FinishBtn()).toBeEnabled()
        await expect(Chckout.FinishBtn()).toHaveText('Finish')
        await Chckout.FinishBtn().click();


        //verify user checkout successfully
        await expect(Chckout.CheckoutSuccess()).toBeVisible()
        await expect(Chckout.CheckoutSuccess()).toContainText('Thank you for your order!')
        

        ///verify user back to cart if reponsive 
        await expect(Chckout.BacktoProduct()).toBeVisible()
        await expect(Chckout.BacktoProduct()).toBeEnabled()
        await expect(Chckout.BacktoProduct()).toHaveText('Back Home')

        ///verify the generate receipt is responsive and visible 
        await expect(Chckout.receiptGen()).toBeVisible()
        await expect(Chckout.receiptGen()).toBeEnabled()
        await expect(Chckout.receiptGen()).toHaveText('Generate PDF order')

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
})

test('verify user can not checkout without filling information', async ({page}) =>{
        const cart = new CartPage(page);
        const product = new productPage(page);
        const Chckout = new checkoutPage(page);

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
                // skip user information
         // proceed to checkout 
         await Chckout.checkout().click()
        //verify the system feedback 
                await Chckout.continueBtn().click();
        await expect(Chckout.Errormessage()).toBeVisible();
        await expect(Chckout.Errormessage()).toHaveText('Error: First Name is required')


});

test('verify user can not proceed to checkout without adding items to cart', async ({page})=>{
const cart = new CartPage(page);
        const product = new productPage(page);
        const Chckout = new checkoutPage(page);
    
         //click on the checkout icon 
         await cart.Checkout().click()
                // skip user information
         // proceed to checkout 
         await Chckout.checkout().click()
        //verify the system feedback 
                await Chckout.continueBtn().click();
        await expect(Chckout.Errormessage()).toBeVisible();
        await expect(Chckout.Errormessage()).toHaveText('Error: First Name is required')



});