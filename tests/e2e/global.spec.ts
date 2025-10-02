import { expect, takeSnapshot, test } from "@chromatic-com/playwright"
import { Page } from "@playwright/test"

import { testData } from "./fixtures/testData"
import { HomePage } from "./pages/HomePage"

test.describe("Global", () => {
  test.describe("Error Handling", () => {
    test("handles invalid search gracefully", async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      // Try invalid search queries
      await homePage.search(testData.search.invalidQuery)

      // Should not crash or show errors, has to show the no results message
      await page.waitForTimeout(1000) // Allow search to process

      await homePage.verifyNoResults()
    })

    test("handles invalid URL with 404", async ({ page }) => {
      await page.goto(testData.urls.invalid)
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: new RegExp(testData.content.headings.notFoundEn, "i"),
        })
      ).toBeVisible()
    })

    test("handles invalid URL with 404 internationalized", async ({ page }) => {
      await page.goto(testData.urls.invalidInternationalized)
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: new RegExp(testData.content.headings.notFoundEs, "i"),
        })
      ).toBeVisible()
    })
  })

  test.describe("Accessibility", () => {
    test("skip link - keyboard navigation", async () => {
      // TODO: Add skip link tests.
    })
  })

  test.describe("Internationalization", () => {
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page)
      await homePage.goto()
    })

    async function switchToChinese(page: Page, homePage: HomePage) {
      await homePage.switchToLanguage("zh", /^简体中文 Chinese/i)
      await expect(page).toHaveURL(/\/zh(\/|$)/)
      await expect(
        page.getByRole("heading", { level: 1, name: /以太坊/i })
      ).toBeVisible()
    }

    test("switches to Chinese", async ({ page }) => {
      await expect(page).toHaveURL("/")
      await homePage.openLanguagePicker()
      await switchToChinese(page, homePage)
    })
  })

  test.describe("RTL Support", () => {
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page)
    })

    async function switchToArabic(page: Page, homePage: HomePage) {
      await homePage.switchToLanguage("ar", /^العربية Arabic/i)
      await homePage.assertUrlMatches(/\/ar(\/|$)/)
      await expect(
        page.getByRole("heading", { level: 1, name: /إيثريوم/i })
      ).toBeVisible()
    }

    test("home page RTL visual snapshot", async ({ page }, testInfo) => {
      await page.goto("/ar")
      await homePage.waitForPageReady()
      await takeSnapshot(page, "home-arabic-rtl", testInfo)
    })

    test("nav flips logo and search button when switching to RTL via language picker", async ({
      page,
    }) => {
      await homePage.goto()

      await homePage.assertUrlMatches("/")

      await homePage.openLanguagePicker()
      await switchToArabic(page, homePage)

      await homePage.assertUrlMatches(/\/ar(\/|$)/)

      const logo = page.getByTestId("nav-logo")
      const searchBtn = await homePage.getSearchButton()
      const logoBox = await logo.boundingBox()
      const searchBox = await searchBtn.boundingBox()
      expect(logoBox).not.toBeNull()
      expect(searchBox).not.toBeNull()
      expect(logoBox!.x).toBeGreaterThan(searchBox!.x)
    })
  })
})
