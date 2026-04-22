import type { ChromaticConfig } from "@chromatic-com/playwright"
import { defineConfig } from "@playwright/test"

import baseConfig from "./playwright.config"

const visualUse: ChromaticConfig = {
  disableAutoSnapshot: true,
  assetDomains: ["s3-dcl1.ethquokkaops.io"],
}

export default defineConfig<ChromaticConfig>({
  ...baseConfig,

  projects: [
    {
      name: "chromatic-desktop",
      testDir: "./tests/visual",
      outputDir: "./test-results",
      // 1024 (Tailwind `lg`) keeps full-page snapshots under Chromatic's 25M pixel limit on our longest pages.
      use: { ...visualUse, viewport: { width: 1024, height: 720 } },
    },
    {
      name: "chromatic-tablet",
      testDir: "./tests/visual",
      outputDir: "./test-results",
      use: { ...visualUse, viewport: { width: 768, height: 1024 } },
    },
    {
      name: "chromatic-mobile",
      testDir: "./tests/visual",
      outputDir: "./test-results",
      use: { ...visualUse, viewport: { width: 375, height: 812 } },
    },
  ],

  webServer: {
    command: "pnpm start",
    port: 3000,
    reuseExistingServer: true,
  },
})
