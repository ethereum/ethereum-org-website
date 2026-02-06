import type { CustomProjectConfig } from "lost-pixel"

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: "./storybook-static",
    breakpoints: [375, 1280],
  },

  // Percentage-of-image threshold (0–1 scale). 0.1 = fail if >0.1% of pixels differ.
  threshold: 0.1,

  compareEngine: "odiff",

  generateOnly: false,
  failOnDifference: true,

  browser: "chromium",

  // Fonts are bundled in the static Storybook build (next/font/google with preload: true),
  // so no async font loading to wait for. Animations are disabled via visual-test-mode CSS.
  // Tune upward if flaky screenshots appear during parallel run.
  waitBeforeScreenshot: 500,
  waitForFirstRequest: 1000,
  waitForLastRequest: 1000,

  imagePathBaseline: ".lostpixel/baseline",
  imagePathCurrent: ".lostpixel/current",
  imagePathDifference: ".lostpixel/difference",
}
