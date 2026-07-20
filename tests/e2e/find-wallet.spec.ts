import { expect, test } from "@playwright/test"

import { FindWalletPage } from "./pages/FindWalletPage"

test.describe("Find Wallet Page", () => {
  let findWalletPage: FindWalletPage

  test.beforeEach(async ({ page }) => {
    findWalletPage = new FindWalletPage(page)
    await findWalletPage.goto()
  })

  test("loads successfully", async () => {
    await findWalletPage.waitForPageReady()
    await findWalletPage.verifyPageLoaded()
  })

  test("persona card navigates to a persona page", async () => {
    await findWalletPage.openPersona("nfts")
    // The persona subset is smaller than the full catalog.
    const count = await findWalletPage.getResultsCount()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThanOrEqual(49)
  })

  test("device filter narrows the results", async () => {
    const initialCount = await findWalletPage.getResultsCount()
    await findWalletPage.toggleDeviceFilter("Hardware")
    await findWalletPage.waitForResultsChange(initialCount)
    expect(await findWalletPage.getResultsCount()).toBeLessThan(initialCount)
  })

  test("wallet card opens a detail modal and closes", async ({ page }) => {
    await findWalletPage.openWalletDetail("metamask")
    await expect(findWalletPage.detailDialog).toBeVisible()
    await expect(findWalletPage.detailDialog).toContainText("MetaMask")
    await expect(page).toHaveURL(/\/find-wallet\/metamask\/?$/)

    await findWalletPage.closeDialog()
    await expect(findWalletPage.detailDialog).toBeHidden()
    // Closing pops the intercepted route: back on the catalog.
    await expect(page).toHaveURL(/\/find-wallet\/?$/)
  })

  test("wallet detail deep-link renders the standalone page", async ({
    page,
  }) => {
    await page.goto("/wallets/find-wallet/metamask/")
    await expect(
      page.getByRole("heading", { level: 1, name: "MetaMask" })
    ).toBeVisible()
    await expect(page.getByRole("dialog")).toBeHidden()
  })
})
