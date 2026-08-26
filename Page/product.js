import {expect} from '@playwright/test'

export class productPage{
    constructor(page){
        this.page = page;
    }

    selectproduct(){
        return this.page.locator('[data-test="item-4-title-link"]')
    }

    selectproduct2(){
        return this.page.locator('[data-test="item-1-title-link"]')
    }

    selectproduct3(){
        return this.page.locator('[data-test="item-2-title-link"]')
    }

    price1(){
        return this.page.getByText('$29.99')
    }

    price2(){
        return this.page.locator('[data-test="inventory-item-price"]').nth(2)
    }

    price3(){
        return this.page.locator("(//div[normalize-space()='$7.99'])[1]")
    }

    productInfo1(){
        return this.page.locator("(//div[normalize-space()='carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'])[1]")
            }
    productInfo2(){
        return this.page.getByText("A red light isn't the desired")
    }

    productinfo3(){
        return this.page.getByText("Rib snap infant onesie for the junior")
    }
}