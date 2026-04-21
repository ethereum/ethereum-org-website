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

const pages = [
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
  {
    name: "Docs - Smart Contracts",
    path: "/en/developers/docs/smart-contracts/",
    stableSelector: "article#main-content",
  },
  { name: "History", path: "/en/history/", stableSelector: "h1" },
  {
    name: "Find Wallet",
    path: "/en/wallets/find-wallet/",
    stableSelector: "h1",
  },
]

test.describe("Page Visual Tests", () => {
  for (const { name, path, stableSelector } of pages) {
    test(name, async ({ page }, testInfo) => {
      await page.goto(path, { waitUntil: "networkidle" })
      await page.locator(stableSelector).first().waitFor({ state: "visible" })
      await takeSnapshot(page, testInfo)
    })
  }
})
