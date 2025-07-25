import { test } from "@playwright/test"

import { StartPage } from "./pages"

test.describe("Start Page", () => {
  test("Connect wallet", async ({ page }) => {
    const startPage = new StartPage(page)
    await startPage.goto()
    await startPage.verifyPageLoaded()

    await startPage.connectWithExistingWallet()

    await startPage.continueToUseAppsStep()
  })
})
