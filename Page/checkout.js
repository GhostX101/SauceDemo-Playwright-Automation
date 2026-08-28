import {test, expect} from '@playwright/test'
export class checkoutPage{
    constructor(page){
        this.page = page
    }

    checkoutItem(){
        return this.page.locator('.cart_item')
    }

    contshopping(){
        return this.page.locator('#continue-shopping')
    }

    checkout(){
        return this.page.locator('#checkout')
    }

async infocheck(){
    await this.page.locator('#first-name').fill('Solozy')
    await this.page.locator('#last-name').fill('Ghost')
    await this.page.locator('#postal-code').fill('8986')
    }

    cancelbtn(){
        return this.page.locator('#cancel')
}

continueBtn(){
    return this.page.locator('#continue')
}
CheckoutOverview(){
    return this.page.locator('.title')
}
ChckItemCheck1(){
    return this.page.locator("(//div[@class='cart_item_label'])[1]")
    }
ChckItemCheck2(){
    return this.page.locator("(//div[@class='cart_item_label'])[2]")
  
}
ChckItemCheck3(){
     return this.page.locator("(//div[@class='cart_item_label'])[3]")
}

itemtotal(){
    
    return this.page.locator("(//div[@class='summary_subtotal_label'])[1]")
}

Taxprice(){
    return this.page.locator('.summary_tax_label')
}
totalprice(){
    return this.page.locator('.summary_total_label')
}
Cancebtn(){
    return this.page.locator('#cancel')
}
FinishBtn(){
    return this.page.locator('#finish')
}

CheckoutSuccess(){
    return this.page.locator('#checkout_complete_container')
}

BacktoProduct(){
    return this.page.locator('#back-to-products')
}

receiptGen(){
    return this.page.locator('#generate-pdf-order')
    }

    Errormessage(){
        return this.page.locator("h3[data-test='error']")
    }

}



    












