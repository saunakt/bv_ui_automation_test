import {Page, Locator, expect} from '@playwright/test'
import { HelperBase } from '../helpers/helperBase'

export class FindCenterPage extends HelperBase {

    readonly locationTextbox: Locator
    readonly searchResultNumber: Locator
    readonly firstCenterNameInSearchResult: Locator
    readonly firstCenterAddressInSearchResult: Locator
    readonly centerNameInPopup: Locator
    readonly centerAddressInPopup : Locator

    constructor(page: Page) {
        super(page)
        this.locationTextbox = this.page.getByRole('textbox', { name: 'Location' })
        this.searchResultNumber = this.page.locator('.resultsNumber')
        this.firstCenterNameInSearchResult = this.page.locator('.centerResult__name')
        this.firstCenterAddressInSearchResult = this.page.locator('.centerResult__address')
        this.centerNameInPopup = this.page.locator('.mapTooltip__headline')
        this.centerAddressInPopup = this.page.locator('.mapTooltip__address')

    }

    async getCurrentURL() {
        const currentUrl = this.page.url()
        return currentUrl
      }
    
      async searchCenter(city: string) {
        await this.page.waitForLoadState('domcontentloaded');
        await this. page.waitForSelector('text="centers"', { state: 'visible' })
        await this.locationTextbox.type('New York', { delay: 200 })
        await this.locationTextbox.press('Enter');
      }

      async verifyNoOfCentersInSearchResult(){
        return await expect(this.searchResultNumber).toHaveText('20')
      }

      async getFirstCenterName(){
        const firstCenterName = await this.firstCenterNameInSearchResult.first().textContent()
        return firstCenterName
      }

       async getFirstCenterAddress(){
        const firstCenterAddress = await this.firstCenterAddressInSearchResult.first().textContent()
        return firstCenterAddress
      }

      async clickOnFirstCenter() {
       await this.firstCenterNameInSearchResult.first().click()
       const popUpCenterName = await this.page.locator('.mapTooltip__headline').textContent()
      }

      async getNameFromFirstCenterPopup(){
        const popUpCenterName = await this.centerNameInPopup.textContent()
        return popUpCenterName
      }

      async getAddressFromFirstCenterPopup(){
        const popUpCenterAddress = await this.centerAddressInPopup.textContent()
        return popUpCenterAddress
      }
    

}