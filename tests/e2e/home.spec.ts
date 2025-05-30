import { expect, test } from "@playwright/test"

import { breakpointAsNumber } from "@/lib/utils/screen"

test.describe("Homepage", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/Ethereum.org/)
  })

  test("search functionality", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("button", { name: "Search" }).click()
    await page.getByPlaceholder("Search").fill("smart contract")

    await expect(page.getByRole("listbox").first()).toBeVisible()
  })

  test("main navigation - desktop", async ({ page }) => {
    // Only run this test for desktop projects
    const viewport = page.viewportSize()
    const isMobile = viewport && viewport.width <= breakpointAsNumber.md
    test.skip(!!isMobile, "This test is for desktop viewports only")

    await page.goto("/")

    const nav = page.getByRole("navigation", { name: "Primary" })
    await expect(nav.getByRole("button", { name: "Learn" })).toBeVisible()
    await expect(nav.getByRole("button", { name: "Use" })).toBeVisible()
    await expect(nav.getByRole("button", { name: "Build" })).toBeVisible()

    // Hover over Build button to show submenu
    await nav.getByRole("button", { name: "Build" }).hover()
    await nav.getByRole("link", { name: "Builder's home" }).click()

    await expect(page).toHaveURL(/.*\/developers/)
  })

  test("navigation menu - mobile", async ({ page }) => {
    // Only run this test for mobile projects
    const viewport = page.viewportSize()
    const isMobile = viewport && viewport.width <= breakpointAsNumber.md
    test.skip(!isMobile, "This test is for mobile viewports only")

    await page.goto("/")

    const nav = page.getByRole("navigation", { name: "Primary" })
    const menuButton = nav.getByRole("button", {
      name: /toggle menu button/i,
    })
    await expect(menuButton).toBeVisible()

    // Open the mobile menu
    await menuButton.click()

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
