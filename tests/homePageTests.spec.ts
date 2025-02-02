import { test, expect } from '@playwright/test'
import { PageManager } from '../helpers/pageManager.ts'
import testData from '../testData/testData.json'

//Test suite containing the test cases
test.describe('BV Test Suite', () => {

    let pageManager : PageManager
 
    test.beforeEach(async ({page}) => {
        pageManager = new PageManager(page)
        
        //Navigate to BH home page
        await pageManager.getBVHomePage().navigateToHomePage()
     })

    test('Test 1- Verify BV Home Page search functionality', async ({ page }) => {
        
        //Click on search/loop icon (top, right corner)
        await pageManager.getBVHomePage().clickSearchIcon()

        //Verify if search field is visible on the page
        const searchField = await pageManager.getBVHomePage().getSearchField()
        expect(await searchField.isVisible()).toBeTruthy()

        //Type query text into the search field and click on Search button
        const searchQuery = testData.TestCase1.searchQuery;
        await pageManager.getBVHomePage().searchFor(searchQuery)

        //Verify if the first search result is exact match to what you typed into search 
        const firstResultText = await pageManager.getBVHomePage().getFirstSearchResult()
        expect(firstResultText).toBe(searchQuery)

    });


    test('Test 2- Verify Center name and address', async ({ page }) => {
        
        //Click on Find a Center option (top header)
        await pageManager.getBVHomePage().clickFindACenter()

        //Verify that newly open page contains: /child-care-locator as a part of its URL
        const currentUrl = await  pageManager.getFindCenterPage().getCurrentURL()
        expect(currentUrl).toContain(testData.TestCase2.urlTextToVerify)

        //Type New York into search box and press Enter
        await  pageManager.getFindCenterPage().searchCenter(testData.TestCase2.searchCenterQuery)

        //Verify if number of found centers is the same as a number of centers displayed on the below list
        await pageManager.getFindCenterPage().verifyNoOfCentersInSearchResult()

        //Click on the first center on the list
        await pageManager.getFindCenterPage().clickOnFirstCenter();

        //Verify if center name and address are the same (on the list and on the popup)
        const centerNameInSearchResult = await pageManager.getFindCenterPage().getFirstCenterName()
        const centerNameInPopup = await pageManager.getFindCenterPage().getNameFromFirstCenterPopup()
        expect(centerNameInSearchResult?.trim()).toEqual(centerNameInPopup?.trim())

        const centerAddressInSearchResult = await pageManager.getFindCenterPage().getFirstCenterAddress()
        const centerAddressInPopup = await pageManager.getFindCenterPage().getAddressFromFirstCenterPopup()
        expect(centerAddressInSearchResult?.trim()).toEqual(centerAddressInPopup?.trim())
    })

})