import { expect, takeSnapshot, test } from "@chromatic-com/playwright"
import { Page } from "@playwright/test"

import { breakpointAsNumber } from "@/lib/utils/screen"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { testData } from "./fixtures/testData"
import { HomePage } from "./pages/HomePage"
import { waitForPageReady } from "./utils/testHelpers"
import {
  openLanguagePickerDesktop,
  openLanguagePickerMobile,
  switchToLanguage,
} from "./utils"

test.describe("Home Page", () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.goto()
    await waitForPageReady(page)
  })

  test("loads successfully", async ({ page }, testInfo) => {
    await homePage.verifyPageLoaded()
    await takeSnapshot(page, "home-initial", testInfo)
  })

  test("search functionality", async () => {
    const searchQuery = testData.search.validQuery

    await homePage.search(searchQuery)
    await homePage.verifySearchResults()
  })

  test("main navigation - desktop", async () => {
    // Only run this test for desktop projects
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

  test.describe("i18n - language picker", () => {
    async function switchToChinese(page: Page) {
      await switchToLanguage(page, "zh", /^简体中文 Chinese/i)
      await expect(page).toHaveURL(/\/zh(\/|$)/)
      await expect(
        page.getByRole("heading", { level: 1, name: /以太坊/i })
      ).toBeVisible()
    }

    test("switches to Chinese (desktop)", async ({ page }) => {
      const viewport = page.viewportSize()
      const isMobile = viewport && viewport.width <= breakpointAsNumber.md
      test.skip(!!isMobile, "This test is for desktop viewports only")

      await expect(page).toHaveURL(`/${DEFAULT_LOCALE}/`)
      await openLanguagePickerDesktop(page)
      await switchToChinese(page)
    })

    test("switches to Chinese (mobile)", async ({ page }) => {
      await page.setViewportSize({ width: breakpointAsNumber.sm, height: 800 })
      const viewport = page.viewportSize()
      const isMobile = viewport && viewport.width <= breakpointAsNumber.md
      test.skip(!isMobile, "This test is for mobile viewports only")

      await expect(page).toHaveURL(`/${DEFAULT_LOCALE}/`)
      await openLanguagePickerMobile(page)
      await switchToChinese(page)
    })
  })

  test.describe("RTL", () => {
    async function switchToArabic(page: Page) {
      await switchToLanguage(page, "ar", /^العربية Arabic/i)
      await expect(page).toHaveURL(/\/ar(\/|$)/)
      await expect(
        page.getByRole("heading", { level: 1, name: /إيثريوم/i })
      ).toBeVisible()
    }

    test("home page RTL visual snapshot", async ({ page }, testInfo) => {
      // Arabic locale is RTL
      await page.goto("/ar")
      await takeSnapshot(page, "home-arabic-rtl", testInfo)
    })

    test("nav flips logo and search button when switching to RTL via language picker", async ({
      page,
    }) => {
      // Load LTR page
      await expect(page).toHaveURL(`/${DEFAULT_LOCALE}/`)

      // Switch to RTL
      await openLanguagePickerDesktop(page)
      await switchToArabic(page)

      // Wait for transition
      await expect(page).toHaveURL(/\/ar(\/|$)/)

      const logo = page.getByTestId("nav-logo")
      const searchBtn = page.getByTestId("search-input-button")
      const logoBox = await logo.boundingBox()
      const searchBox = await searchBtn.boundingBox()
      expect(logoBox).not.toBeNull()
      expect(searchBox).not.toBeNull()
      // In RTL, logo should be on the right of search button (higher x value)
      expect(logoBox!.x).toBeGreaterThan(searchBox!.x)
    })
  })
})
