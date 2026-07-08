import { expect, Locator, Page } from "@playwright/test"

import { BasePage } from "./BasePage"

/**
 * Generic Page Object Model for markdown pages
 */
export class MdPage extends BasePage {
  protected url: string

  constructor(page: Page, url: string) {
    super(page)
    this.url = url
  }

  /**
   * Navigate to the markdown page
   */
  async goto() {
    await this.navigateTo(this.url)
  }

  /**
   * Verify the markdown page has loaded successfully
   */
  async verifyPageLoaded() {
    await this.waitForPageReady()
    await expect(this.page.locator("main")).toBeVisible()
  }

  /**
   * Find a link by text pattern and return its locator
   */
  getLinkByText(textPattern: string | RegExp): Locator {
    return this.page.getByRole("link", { name: textPattern })
  }

  /**
   * Verify a link is visible
   */
  async verifyLinkVisible(textPattern: string | RegExp) {
    const link = this.getLinkByText(textPattern)
    await expect(link).toBeVisible()
  }

  /**
   * Get the href attribute of a link
   */
  async getLinkHref(textPattern: string | RegExp): Promise<string | null> {
    const link = this.getLinkByText(textPattern)
    return await link.getAttribute("href")
  }

  /**
   * Verify a link has the correct href
   */
  async verifyLinkHref(textPattern: string | RegExp, expectedPath: string) {
    const href = await this.getLinkHref(textPattern)
    expect(href).toContain(expectedPath)
  }
}
