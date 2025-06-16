import { test } from "@chromatic-com/playwright"

import { testData } from "./fixtures/testData"
import { HomePage } from "./pages/HomePage"

test.describe("Global", () => {
  test.describe("Error Handling", () => {
    test("handles invalid search gracefully", async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      // Try invalid search queries
      await homePage.search(testData.search.invalidQuery)

      // Should not crash or show errors, has to show no results
      await page.waitForTimeout(1000) // Allow search to process

      await homePage.verifyNoResults()
    })
  })

  test.describe("Accessibility", () => {
    test("skip link - keyboard navigation", async () => {
      // TODO: Add skip link tests. Part of #15663
    })
  })

  test.describe("Internationalization", () => {
    // TODO: Add internationalization tests. Part of #15663
  })
})
