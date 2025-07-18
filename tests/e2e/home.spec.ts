import { takeSnapshot, test } from "@chromatic-com/playwright"

import { testData } from "./fixtures/testData"
import { HomePage } from "./pages/HomePage"

test.describe("Home Page", () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.goto()
  })

  test("loads successfully", async ({ page }, testInfo) => {
    // ensure page is ready before taking snapshot
    await homePage.waitForPageReady()
    await homePage.verifyPageLoaded()
    await takeSnapshot(page, "home-initial", testInfo)
  })

  test("search functionality", async () => {
    const searchQuery = testData.search.validQuery

    await homePage.search(searchQuery)
    await homePage.verifySearchResults()
  })

  test("main navigation - desktop", async () => {
    const isMobile = await homePage.isMobileViewport()
    test.skip(isMobile, "This test is for desktop viewports only")

    await homePage.verifyDesktopNavigation()
    await homePage.navigateToBuilderHome()
  })

  test("navigation menu - mobile", async ({ page }, testInfo) => {
    const isMobile = await homePage.isMobileViewport()
    test.skip(!isMobile, "This test is for mobile viewports only")

    await homePage.openMobileMenu()
    await takeSnapshot(page, "home-menu-open", testInfo)

    await homePage.verifyMobileNavigation()
    await homePage.navigateFromMobileMenu(
      "learn",
      "basics",
      "what is ethereum",
      /.*\/what-is-ethereum/
    )
  })
})
