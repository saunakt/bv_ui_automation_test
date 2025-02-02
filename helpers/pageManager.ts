import { Page} from "@playwright/test"
import { BrightHorizonsHomePage } from '../pageObjects/brightHorizonsHomePage.ts'
import { FindCenterPage } from "../pageObjects/findCenterPage.ts"

//This class is a responsible for provider the access to individual page obejcts from test classes
export class PageManager{

    private readonly page: Page
    private readonly brighHorizonHomePage: BrightHorizonsHomePage
    private readonly findCenterPage: FindCenterPage


    constructor(page: Page){
        this.page = page
        this.brighHorizonHomePage = new BrightHorizonsHomePage(this.page)
        this.findCenterPage = new FindCenterPage(this.page)
    }

    getBVHomePage(){
        return this.brighHorizonHomePage
    }

    getFindCenterPage(){
        return this.findCenterPage
    }

}

