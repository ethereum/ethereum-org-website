import { expect, test } from "@playwright/test"

import { testData } from "./fixtures/testData"
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

  test("persona cards filter in place and mirror the URL", async ({ page }) => {
    const total = await findWalletPage.getTotalCount()

    await findWalletPage.togglePersona("NFTs")
    await findWalletPage.waitForResultsChange(total)
    const nftCount = await findWalletPage.getResultsCount()
    expect(nftCount).toBeGreaterThan(0)
    await expect(page).toHaveURL(/\/find-wallet\/personas\/nfts\/$/)
    await expect(findWalletPage.personaCheckbox("NFTs")).toBeChecked()

    // Two personas AND-combine; with no path for a pair they move to the query,
    // which is what lets the selection survive a reload.
    await findWalletPage.togglePersona("Finance")
    await expect(page).toHaveURL(/\/find-wallet\/\?personas=nfts,finance$/)
    expect(await findWalletPage.getResultsCount()).toBeLessThanOrEqual(nftCount)
    await expect(findWalletPage.personaCheckbox("Finance")).toBeChecked()

    await page.reload()
    await expect(findWalletPage.personaCheckbox("NFTs")).toBeChecked()
    await expect(findWalletPage.personaCheckbox("Finance")).toBeChecked()

    await findWalletPage.togglePersona("Finance")
    await expect(page).toHaveURL(/\/find-wallet\/personas\/nfts\/$/)
    expect(await findWalletPage.getResultsCount()).toBe(nftCount)
  })

  test("persona deep-link pre-selects the card", async ({ page }) => {
    await page.goto("/wallets/find-wallet/personas/nfts/")
    await expect(findWalletPage.personaCheckbox("NFTs")).toBeChecked()
    const count = await findWalletPage.getResultsCount()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThan(await findWalletPage.getTotalCount())
  })

  test("device filter narrows the results and lands in the URL", async ({
    page,
  }) => {
    const initialCount = await findWalletPage.getResultsCount()
    await findWalletPage.toggleDeviceFilter("Hardware")
    await findWalletPage.waitForResultsChange(initialCount)
    expect(await findWalletPage.getResultsCount()).toBeLessThan(initialCount)
    await expect(page).toHaveURL(/\?devices=hardware$/)
  })

  test("filter deep-link applies on load", async ({ page }) => {
    await page.goto("/wallets/find-wallet/?devices=hardware")
    await expect(async () => {
      expect(await findWalletPage.getResultsCount()).toBeLessThan(
        await findWalletPage.getTotalCount()
      )
    }).toPass()
    await expect(page).toHaveURL(/\?devices=hardware$/)
  })

  test("advanced filter narrows the results", async () => {
    const initialCount = await findWalletPage.getResultsCount()
    await findWalletPage.toggleAdvancedFilter("Multisig")
    await findWalletPage.waitForResultsChange(initialCount)
    expect(await findWalletPage.getResultsCount()).toBeLessThan(initialCount)
  })

  // Client-side modal: the URL never changes, the card link stays crawlable.
  test("wallet card opens a detail modal and closes", async ({ page }) => {
    await findWalletPage.openWalletDetail("metamask")
    await expect(findWalletPage.detailDialog).toBeVisible()
    await expect(findWalletPage.detailDialog).toContainText("MetaMask")
    await expect(page).toHaveURL(/\/find-wallet\/$/)

    await findWalletPage.closeDialog()
    await expect(findWalletPage.detailDialog).toBeHidden()
    await expect(page).toHaveURL(/\/find-wallet\/$/)
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

  test("modal 'Full details' leads to the standalone page", async ({
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
      has: page.getByRole("heading", {
        name: testData.content.headings.findWalletRelated,
      }),
    })
    await expect(related).toBeVisible()
    await expect(
      related.locator('a[href*="/find-wallet/"]').first()
    ).toBeVisible()
  })
})
