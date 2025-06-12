import { expect, takeSnapshot, test } from "@chromatic-com/playwright"
import { Page } from "@playwright/test"

import { breakpointAsNumber } from "@/lib/utils/screen"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { testData } from "./fixtures/testData"
import { HomePage } from "./pages/HomePage"
import { waitForPageReady } from "./utils/testHelpers"

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
    async function openLanguagePickerDesktop(page: Page) {
      const nav = page.getByRole("navigation", { name: "Primary" })
      const langButton = nav.getByRole("button", { name: /languages/i })
      await expect(langButton).toBeVisible()
      await langButton.click()
      return page
    }

    async function openLanguagePickerMobile(page: Page) {
      const nav = page.getByRole("navigation", { name: "Primary" })
      const menuButton = nav.getByRole("button", {
        name: /toggle menu button/i,
      })
      await expect(menuButton).toBeVisible()
      await menuButton.click()
      const sidebar = page.getByRole("dialog", { name: /ethereum.org/i })
      await expect(sidebar).toBeVisible()
      const langButton = sidebar.getByRole("button", { name: /languages/i })
      await expect(langButton).toBeVisible()
      await langButton.click()
      return page
    }

    async function switchToChinese(page: Page) {
      const searchInput = page.getByPlaceholder(/type to filter/i)
      await expect(searchInput).toBeVisible()
      await searchInput.fill("zh")
      const zhOption = page.getByRole("option", { name: /^简体中文 Chinese/i })
      await expect(zhOption).toBeVisible()
      await zhOption.click()
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
})
