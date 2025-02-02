import {Page, Locator} from '@playwright/test'
import { HelperBase } from '../helpers/helperBase'

export class BrightHorizonsHomePage extends HelperBase {

    readonly acceptAllCookieButton: Locator
    readonly searchIcon: Locator
    readonly searchInputField: Locator
    readonly searchButton: Locator
    readonly firstSearchResult: Locator
    readonly findCenterButton: Locator

    constructor(page: Page) {
        super(page)
        this.acceptAllCookieButton = this.page.getByRole('button', { name: 'Accept All' })
        this.searchIcon = this.page.locator('xpath=//li[@class="nav-item displayed-desktop utility-nav-item"]/a/span[1]').nth(1)
        this.searchInputField = this.page.getByRole('textbox', { name: 'Type to Search' })
        this.searchButton = this.page.getByRole('button', { name: 'Search' })
        this.firstSearchResult = this.page.locator('.search-result').first().locator('.title')
        this.findCenterButton = this.page.getByRole('link', { name: 'Find a Center' })
    }

    async navigateToHomePage() {
        await this.page.goto(process.env.URL)
        await this.acceptAllCookieButton.click()
    }

    async clickSearchIcon() {
        await this.searchIcon.click()
     }

    async getSearchField() {
        return this.searchInputField
    }

    async searchFor(searchQuery: string) {
        const searchField = await this.getSearchField()
        await searchField.fill(searchQuery)
        this.searchButton.click()
    }

    async getFirstSearchResult() {
        const firstRecord = this.firstSearchResult.textContent()
        return firstRecord
    }

    async clickFindACenter() {
        await this.findCenterButton.nth(1).click();
    }
}
