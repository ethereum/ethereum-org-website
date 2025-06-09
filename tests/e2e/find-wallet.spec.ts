import { expect, takeSnapshot, test } from "@chromatic-com/playwright"

import { breakpointAsNumber } from "@/lib/utils/screen"

const PAGE_URL = "/wallets/find-wallet"

test.beforeEach(async ({ page }) => {
  await page.goto(PAGE_URL)
})

test.describe("Find Wallet Page", () => {
  test("loads successfully", async ({ page }, testInfo) => {
    await expect(
      page.getByRole("heading", { name: "Choose your wallet" })
    ).toBeVisible()
    await takeSnapshot(page, "find-wallet-initial", testInfo)
  })

  test("personas filter updates counter and list", async ({ page }) => {
    const presetFiltersContainer = page.getByTestId("preset-filters-container")

    // Click the first persona (e.g., New to crypto)
    const personaButton = presetFiltersContainer.getByRole("button", {
      name: /New to crypto/i,
    })
    await personaButton.click()
    // Extract the counter from the persona button
    const counterText = await personaButton.textContent()
    const match = counterText && counterText.match(/\((\d+)\)/)
    const personaCount = match ? parseInt(match[1], 10) : null
    // Count the number of visible rows in the table (excluding header)
    const rows = await page
      .locator("table tbody tr")
      .filter({ has: page.locator("td") })
      .count()
    expect(personaCount).not.toBeNull()
    expect(rows).toBe(personaCount)
  })

  test("wallet list items expand correctly", async ({ page }) => {
    // Click the first wallet row to expand
    const firstRow = page.locator("table tbody tr").first()
    await firstRow.click()
    // Check that the expanded content is visible (look for 'Links' heading)
    await expect(page.getByRole("heading", { name: /Links/i })).toBeVisible()
  })

  test("sidebar filters - desktop", async ({ page }) => {
    // Only run this test for desktop projects
    const viewport = page.viewportSize()
    const isMobile = viewport && viewport.width <= breakpointAsNumber.md
    test.skip(!!isMobile, "This test is for desktop viewports only")

    // Get the initial row count
    const rows = page
      .locator("table tbody tr")
      .filter({ has: page.locator("td") })
    const initialRowCount = await rows.count()

    const filtersContainer = page.getByTestId("filters-container")

    // Device filter accordion should be expanded by default
    const deviceAccordion = filtersContainer.getByRole("button", {
      name: /Device/i,
    })
    await expect(deviceAccordion).toHaveAttribute("aria-expanded", "true")

    // Click the Desktop filter (custom selector: button next to 'Desktop' text)
    const deviceRegion = filtersContainer
      .getByRole("heading", { name: /device/i })
      .locator("..")
    const desktopLabel = deviceRegion.getByText("Desktop")
    const desktopLabelParent = desktopLabel.locator("../..")
    const desktopCheckbox = desktopLabelParent.locator("button")
    await desktopCheckbox.click()

    // Grab all OS options from the Device filter section
    const osOptionLabels = await desktopLabelParent
      .locator("..")
      .locator("label span.select-none")
      .allTextContents()

    // Wait for the row count to change from the initial value
    await expect(async () => {
      const newCount = await rows.count()
      expect(newCount).not.toBe(initialRowCount)
    }).toPass()

    // Check that every visible row contains at least one of the OS options
    const rowCount = await rows.count()
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i)
      const text = await row.textContent()
      expect(
        text && osOptionLabels.some((os) => text.includes(os))
      ).toBeTruthy()
    }

    // Check that the row counter matches the number of rows in the table
    const rowCounter = await page
      .getByText(/Showing all wallets \(\d+\)/i)
      .textContent()
    expect(rowCounter).toBe(`Showing all wallets (${rowCount})`)
  })

  test("sidebar filters - mobile", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: breakpointAsNumber.sm, height: 800 })

    // Get the initial row count
    const rows = page
      .locator("table tbody tr")
      .filter({ has: page.locator("td") })
    const initialRowCount = await rows.count()

    // Open mobile filters drawer
    const filterButton = page.getByTestId("mobile-filters-button")
    await filterButton.click()
    // Click the Device filter accordion
    const deviceAccordion = page.getByRole("button", { name: /Device/i })
    await expect(deviceAccordion).toHaveAttribute("aria-expanded", "true")

    // Click the Mobile filter
    const deviceRegion = page
      .getByRole("heading", { name: /device/i })
      .locator("..")
    const mobileLabel = deviceRegion.getByText(/mobile/i)
    const mobileLabelParent = mobileLabel.locator("../..")
    const mobileCheckbox = mobileLabelParent.locator("button")
    await mobileCheckbox.click()

    // Grab all OS options from the Device filter section
    const osOptionLabels = await mobileLabelParent
      .locator("..")
      .locator("label span.select-none")
      .allTextContents()

    // Close the filters drawer
    const closeButton = page.getByTestId("mobile-filters-submit-button")
    await closeButton.click()

    // Wait for the row count to change from the initial value
    await expect(async () => {
      const newCount = await rows.count()
      expect(newCount).not.toBe(initialRowCount)
    }).toPass()

    // Check that every visible row contains at least one of the OS options
    const rowCount = await rows.count()
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i)
      const text = await row.textContent()
      expect(
        text && osOptionLabels.some((os) => text.includes(os))
      ).toBeTruthy()
    }

    // Check that the row counter matches the number of rows in the table
    const rowCounter = await page
      .getByText(/Showing all wallets \(\d+\)/i)
      .textContent()
    expect(rowCounter).toBe(`Showing all wallets (${rowCount})`)
  })
})
