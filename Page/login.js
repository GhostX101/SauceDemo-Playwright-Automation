export class loginPage{
    constructor(page) {
        this.page = page;
    }

    async setUsername(username){
        await this.page.locator('[data-test="username"]').fill(username);
    }
    
    async setPassword(password){
        await this.page.locator('[data-test="password"]').fill(password);
    }

    async Clicklogin(){
        await this.page.locator('[data-test="login-button"]').click();
    }
}