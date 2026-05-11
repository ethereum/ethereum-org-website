import { expect, test } from "@playwright/test"

import externalTutorials from "@/data/externalTutorials.json"
import internalTutorialSlugs from "@/data/internalTutorials.json"

const PAGE_URL = "/developers/tutorials/"

test.describe("Tutorials Listing Page", () => {
  test("lists both internal and external tutorials", async ({ page }) => {
    await page.goto(PAGE_URL)

    const internalSlug = internalTutorialSlugs[0]
    await expect(
      page.locator(`a[href*="/developers/tutorials/${internalSlug}"]`).first()
    ).toBeVisible()

    const externalUrl = externalTutorials.find((t) => t.lang === "en")!.url
    await expect(page.locator(`a[href="${externalUrl}"]`).first()).toBeVisible()
  })
})
