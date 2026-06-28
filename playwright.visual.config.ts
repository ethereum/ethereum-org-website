import type { ChromaticConfig } from "@chromatic-com/playwright"
import { defineConfig } from "@playwright/test"

import baseConfig from "./playwright.config"

const visualUse: ChromaticConfig = {
  disableAutoSnapshot: true,
  assetDomains: ["s3-dcl1.ethquokkaops.io"],
}

// Append "Chromatic" to the default UA so `isChromatic()` returns true client-side.
// Several components (QuizWidget, Simulator) use this signal to skip randomization.
const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Chromatic"

export default defineConfig<ChromaticConfig>({
  ...baseConfig,

  projects: [
    {
      name: "chromatic-desktop",
      testDir: "./tests/visual",
      outputDir: "./test-results",
      // 1024 (Tailwind `lg`) keeps full-page snapshots under Chromatic's 25M pixel limit on our longest pages.
      use: { ...visualUse, userAgent, viewport: { width: 1024, height: 720 } },
    },
    {
      name: "chromatic-tablet",
      testDir: "./tests/visual",
      outputDir: "./test-results",
      use: { ...visualUse, userAgent, viewport: { width: 768, height: 1024 } },
    },
    {
      name: "chromatic-mobile",
      testDir: "./tests/visual",
      outputDir: "./test-results",
      use: { ...visualUse, userAgent, viewport: { width: 375, height: 812 } },
    },
  ],

  webServer: {
    command: "pnpm start",
    port: 3000,
    reuseExistingServer: true,
  },
})
