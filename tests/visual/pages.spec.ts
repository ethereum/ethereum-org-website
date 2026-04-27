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
      // FeedbackWidget is dynamic({ ssr: false }); waiting for its button proves
      // hydration finished and dynamic chunks landed — same pattern other
      // ssr:false components (Emoji/Twemoji) rely on to render.
      await page.waitForSelector('[data-testid="feedback-widget-button"]')
      // Force every <img loading="lazy"> to load now so below-the-fold images
      // are present in the full-page snapshot (Chromatic captures the entire
      // scroll height, not just the viewport).
      await page.evaluate(() => {
        for (const img of Array.from(document.images)) {
          if (img.loading === "lazy") img.loading = "eager"
        }
      })
      // Next.js Image's blur placeholder is removed only after the underlying
      // <img> finishes loading. Snapshotting earlier captures the inline
      // background-image and shows pixelated blur in the diff.
      await page.waitForFunction(() =>
        Array.from(document.images).every((img) => img.complete)
      )
      await takeSnapshot(page, testInfo)
    })
  }
})
