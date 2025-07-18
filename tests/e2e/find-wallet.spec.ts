import { takeSnapshot, test } from "@chromatic-com/playwright"

import { FindWalletPage } from "./pages/FindWalletPage"

test.describe("Find Wallet Page", () => {
  let findWalletPage: FindWalletPage

  test.beforeEach(async ({ page }) => {
    findWalletPage = new FindWalletPage(page)
    await findWalletPage.goto()
  })

  test("loads successfully", async ({ page }, testInfo) => {
    // ensure page is ready before taking snapshot
    await findWalletPage.waitForPageReady()
    await findWalletPage.verifyPageLoaded()
    await takeSnapshot(page, "find-wallet-initial", testInfo)
  })

  test("personas filter updates counter and list", async () => {
    const personaCount =
      await findWalletPage.selectPersonaFilter("New to crypto")

    await findWalletPage.verifyPersonaFilterCount(personaCount)
  })

  test("wallet list items expand correctly", async () => {
    await findWalletPage.expandFirstWallet()
    await findWalletPage.verifyWalletExpanded()
  })

  test("sidebar filters - desktop", async () => {
    // Only run this test for desktop projects
    const isMobile = await findWalletPage.isMobileViewport()
    test.skip(isMobile, "This test is for desktop viewports only")

    const { initialCount, osOptions } =
      await findWalletPage.applyDesktopDeviceFilter()
    await findWalletPage.waitForFilterResults(initialCount)
    await findWalletPage.verifyFilteredResults(osOptions)
    await findWalletPage.verifyRowCounter()
  })

  test("sidebar filters - mobile", async () => {
    const isMobile = await findWalletPage.isMobileViewport()
    test.skip(!isMobile, "This test is for mobile viewports only")

    const { initialCount, osOptions } =
      await findWalletPage.applyMobileDeviceFilter()
    await findWalletPage.waitForFilterResults(initialCount)
    await findWalletPage.verifyFilteredResults(osOptions)
    await findWalletPage.verifyRowCounter()
  })
})
