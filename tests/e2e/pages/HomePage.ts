import { expect, Locator, Page } from "@playwright/test"

import { testData } from "../fixtures/testData"

import { BasePage } from "./BasePage"

/**
 * Page Object Model for the Home page
 */
export class HomePage extends BasePage {
  private readonly url = "/"

  // Locators
  private readonly searchButtonMobile: Locator
  private readonly searchInputButton: Locator
  private readonly searchInput: Locator
  private readonly searchModal: Locator
  private readonly searchResults: Locator
  private readonly primaryNav: Locator
  private readonly mobileMenuButton: Locator
  private readonly mobileSidebar: Locator

  constructor(page: Page) {
    super(page)
    this.searchButtonMobile = page.getByTestId("search-button-mobile")
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
   * Navigate to the home page
   */
  async goto() {
    await this.navigateTo(this.url)
  }

  /**
   * Verify the home page has loaded successfully
   */
  async verifyPageLoaded() {
    await this.assertTitleContains(testData.content.headings.homepage)
  }

  /**
   * Perform a search action
   */
  async search(query: string) {
    const isMobile = await this.isMobileViewport()

    if (isMobile) {
      await this.searchButtonMobile.first().click()
    } else {
      await this.searchInputButton.first().click()
    }

    await this.searchInput.fill(query)
  }

  async verifyNoResults() {
    // No listbox, no results
    await expect(this.searchResults).not.toBeVisible()

    // No results text
    const noResults = this.searchModal.getByText(/no results/i)
    await expect(noResults).toBeVisible()
  }

  /**
   * Verify search results are displayed
   */
  async verifySearchResults() {
    await expect(this.searchResults.first()).toBeVisible()
  }

  /**
   * Navigate using the Build menu (desktop only)
   */
  async navigateToBuilderHome() {
    const buildButton = this.primaryNav.getByRole("button", { name: "Build" })
    await buildButton.hover()

    const builderHomeLink = this.primaryNav.getByRole("link", {
      name: "Builder's home",
    })
    await builderHomeLink.click()

    await this.assertUrlMatches(/.*\/developers/)
  }

  /**
   * Open mobile menu
   */
  async openMobileMenu() {
    const isMobile = await this.isMobileViewport()
    if (!isMobile) {
      // Force mobile viewport for testing
      await this.page.setViewportSize({ width: 375, height: 800 })
    }

    await expect(this.mobileMenuButton).toBeVisible()
    await this.mobileMenuButton.click()
    await expect(this.mobileSidebar).toBeVisible()
  }

  /**
   * Navigate using mobile menu
   */
  async navigateFromMobileMenu(
    section: string,
    subsection: string,
    link: string,
    expectedUrl: string | RegExp
  ) {
    // Click on main section
    const sectionButton = this.mobileSidebar.getByRole("button", {
      name: section,
    })
    await sectionButton.click()

    // Click on subsection
    const subsectionButton = this.mobileSidebar.getByRole("button", {
      name: new RegExp(`^${subsection}`, "i"),
    })
    await subsectionButton.click()

    // Click on final link
    const finalLink = this.mobileSidebar.getByRole("link", {
      name: new RegExp(`^${link}`, "i"),
    })
    await expect(finalLink).toBeVisible()
    await finalLink.click()

    await this.assertUrlMatches(expectedUrl)
  }

  /**
   * Verify main navigation items are visible (desktop)
   */
  async verifyDesktopNavigation() {
    for (const section of testData.navigation.menu) {
      await expect(
        this.primaryNav.getByRole("button", { name: section.name })
      ).toBeVisible()
    }
  }

  /**
   * Verify mobile navigation items are visible
   */
  async verifyMobileNavigation() {
    for (const section of testData.navigation.menu) {
      await expect(
        this.mobileSidebar.getByRole("button", { name: section.name })
      ).toBeVisible()
    }
  }
}
