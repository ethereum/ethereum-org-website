import type { ChromaticConfig } from "@chromatic-com/playwright"
import { defineConfig, devices } from "@playwright/test"

import baseConfig from "./playwright.config"

export default defineConfig<ChromaticConfig>({
  ...baseConfig,

  projects: [
    {
      name: "chromatic-desktop",
      testDir: "./tests/visual",
      outputDir: "./test-results",
      use: {
        ...devices["Desktop Chrome"],
        // 1024 (Tailwind `lg`) keeps full-page snapshots under Chromatic's 25M pixel limit on our longest pages.
        viewport: { width: 1024, height: 720 },
        disableAutoSnapshot: true,
        assetDomains: ["s3-dcl1.ethquokkaops.io"],
      },
    },
    {
      name: "chromatic-tablet",
      testDir: "./tests/visual",
      outputDir: "./test-results",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 768, height: 1024 },
        disableAutoSnapshot: true,
        assetDomains: ["s3-dcl1.ethquokkaops.io"],
      },
    },
    {
      name: "chromatic-mobile",
      testDir: "./tests/visual",
      outputDir: "./test-results",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 375, height: 812 },
        disableAutoSnapshot: true,
        assetDomains: ["s3-dcl1.ethquokkaops.io"],
      },
    },
  ],

  webServer: {
    command: "pnpm start",
    port: 3000,
    reuseExistingServer: true,
  },
})
