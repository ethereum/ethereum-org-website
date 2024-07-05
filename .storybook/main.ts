import type { StorybookConfig } from "@storybook/nextjs"

/**
 * Note regarding package.json settings related to Storybook:
 *
 * There is a resolutions option set for the package `jackspeak`. This is related to a
 * workaround provided to make sure storybook ( as of v7.5.2) works correctly with
 * Yarn v1
 *
 * Reference: https://github.com/storybookjs/storybook/issues/22431#issuecomment-1630086092
 *
 * The primary recommendation is to upgrade to Yarn 3 if possible
 */

const config: StorybookConfig = {
  // stories: ["../src/components/**/*.stories.{ts,tsx}"],
  stories: ["../src/components/ui/__stories__/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "storybook-react-i18next",
    "@chromatic-com/storybook"
  ],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript"
  },
}
export default config
