import { expect, Page } from "@playwright/test"

import { breakpointAsNumber } from "@/lib/utils/screen"

/**
 * Base page class with common functionality for all pages
 */
export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Check if the current viewport is mobile
   */
  async isMobileViewport(): Promise<boolean> {
    const viewport = this.page.viewportSize()
    return viewport ? viewport.width <= breakpointAsNumber.md : false
  }

  /**
   * Wait for page to be loaded and ready
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle")
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
    await this.waitForPageLoad()
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
    const nav = this.page.getByRole("navigation", { name: /primary/i })
    const langButton = nav.getByRole("button", { name: /languages/i })
    await expect(langButton).toBeVisible()
    await langButton.click()
  }

  /**
   * Open language picker in mobile view
   */
  async openLanguagePickerMobile(): Promise<void> {
    const nav = this.page.getByRole("navigation", { name: /primary/i })
    const menuButton = nav.getByRole("button", {
      name: /toggle menu button/i,
    })
    await expect(menuButton).toBeVisible()
    await menuButton.click()
    const sidebar = this.page.getByRole("dialog", { name: /ethereum.org/i })
    await expect(sidebar).toBeVisible()
    const langButton = sidebar.getByRole("button", { name: /languages/i })
    await expect(langButton).toBeVisible()
    await langButton.click()
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
