import { expect, takeSnapshot, test } from "@chromatic-com/playwright"
import type { Page } from "@playwright/test"

import { breakpointAsNumber } from "@/lib/utils/screen"

import { DEFAULT_LOCALE } from "@/lib/constants"

import {
  openLanguagePickerDesktop,
  openLanguagePickerMobile,
  switchToLanguage,
} from "./utils"

const PAGE_URL = "/"

test.beforeEach(async ({ page }) => {
  await page.goto(PAGE_URL)
})

test.describe("Home Page", () => {
  test("loads successfully", async ({ page }, testInfo) => {
    await expect(page).toHaveTitle(/Ethereum.org/)

    await takeSnapshot(page, "home-initial", testInfo)
  })

  test("search functionality", async ({ page }) => {
    const viewport = page.viewportSize()
    const isMobile = viewport && viewport.width <= breakpointAsNumber.md
    if (isMobile) {
      await page.getByTestId("search-button-mobile").first().click()
    } else {
      await page.getByTestId("search-input-button").first().click()
    }
    await page.getByPlaceholder("Search").fill("smart contract")

    await expect(page.getByRole("listbox").first()).toBeVisible()
  })

  test("main navigation - desktop", async ({ page }) => {
    // Only run this test for desktop projects
    const viewport = page.viewportSize()
    const isMobile = viewport && viewport.width <= breakpointAsNumber.md
    test.skip(!!isMobile, "This test is for desktop viewports only")

    const nav = page.getByRole("navigation", { name: "Primary" })
    await expect(nav.getByRole("button", { name: "Learn" })).toBeVisible()
    await expect(nav.getByRole("button", { name: "Use" })).toBeVisible()
    await expect(nav.getByRole("button", { name: "Build" })).toBeVisible()

    // Hover over Build button to show submenu
    await nav.getByRole("button", { name: "Build" }).hover()
    await nav.getByRole("link", { name: "Builder's home" }).click()

    await expect(page).toHaveURL(/.*\/developers/)
  })

  test("navigation menu - mobile", async ({ page }, testInfo) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: breakpointAsNumber.sm, height: 800 })

    const nav = page.getByRole("navigation", { name: "Primary" })
    const menuButton = nav.getByRole("button", {
      name: /toggle menu button/i,
    })
    await expect(menuButton).toBeVisible()

    // Open the mobile menu
    await menuButton.click()

    await takeSnapshot(page, "home-menu-open", testInfo)

    // Check that navigation links are visible in the mobile menu
    const sidebar = page.getByRole("dialog", { name: /ethereum.org/i })
    await expect(sidebar).toBeVisible()
    await expect(sidebar.getByRole("button", { name: "Learn" })).toBeVisible()
    await expect(sidebar.getByRole("button", { name: "Use" })).toBeVisible()
    await expect(sidebar.getByRole("button", { name: "Build" })).toBeVisible()

    // Click on Learn accordion button to show submenu
    await sidebar.getByRole("button", { name: "Learn" }).click()
    await sidebar.getByRole("button", { name: /^basics/i }).click()

    const whatIsEthereum = sidebar.getByRole("link", {
      name: /^what is ethereum/i,
    })
    await expect(whatIsEthereum).toBeVisible()
    await whatIsEthereum.click()

    await expect(page).toHaveURL(/.*\/what-is-ethereum/)
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
