import {test, expect} from '@playwright/test';
export class CartPage{
    constructor(page){
        this.page = page;
    } 
    
    filterby(){
        return this.page.locator('select.product_sort_container')
    }

    hamburgerMenu(){
        return this.page.locator('#react-burger-menu-btn')
    }

    ProductCartBtn1(){
        return this.page.locator('#add-to-cart-sauce-labs-backpack')
    } 

    ProductCartBtn2(){
        return this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt')
    }

    ProductCartBtn3(){
        return this.page.locator('#add-to-cart-sauce-labs-onesie')
    }

    Checkout(){
        return this.page.locator('.shopping_cart_link')
    }

    yourcart(){
        return this.page.locator('.title')
    }
    
    cartQty(){
        return this.page.locator('.cart_quantity_label')
    }

    cartbadge(){
        return this.page.locator('.shopping_cart_badge')
    }

    removeprd1(){
        return this.page.locator('#remove-sauce-labs-backpack')
    }

    removeprd2(){
        return this.page.locator('#remove-sauce-labs-bolt-t-shirt')
        
    }
    removeprd3(){
        return this.page.locator('#remove-sauce-labs-onesie')
    }
};