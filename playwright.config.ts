import path from "path"

import dotenv from "dotenv"
import type { ChromaticConfig } from "@chromatic-com/playwright"
import { defineConfig, devices } from "@playwright/test"

dotenv.config({ path: path.resolve(__dirname, ".env.local") })

const needsWebServer = process.argv.some((arg) => arg.includes("chromatic"))

export default defineConfig<ChromaticConfig>({
  testDir: "./tests",
  outputDir: "./tests/__results__",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 3,
  reporter: [
    ["html", { outputFolder: "./tests/__report__", open: "never" }],
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
  },

  // Global test timeout
  timeout: 30000,

  // Expect timeout
  expect: {
    timeout: 10000,
  },

  projects: [
    // ─────────────────────────────────────────────────────────────────────────
    // E2E tests - Visual regression + functional tests across browsers/devices
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: "e2e",
      testDir: "./tests/e2e",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "e2e-webkit",
      testDir: "./tests/e2e",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "e2e-mobile-chrome",
      testDir: "./tests/e2e",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "e2e-mobile-safari",
      testDir: "./tests/e2e",
      use: { ...devices["iPhone 12"] },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Unit tests
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: "unit",
      testDir: "./tests/unit",
      use: {},
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chromatic visual tests - Full-page snapshots at 3 viewport sizes
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: "chromatic-desktop",
      testDir: "./tests/visual",
      outputDir: "./test-results",
      use: {
        ...devices["Desktop Chrome"],
        // 1024 (Tailwind `lg`) keeps full-page snapshots under Chromatic's
        // 25M pixel limit on our longest pages.
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

  webServer: needsWebServer
    ? {
        command: "pnpm start",
        port: 3000,
        reuseExistingServer: true,
      }
    : undefined,
})
