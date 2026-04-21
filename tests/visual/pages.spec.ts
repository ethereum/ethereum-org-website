import { takeSnapshot, test } from "@chromatic-com/playwright"

/**
 * Full-page visual regression tests for Chromatic.
 *
 * Each test navigates to a representative page, waits for the content
 * to stabilize, then captures a DOM archive via takeSnapshot().
 * Archives are uploaded to Chromatic for pixel-diffing.
 *
 * Run against a production build with USE_MOCK_DATA=true for deterministic content:
 *   USE_MOCK_DATA=true pnpm build && pnpm start
 *   pnpm test:visual
 */

// Each entry covers either a distinct app route or one layout from src/layouts/.
// App-route pages all share BaseLayout; md-slug pages additionally exercise
// their template's layout component.
const pages = [
  // App routes
  { name: "Homepage", path: "/en/", stableSelector: "h1" },
  { name: "Wallets", path: "/en/wallets/", stableSelector: "h1" },
  { name: "Staking", path: "/en/staking/", stableSelector: "h1" },
  { name: "Developers", path: "/en/developers/", stableSelector: "h1" },
  { name: "Apps", path: "/en/apps/", stableSelector: "h1" },
  {
    name: "Community Events",
    path: "/en/community/events/",
    stableSelector: "h1",
  },
  { name: "Run a Node", path: "/en/run-a-node/", stableSelector: "h1" },
  { name: "History", path: "/en/history/", stableSelector: "h1" },
  { name: "Get ETH", path: "/en/get-eth/", stableSelector: "h1" },
  {
    name: "Find Wallet",
    path: "/en/wallets/find-wallet/",
    stableSelector: "h1",
  },

  // src/layouts/ coverage (one representative per layout)
  // StaticLayout
  { name: "Bridges", path: "/en/bridges/", stableSelector: "h1" },
  // DocsLayout
  {
    name: "Docs - Smart Contracts",
    path: "/en/developers/docs/smart-contracts/",
    stableSelector: "article#main-content",
  },
  // TutorialLayout
  {
    name: "Tutorial - Hello World",
    path: "/en/developers/tutorials/hello-world-smart-contract/",
    stableSelector: "h1",
  },
  // md/StakingLayout
  { name: "Staking - Solo", path: "/en/staking/solo/", stableSelector: "h1" },
  // md/RoadmapLayout
  {
    name: "Roadmap - Security",
    path: "/en/roadmap/security/",
    stableSelector: "h1",
  },
  // md/UpgradeLayout
  { name: "Roadmap - Merge", path: "/en/roadmap/merge/", stableSelector: "h1" },
  // md/UseCasesLayout (ContentLayout is covered transitively by any md layout)
  { name: "DeFi", path: "/en/defi/", stableSelector: "h1" },
]

test.describe("Page Visual Tests", () => {
  for (const { name, path, stableSelector } of pages) {
    test(name, async ({ page }, testInfo) => {
      await page.goto(path, { waitUntil: "networkidle" })
      await page.locator(stableSelector).first().waitFor({ state: "visible" })
      await page
        .locator('nav[aria-label="Primary"] .animate-pulse-light')
        .first()
        .waitFor({ state: "detached" })
      await takeSnapshot(page, testInfo)
    })
  }
})
