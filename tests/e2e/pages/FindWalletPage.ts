import { expect, Locator, Page } from "@playwright/test"

import { testData } from "../fixtures/testData"

import { BasePage } from "./BasePage"

/**
 * Page Object Model for the revamped Find Wallet page (catalog architecture).
 */
export class FindWalletPage extends BasePage {
  private readonly url = "/wallets/find-wallet"

  private readonly pageHeading: Locator
  // Results count line: "Browse all wallets: <shown> / <total>". The regex
  // requires the "/ total" so it doesn't also match the "all wallets" persona
  // card (which reads "… available").
  private readonly resultsCounter: Locator

  constructor(page: Page) {
    super(page)
    this.pageHeading = page.getByRole("heading", {
      name: testData.content.headings.findWallet,
    })
    this.resultsCounter = page.getByText(/Browse all wallets:\s*\d+\s*\/\s*\d+/)
  }

  async goto() {
    await this.navigateTo(this.url)
  }

  async verifyPageLoaded() {
    await expect(this.pageHeading).toBeVisible()
  }

  /** Number of wallets currently shown (the first number in the count line). */
  async getResultsCount(): Promise<number> {
    const text = await this.resultsCounter.textContent()
    const match = text?.match(/:\s*(\d+)\s*\//)
    if (!match) {
      throw new Error(`Could not parse results counter: ${text}`)
    }
    return parseInt(match[1], 10)
  }

  /** Navigate via a persona card (a real `<Link>`, not a client filter). */
  async openPersona(personaSlug: string) {
    await this.page.locator(`a[href*="/personas/${personaSlug}/"]`).click()
    await this.assertUrlMatches(new RegExp(`/personas/${personaSlug}/?$`))
  }

  /** Toggle a device filter checkbox by its visible label (viewport-agnostic). */
  async toggleDeviceFilter(label: string) {
    await this.page
      .locator("label:visible")
      .filter({ hasText: new RegExp(`^${label}`) })
      .first()
      .click()
  }

  /** Wait until the shown count differs from `initialCount`. */
  async waitForResultsChange(initialCount: number, timeout = 10000) {
    await expect(async () => {
      expect(await this.getResultsCount()).not.toBe(initialCount)
    }).toPass({ timeout })
  }

  /** Open a wallet's detail by clicking its card link (intercepted modal). */
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
