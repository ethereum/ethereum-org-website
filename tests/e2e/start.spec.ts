import { expect, test } from "@playwright/test"

import { StartPage } from "./pages"

test.describe("Start Page", () => {
  test("loads successfully", async ({ page }) => {
    const startPage = new StartPage(page)
    await startPage.goto()
    await startPage.verifyPageLoaded()
  })

  test("wallet modal opens with wallet options", async ({ page }) => {
    const startPage = new StartPage(page)
    await startPage.goto()
    await startPage.verifyPageLoaded()

    await startPage.openWalletConnectionModal()

    const walletModal = page.getByRole("dialog")
    await expect(walletModal.getByText("Connect a Wallet")).toBeVisible()
    await expect(walletModal.getByText("MetaMask")).toBeVisible()
    await expect(walletModal.getByText("Coinbase")).toBeVisible()
    await expect(walletModal.getByText("Rainbow")).toBeVisible()
  })
})
