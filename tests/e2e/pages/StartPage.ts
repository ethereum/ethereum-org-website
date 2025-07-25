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

  async connectWithExistingWallet() {
    await this.page
      .getByRole("paragraph")
      .filter({ hasText: "I have a wallet." })
      .click()
    await this.page.getByRole("button", { name: "Continue" }).click()
    await this.page
      .getByRole("button", { name: "Sign in with Ethereum" })
      .click()
    // Choose mock wallet option in RainbowKit modal
    await this.page.getByTestId("rk-wallet-option-mock").click()
    // Verify wallet connected
    await expect(
      this.page
        .getByRole("paragraph")
        .filter({ hasText: "This is your account" })
    ).toBeVisible()
  }

  async continueToUseAppsStep() {
    await this.page.getByRole("button", { name: "Lets continue" }).click()
    await expect(
      this.page.getByRole("heading", { name: "Let Use Some Apps" })
    ).toBeVisible()
  }
}
