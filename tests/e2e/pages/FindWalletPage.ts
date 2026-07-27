import { expect, Locator, Page } from "@playwright/test"

import { testData } from "../fixtures/testData"

import { BasePage } from "./BasePage"

export class FindWalletPage extends BasePage {
  private readonly url = "/wallets/find-wallet"

  private readonly pageHeading: Locator
  // The "/ total" keeps this from matching a persona card's "… available".
  private readonly resultsCounter: Locator

  constructor(page: Page) {
    super(page)
    this.pageHeading = page.getByRole("heading", {
      name: testData.content.headings.findWallet,
    })
    this.resultsCounter = page.getByText(/Wallets found:\s*\d+\s*\/\s*\d+/)
  }

  async goto() {
    await this.navigateTo(this.url)
  }

  async verifyPageLoaded() {
    await expect(this.pageHeading).toBeVisible()
  }

  async getResultsCount(): Promise<number> {
    const text = await this.resultsCounter.textContent()
    const match = text?.match(/:\s*(\d+)\s*\//)
    if (!match) {
      throw new Error(`Could not parse results counter: ${text}`)
    }
    return parseInt(match[1], 10)
  }

  async openPersona(personaSlug: string) {
    await this.page.locator(`a[href*="/personas/${personaSlug}/"]`).click()
    await this.assertUrlMatches(new RegExp(`/personas/${personaSlug}/?$`))
  }

  /**
   * Below `lg` the panel isn't mounted until first open, so no filter label
   * exists to click. No-op on desktop.
   */
  private async openFiltersIfCollapsed() {
    const trigger = this.page.getByRole("button", { name: /^Filters/ })
    if (!(await trigger.isVisible())) return
    await trigger.click()
    await expect(
      this.page.getByRole("dialog", { name: /^Filters/ })
    ).toBeVisible()
  }

  async toggleDeviceFilter(label: string) {
    await this.openFiltersIfCollapsed()
    await this.clickFilterOption(label)
  }

  async toggleAdvancedFilter(label: string) {
    await this.openFiltersIfCollapsed()
    const group = this.page.getByRole("button", { name: /^Advanced filters/ })
    if ((await group.getAttribute("aria-expanded")) === "false") {
      await group.click()
    }
    await this.clickFilterOption(label)
  }

  private async clickFilterOption(label: string) {
    await this.page
      .locator("label:visible")
      .filter({ hasText: new RegExp(`^${label}`) })
      .first()
      .click()
  }

  async waitForResultsChange(initialCount: number, timeout = 10000) {
    await expect(async () => {
      expect(await this.getResultsCount()).not.toBe(initialCount)
    }).toPass({ timeout })
  }

  async openWalletDetail(walletSlug: string) {
    await this.page
      .locator(`a[href*="/find-wallet/${walletSlug}/"]`)
      .first()
      .click()
  }

  get detailDialog(): Locator {
    return this.page.getByRole("dialog")
  }

  async closeDialog() {
    await this.page.keyboard.press("Escape")
  }
}
