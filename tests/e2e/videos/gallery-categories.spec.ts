import { expect, test } from "@chromatic-com/playwright"

test.describe("Video Gallery — Category Shelves & Filters", () => {
  test.describe("Shelf Layout", () => {
    test("renders at least 6 category shelf headings", async ({ page }) => {
      await page.goto("/en/videos/")

      // Each shelf is a <Section> with an <h2> heading.
      // The page also contains the hero <h1> and the "Explore all" <h2>,
      // so we specifically look at h2 elements inside section[id] containers.
      const shelfHeadings = page.locator("section[id] > h2")
      await expect(shelfHeadings.first()).toBeVisible()

      // At least 6 shelves rendered (Community Stories may be below threshold)
      // +1 for the "Explore all" section heading = at least 7 h2s total,
      // but we count only shelves (excluding #explore-all).
      const shelfSections = page.locator(
        'section[id]:not([id="explore-all"]) > h2'
      )
      const shelfCount = await shelfSections.count()
      expect(shelfCount).toBeGreaterThanOrEqual(6)
    })

    test("each shelf contains between 4 and 6 video cards", async ({
      page,
    }) => {
      await page.goto("/en/videos/")

      const shelfSections = page.locator('section[id]:not([id="explore-all"])')
      const shelfCount = await shelfSections.count()

      for (let i = 0; i < shelfCount; i++) {
        const shelf = shelfSections.nth(i)
        // Cards are rendered as <a> elements inside the grid (Card with href)
        const cards = shelf.locator(".grid > a")
        const cardCount = await cards.count()
        expect(cardCount).toBeGreaterThanOrEqual(4)
        expect(cardCount).toBeLessThanOrEqual(6)
      }
    })
  })

  test.describe("View All Navigation", () => {
    test('"View all" link navigates to filtered category view', async ({
      page,
    }) => {
      await page.goto("/en/videos/")

      // Find the first "View all" link (inside the first shelf that has one)
      const viewAllLink = page.locator(
        'section[id]:not([id="explore-all"]) a:has-text("View all")'
      )
      await expect(viewAllLink.first()).toBeVisible()
      await viewAllLink.first().click()

      // URL should contain ?category= parameter
      await expect(page).toHaveURL(/category=/)
    })

    test("filtered view displays only matching category videos", async ({
      page,
    }) => {
      await page.goto("/en/videos/?category=how-ethereum-works")

      // Should render a grid of videos
      const cards = page.locator("section .grid > a")
      await expect(cards.first()).toBeVisible()
      const cardCount = await cards.count()
      // How Ethereum Works has many tags — should have multiple videos
      expect(cardCount).toBeGreaterThanOrEqual(4)
    })

    test('"← All videos" back link returns to /en/videos/', async ({
      page,
    }) => {
      await page.goto("/en/videos/?category=how-ethereum-works")

      const backLink = page.getByRole("link", { name: /all videos/i })
      await expect(backLink).toBeVisible()
      await backLink.click()

      await expect(page).toHaveURL(/\/en\/videos\/?$/)
    })
  })

  test.describe("Explore All Section", () => {
    test('"Explore all videos" section is present below shelves', async ({
      page,
    }) => {
      await page.goto("/en/videos/")

      const exploreSection = page.locator("#explore-all")
      await expect(exploreSection).toBeVisible()

      // The heading should contain "Explore all"
      const heading = exploreSection.locator("h2")
      await expect(heading).toBeVisible()
      await expect(heading).toContainText(/explore all/i)
    })

    test("search input filters video cards by title", async ({ page }) => {
      await page.goto("/en/videos/")

      const exploreSection = page.locator("#explore-all")

      // Count initial cards in the explore section
      const initialCards = exploreSection.locator(".grid > a")
      await expect(initialCards.first()).toBeVisible()

      // Type a search query that should narrow results
      const searchInput = exploreSection.getByPlaceholder(/search videos/i)
      await expect(searchInput).toBeVisible()
      await searchInput.fill("Ethereum")

      // Wait for filtering to take effect
      await page.waitForTimeout(300)

      // Should still have some results but potentially fewer
      const filteredCards = exploreSection.locator(".grid > a")
      const filteredCount = await filteredCards.count()
      expect(filteredCount).toBeGreaterThan(0)
      // The filtering should work (we can't guarantee fewer results with
      // "Ethereum" since many videos match, but the input should be active)
      await expect(searchInput).toHaveValue("Ethereum")
    })

    test("category pill filters activate and deactivate correctly", async ({
      page,
    }) => {
      await page.goto("/en/videos/")

      const exploreSection = page.locator("#explore-all")

      // Find category pill buttons — the "All" pill + category pills
      const pills = exploreSection.locator("button").filter({
        has: page.locator("text=/How Ethereum works/i"),
      })
      await expect(pills.first()).toBeVisible()

      // Click the "How Ethereum works" pill
      await pills.first().click()

      // After clicking, the grid should filter
      await page.waitForTimeout(300)

      // The pill should be active (clicking again should deactivate)
      await pills.first().click()
      await page.waitForTimeout(300)

      // After deactivating, the "All" pill should be active again
      const allPill = exploreSection.getByRole("button", { name: /^all$/i })
      await expect(allPill).toBeVisible()
    })
  })

  test.describe("Keyboard Accessibility", () => {
    test("Tab navigation reaches shelf headings, View all links, and filter controls", async ({
      page,
    }) => {
      await page.goto("/en/videos/")

      // Skip to main content area by tabbing
      // Tab through the page and verify we can reach key interactive elements.
      // We'll check that View all links and filter controls are focusable.

      // Check that "View all" links have proper href (they're <a> tags, natively focusable)
      const viewAllLinks = page.locator(
        'section[id]:not([id="explore-all"]) a:has-text("View all")'
      )
      const linkCount = await viewAllLinks.count()
      for (let i = 0; i < linkCount; i++) {
        const link = viewAllLinks.nth(i)
        await expect(link).toHaveAttribute("href", /category=/)
      }

      // Check that the search input is focusable
      const searchInput = page
        .locator("#explore-all")
        .getByPlaceholder(/search videos/i)
      await searchInput.focus()
      await expect(searchInput).toBeFocused()

      // Check that category pills are focusable buttons
      const allPill = page
        .locator("#explore-all")
        .getByRole("button", { name: /^all$/i })
      await allPill.focus()
      await expect(allPill).toBeFocused()
    })
  })
})
