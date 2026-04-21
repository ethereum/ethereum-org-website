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
// their template's layout component. stableSelector defaults to "h1".
const pages: Array<{ name: string; path: string; stableSelector?: string }> = [
  // App routes
  { name: "Homepage", path: "/en/" },
  { name: "Wallets", path: "/en/wallets/" },
  { name: "Staking", path: "/en/staking/" },
  { name: "Developers", path: "/en/developers/" },
  { name: "Apps", path: "/en/apps/" },
  { name: "Community Events", path: "/en/community/events/" },
  { name: "Run a Node", path: "/en/run-a-node/" },
  { name: "History", path: "/en/history/" },
  { name: "Get ETH", path: "/en/get-eth/" },
  { name: "Find Wallet", path: "/en/wallets/find-wallet/" },

  // src/layouts/ coverage (one representative per layout)
  // StaticLayout
  { name: "Bridges", path: "/en/bridges/" },
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
  },
  // md/StakingLayout
  { name: "Staking - Solo", path: "/en/staking/solo/" },
  // md/RoadmapLayout
  { name: "Roadmap - Security", path: "/en/roadmap/security/" },
  // md/UpgradeLayout
  { name: "Roadmap - Merge", path: "/en/roadmap/merge/" },
  // md/UseCasesLayout (ContentLayout is covered transitively by any md layout)
  { name: "DeFi", path: "/en/defi/" },
]

test.describe("Page Visual Tests", () => {
  for (const { name, path, stableSelector = "h1" } of pages) {
    test(name, async ({ page }, testInfo) => {
      await page.goto(path, { waitUntil: "domcontentloaded" })
      await page.locator(stableSelector).first().waitFor({ state: "visible" })
      await page
        .locator('nav[aria-label="Primary"] .animate-pulse-light')
        .first()
        .waitFor({ state: "detached" })
      await takeSnapshot(page, testInfo)
    })
  }
})
