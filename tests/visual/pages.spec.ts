import { takeSnapshot, test } from "@chromatic-com/playwright"

// Requires a USE_MOCK_DATA=true build for deterministic snapshots (see test:visual:build).

const pages: Array<{ name: string; path: string }> = [
  { name: "Homepage", path: "/" },
  { name: "Wallets", path: "/wallets/" },
  { name: "Staking", path: "/staking/" },
  { name: "Developers", path: "/developers/" },
  { name: "Apps", path: "/apps/" },
  { name: "Community Events", path: "/community/events/" },
  { name: "Run a Node", path: "/run-a-node/" },
  { name: "History", path: "/history/" },
  { name: "Get ETH", path: "/get-eth/" },
  { name: "Find Wallet", path: "/wallets/find-wallet/" },

  // One representative per src/layouts/ layout — keeps coverage without per-page duplication.
  { name: "Bridges", path: "/bridges/" }, // StaticLayout
  { name: "Docs - Smart Contracts", path: "/developers/docs/smart-contracts/" }, // DocsLayout
  {
    name: "Tutorial - Hello World",
    path: "/developers/tutorials/hello-world-smart-contract/",
  }, // TutorialLayout
  { name: "Staking - Solo", path: "/staking/solo/" }, // md/StakingLayout
  { name: "Roadmap - Security", path: "/roadmap/security/" }, // md/RoadmapLayout
  { name: "Roadmap - Merge", path: "/roadmap/merge/" }, // md/UpgradeLayout
  { name: "DeFi", path: "/defi/" }, // md/UseCasesLayout
]

test.describe("Page Visual Tests", () => {
  for (const { name, path } of pages) {
    test(name, async ({ page }, testInfo) => {
      await page.goto(path, { waitUntil: "domcontentloaded" })
      await page.waitForFunction(
        () => document.querySelectorAll('[data-slot="loading"]').length === 0
      )
      await takeSnapshot(page, testInfo)
    })
  }
})
