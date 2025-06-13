import { expect, takeSnapshot, test } from "@chromatic-com/playwright"

import { breakpointAsNumber } from "@/lib/utils/screen"

const PAGE_URL = "/"

test.beforeEach(async ({ page }) => {
  await page.goto(PAGE_URL)
})

test.describe("Home Page", () => {
  test("loads successfully", async ({ page }, testInfo) => {
    await expect(page).toHaveTitle(/Ethereum.org/)

    await takeSnapshot(page, "home-initial", testInfo)
  })

  test("search functionality", async ({ page }) => {
    const viewport = page.viewportSize()
    const isMobile = viewport && viewport.width <= breakpointAsNumber.md
    if (isMobile) {
      await page.getByTestId("search-button-mobile").first().click()
    } else {
      await page.getByTestId("search-input-button").first().click()
    }
    await page.getByPlaceholder("Search").fill("smart contract")

    await expect(page.getByRole("listbox").first()).toBeVisible()
  })

  test("main navigation - desktop", async ({ page }) => {
    // Only run this test for desktop projects
    const viewport = page.viewportSize()
    const isMobile = viewport && viewport.width <= breakpointAsNumber.md
    test.skip(!!isMobile, "This test is for desktop viewports only")

    const nav = page.getByRole("navigation", { name: "Primary" })
    await expect(nav.getByRole("button", { name: "Learn" })).toBeVisible()
    await expect(nav.getByRole("button", { name: "Use" })).toBeVisible()
    await expect(nav.getByRole("button", { name: "Build" })).toBeVisible()

    // Hover over Build button to show submenu
    await nav.getByRole("button", { name: "Build" }).hover()
    await nav.getByRole("link", { name: "Builder's home" }).click()

    await expect(page).toHaveURL(/.*\/developers/)
  })

  test("navigation menu - mobile", async ({ page }, testInfo) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: breakpointAsNumber.sm, height: 800 })

    const nav = page.getByRole("navigation", { name: "Primary" })
    const menuButton = nav.getByRole("button", {
      name: /toggle menu button/i,
    })
    await expect(menuButton).toBeVisible()

    // Open the mobile menu
    await menuButton.click()

    await takeSnapshot(page, "home-menu-open", testInfo)

    // Check that navigation links are visible in the mobile menu
    const sidebar = page.getByRole("dialog", { name: /ethereum.org/i })
    await expect(sidebar).toBeVisible()
    await expect(sidebar.getByRole("button", { name: "Learn" })).toBeVisible()
    await expect(sidebar.getByRole("button", { name: "Use" })).toBeVisible()
    await expect(sidebar.getByRole("button", { name: "Build" })).toBeVisible()

    // Click on Learn accordion button to show submenu
    await sidebar.getByRole("button", { name: "Learn" }).click()
    await sidebar.getByRole("button", { name: /^basics/i }).click()

    const whatIsEthereum = sidebar.getByRole("link", {
      name: /^what is ethereum/i,
    })
    await expect(whatIsEthereum).toBeVisible()
    await whatIsEthereum.click()

    await expect(page).toHaveURL(/.*\/what-is-ethereum/)
  })
})
