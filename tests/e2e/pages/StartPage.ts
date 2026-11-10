import { expect, Page } from "@playwright/test"

import { testData } from "../fixtures/testData"

import { BasePage } from "./BasePage"

/**
 * Page Object Model for the Start page
 */
export class StartPage extends BasePage {
  private readonly url = "/en/start"

  constructor(page: Page) {
    super(page)
  }

  /**
   * Navigate to the start page
   */
  async goto() {
    await this.navigateTo(this.url)
  }

  /**
   * Verify the start page has loaded successfully
   */
  async verifyPageLoaded() {
    await this.assertTitleContains(testData.content.headings.startPage)
  }

  /**
   * Navigate through the start flow and open the wallet connection modal.
   */
  async openWalletConnectionModal() {
    await this.page.getByRole("checkbox", { name: "I have a wallet." }).click()
    await this.page.getByRole("button", { name: "Continue" }).click()
    // RainbowKit hands out a noop openConnectModal until wagmi finishes reconnecting
    const dialog = this.page.getByRole("dialog")
    await expect(async () => {
      if (!(await dialog.isVisible()))
        await this.page
          .getByRole("button", { name: "Sign in with Ethereum" })
          .click()
      await expect(dialog).toBeVisible({ timeout: 2000 })
    }).toPass()
  }
}
