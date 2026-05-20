import { expect, test } from "@playwright/test"

/**
 * Regression test for https://github.com/ethereum/ethereum-org-website/issues/17777
 *
 * Pages that use EdgeScrollContainer must not leak horizontal overflow to the
 * document scroll area. Asserting on both `scrollWidth` and an actual
 * `scrollBy` is intentional: each catches a different class of regression
 * (layout vs. containment).
 */

const pagesWithEdgeScroll = [
  "/community/events/",
  "/community/events/conferences/",
  "/developers/",
  "/developers/tools/",
]

test.describe("No horizontal page overflow", () => {
  for (const url of pagesWithEdgeScroll) {
    test(url, async ({ page }) => {
      const response = await page.goto(url)
      expect(response?.status(), `failed to load ${url}`).toBeLessThan(400)
      await page.waitForLoadState("networkidle")

      const measurements = await page.evaluate(() => {
        window.scrollTo(0, 0)
        window.scrollBy({ left: 5000, behavior: "instant" })
        return {
          scrollX: window.scrollX,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }
      })

      expect(measurements.scrollX).toBe(0)
      expect(measurements.scrollWidth).toBeLessThanOrEqual(
        measurements.clientWidth
      )
    })
  }
})
