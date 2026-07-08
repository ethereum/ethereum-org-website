import { expect, Page } from "@playwright/test"

import { testData } from "../fixtures/testData"

import { BasePage } from "./BasePage"

/**
 * Page Object Model for the Home page
 */
export class HomePage extends BasePage {
  private readonly url = "/"

  constructor(page: Page) {
    super(page)
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
    const searchBtn = await this.getSearchButton()
    await searchBtn.click()

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
    const buildButton = this.primaryNav.getByRole("button", {
      name: testData.navigation.menu[2].name, // Build
    })
    await buildButton.hover()

    const builderHomeLink = this.primaryNav.getByRole("link", {
      name: testData.navigation.menu[2].subsections[0], // Builder's home
    })
    await builderHomeLink.click()

    await this.assertUrlMatches(/.*\/developers/)
  }

  /**
   * Open mobile menu
   */
  async openMobileMenu() {
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
