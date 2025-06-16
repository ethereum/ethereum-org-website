import type { ChromaticConfig } from "@chromatic-com/playwright"
import { defineConfig, devices } from "@playwright/test"

export default defineConfig<ChromaticConfig>({
  testDir: "./tests/e2e",
  outputDir: "./tests/e2e/__results__",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { outputFolder: "./tests/e2e/__report__" }],
    ["line"],
    process.env.CI ? ["github"] : ["list"],
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",

    // Global test timeout
    actionTimeout: 10000,
    navigationTimeout: 30000,

    // Chromatic settings
    disableAutoSnapshot: true,
  },

  // Global test timeout
  timeout: 30000,

  // Expect timeout
  expect: {
    timeout: 10000,
  },
  projects: [
    /* Test against desktop browsers */
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
})
