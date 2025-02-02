import { Page } from "@playwright/test";

//Helper class to house customized functions needed to support various framework activities
export class HelperBase{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    //This is for illustration purpose if we need specific helper methods to support BV framework
    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
}