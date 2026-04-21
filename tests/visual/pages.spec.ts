import { takeSnapshot, test } from "@chromatic-com/playwright"

// Requires a USE_MOCK_DATA=true build for deterministic snapshots (see test:visual:build).

const pages: Array<{ name: string; path: string; stableSelector?: string }> = [
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

  // One representative per src/layouts/ layout — keeps coverage without per-page duplication.
  { name: "Bridges", path: "/en/bridges/" }, // StaticLayout
  {
    name: "Docs - Smart Contracts",
    path: "/en/developers/docs/smart-contracts/",
    stableSelector: "article#main-content",
  }, // DocsLayout
  {
    name: "Tutorial - Hello World",
    path: "/en/developers/tutorials/hello-world-smart-contract/",
  }, // TutorialLayout
  { name: "Staking - Solo", path: "/en/staking/solo/" }, // md/StakingLayout
  { name: "Roadmap - Security", path: "/en/roadmap/security/" }, // md/RoadmapLayout
  { name: "Roadmap - Merge", path: "/en/roadmap/merge/" }, // md/UpgradeLayout
  { name: "DeFi", path: "/en/defi/" }, // md/UseCasesLayout
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
