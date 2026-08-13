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
    const count = await findWalletPage.getResultsCount()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThanOrEqual(await findWalletPage.getTotalCount())
  })

  test("device filter narrows the results", async () => {
    const initialCount = await findWalletPage.getResultsCount()
    await findWalletPage.toggleDeviceFilter("Hardware")
    await findWalletPage.waitForResultsChange(initialCount)
    expect(await findWalletPage.getResultsCount()).toBeLessThan(initialCount)
  })

  test("advanced filter narrows the results", async () => {
    const initialCount = await findWalletPage.getResultsCount()
    await findWalletPage.toggleAdvancedFilter("Multisig")
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

  // The modal already sits on the detail URL, so this only works as a document
  // navigation — a router link would be swallowed by the interception.
  test("modal 'Full details' escapes to the standalone page", async ({
    page,
  }) => {
    await findWalletPage.openWalletDetail("metamask")
    await expect(findWalletPage.detailDialog).toBeVisible()

    await findWalletPage.detailDialog
      .getByRole("link", { name: "Full details" })
      .click()

    await expect(
      page.getByRole("heading", { level: 1, name: "MetaMask" })
    ).toBeVisible()
    await expect(page.getByRole("dialog")).toBeHidden()
  })

  test("standalone page lists related wallets", async ({ page }) => {
    await page.goto("/wallets/find-wallet/metamask/")
    const related = page.locator("section").filter({
      has: page.getByRole("heading", { name: "Related resources" }),
    })
    await expect(related).toBeVisible()
    await expect(
      related.locator('a[href*="/find-wallet/"]').first()
    ).toBeVisible()
  })
})
