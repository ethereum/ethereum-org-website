import { expect, Locator, Page } from "@playwright/test"

import { breakpointAsNumber } from "@/lib/utils/screen"

/**
 * Base page class with common functionality for all pages
 */
export class BasePage {
  // Locators
  readonly searchButton: Locator
  readonly searchInputButton: Locator
  readonly searchInput: Locator
  readonly searchModal: Locator
  readonly searchResults: Locator
  readonly primaryNav: Locator
  readonly mobileMenuButton: Locator
  readonly mobileSidebar: Locator

  constructor(protected page: Page) {
    this.searchButton = page.getByTestId("search-button")
    this.searchInputButton = page.getByTestId("search-input-button")
    this.searchInput = page.getByPlaceholder("Search")
    this.searchModal = page.getByTestId("search-modal")
    this.searchResults = page.getByRole("listbox")
    this.primaryNav = page.getByRole("navigation", { name: "Primary" })
    this.mobileMenuButton = this.primaryNav.getByRole("button", {
      name: /toggle menu button/i,
    })
    this.mobileSidebar = page.getByRole("dialog", { name: /ethereum.org/i })
  }

  /**
   * Check if the current viewport is mobile
   */
  async isMobileViewport(): Promise<boolean> {
    const viewport = this.page.viewportSize()
    return viewport ? viewport.width <= breakpointAsNumber.md : false
  }

  /**
   * Wait for page to be fully loaded with all network requests completed
   */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState()
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded()
  }

  /**
   * Wait for an element to be visible with custom timeout
   */
  async waitForElement(selector: string, timeout = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { state: "visible", timeout })
  }

  /**
   * Check if an element exists (without throwing if not found)
   */
  async elementExists(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout: 1000 })
      return true
    } catch {
      return false
    }
  }

  /**
   * Navigate to a specific URL and wait for load
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url)
    await this.waitForPageReady()
  }

  /**
   * Get the current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url()
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return this.page.title()
  }

  /**
   * Assert page title contains expected text
   */
  async assertTitleContains(expectedText: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(expectedText, "i"))
  }

  /**
   * Assert current URL matches pattern
   */
  async assertUrlMatches(pattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern)
  }

  /**
   * Open language picker in desktop view
   */
  async openLanguagePickerDesktop(): Promise<void> {
    await this.primaryNav.getByRole("button", { name: /languages/i }).click()
  }

  /**
   * Open language picker in mobile view
   */
  async openLanguagePickerMobile(): Promise<void> {
    await this.mobileMenuButton.click()
    await this.mobileSidebar.getByTestId("mobile-menu-language-picker").click()
  }

  /**
   * Open language picker
   */
  async openLanguagePicker(): Promise<void> {
    const isMobile = await this.isMobileViewport()
    if (isMobile) {
      await this.openLanguagePickerMobile()
    } else {
      await this.openLanguagePickerDesktop()
    }
  }

  async getSearchButton(): Promise<Locator> {
    const isMobile = await this.isMobileViewport()
    if (isMobile) {
      return this.searchButton
    } else {
      return this.searchInputButton
    }
  }

  /**
   * Switch to a specific language
   */
  async switchToLanguage(
    langFilter: string,
    langOptionRegex: RegExp
  ): Promise<void> {
    const searchInput = this.page.getByPlaceholder(/type to filter/i)
    await expect(searchInput).toBeVisible()
    await searchInput.fill(langFilter)
    const langOption = this.page.getByRole("option", { name: langOptionRegex })
    await expect(langOption).toBeVisible()
    await langOption.click()
  }
}
