import { expect, Locator, Page } from "@playwright/test"

import { testData } from "../fixtures/testData"

import { BasePage } from "./BasePage"

/**
 * Page Object Model for the Find Wallet page
 */
export class FindWalletPage extends BasePage {
  private readonly url = "/wallets/find-wallet"

  // Locators
  private readonly pageHeading: Locator
  private readonly presetFiltersContainer: Locator
  private readonly filtersContainer: Locator
  private readonly mobileFiltersButton: Locator
  private readonly mobileFiltersSubmitButton: Locator
  private readonly walletTable: Locator
  private readonly walletRows: Locator
  private readonly rowCounter: Locator

  constructor(page: Page) {
    super(page)
    this.pageHeading = page.getByRole("heading", {
      name: testData.content.headings.findWallet,
    })
    this.presetFiltersContainer = page.getByTestId("preset-filters-container")
    this.filtersContainer = page.getByTestId("filters-container")
    this.mobileFiltersButton = page.getByTestId("mobile-filters-button")
    this.mobileFiltersSubmitButton = page.getByTestId(
      "mobile-filters-submit-button"
    )
    this.walletTable = page.locator("table")
    this.walletRows = page
      .locator("table tbody tr")
      .filter({ has: page.locator("td") })
    this.rowCounter = page.getByText(/Showing all wallets \(\d+\)/i)
  }

  /**
   * Navigate to the find wallet page
   */
  async goto() {
    await this.navigateTo(this.url)
  }

  /**
   * Verify the find wallet page has loaded successfully
   */
  async verifyPageLoaded() {
    await expect(this.pageHeading).toBeVisible()
  }

  /**
   * Click on a persona filter and return the expected count
   */
  async selectPersonaFilter(personaName: string) {
    const personaButton = this.presetFiltersContainer.getByRole("button", {
      name: new RegExp(personaName, "i"),
    })

    await personaButton.click()

    // Extract the counter from the button text
    const counterText = await personaButton.textContent()
    const match = counterText?.match(/\((\d+)\)/)

    if (!match) {
      throw new Error(
        `Could not extract count from persona button: ${counterText}`
      )
    }

    return parseInt(match[1], 10)
  }

  /**
   * Get the current number of visible wallet rows
   */
  async getVisibleWalletCount() {
    return await this.walletRows.count()
  }

  /**
   * Verify the persona filter count matches the displayed rows
   */
  async verifyPersonaFilterCount(expectedCount: number) {
    const actualCount = await this.getVisibleWalletCount()
    expect(actualCount).toBe(expectedCount)
  }

  /**
   * Expand the first wallet row
   */
  async expandFirstWallet() {
    const firstRow = this.walletRows.first()
    await firstRow.click()
  }

  /**
   * Verify wallet expansion shows links section
   */
  async verifyWalletExpanded() {
    await expect(
      this.page.getByRole("heading", { name: /Links/i })
    ).toBeVisible()
  }

  /**
   * Apply device filter on desktop
   */
  async applyDesktopDeviceFilter(): Promise<{
    initialCount: number
    osOptions: string[]
  }> {
    const initialCount = await this.getVisibleWalletCount()

    // Verify device accordion is expanded
    const deviceAccordion = this.filtersContainer.getByRole("button", {
      name: /Device/i,
    })
    await expect(deviceAccordion).toHaveAttribute("aria-expanded", "true")

    // Click the Desktop filter
    const deviceRegion = this.filtersContainer
      .getByRole("heading", { name: /device/i })
      .locator("..")
    const desktopLabel = deviceRegion.getByText("Desktop")
    const desktopLabelParent = desktopLabel.locator("../..")
    const desktopCheckbox = desktopLabelParent.locator("button")
    await desktopCheckbox.click()

    // Get OS options
    const osOptions = await desktopLabelParent
      .locator("..")
      .locator("label span.select-none")
      .allTextContents()

    return { initialCount, osOptions }
  }

  /**
   * Apply mobile device filter
   */
  async applyMobileDeviceFilter(): Promise<{
    initialCount: number
    osOptions: string[]
  }> {
    const isMobile = await this.isMobileViewport()
    if (!isMobile) {
      await this.page.setViewportSize({ width: 375, height: 800 })
    }

    const initialCount = await this.getVisibleWalletCount()

    // Open mobile filters
    await this.mobileFiltersButton.click()

    // Verify device accordion is expanded
    const deviceAccordion = this.page.getByRole("button", { name: /Device/i })
    await expect(deviceAccordion).toHaveAttribute("aria-expanded", "true")

    // Click the Mobile filter
    const deviceRegion = this.page
      .getByRole("heading", { name: /device/i })
      .locator("..")
    const mobileLabel = deviceRegion.getByText(/mobile/i)
    const mobileLabelParent = mobileLabel.locator("../..")
    const mobileCheckbox = mobileLabelParent.locator("button")
    await mobileCheckbox.click()

    // Get OS options
    const osOptions = await mobileLabelParent
      .locator("..")
      .locator("label span.select-none")
      .allTextContents()

    // Close filters
    await this.mobileFiltersSubmitButton.click()

    return { initialCount, osOptions }
  }

  /**
   * Wait for wallet count to change from initial value
   */
  async waitForFilterResults(initialCount: number, timeout = 10000) {
    await expect(async () => {
      const newCount = await this.getVisibleWalletCount()
      expect(newCount).not.toBe(initialCount)
    }).toPass({ timeout })
  }

  /**
   * Verify filtered results contain expected OS options
   */
  async verifyFilteredResults(osOptions: string[]) {
    const rowCount = await this.getVisibleWalletCount()

    for (let i = 0; i < rowCount; i++) {
      const row = this.walletRows.nth(i)
      const text = await row.textContent()

      const containsOsOption = text && osOptions.some((os) => text.includes(os))
      expect(containsOsOption).toBeTruthy()
    }
  }

  /**
   * Verify row counter matches actual table rows
   */
  async verifyRowCounter() {
    const actualCount = await this.getVisibleWalletCount()
    const counterText = await this.rowCounter.textContent()

    expect(counterText).toBe(`Showing all wallets (${actualCount})`)
  }
}
