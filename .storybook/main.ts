import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
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
  stories: [
    "../src/components/**/*.stories.{ts,tsx}",
    "../src/layouts/stories/*.stories.tsx",
    "../src/styles/*.stories.tsx",
  ],
  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
      },
    },
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@chromatic-com/storybook",
    "storybook-next-intl",
  ],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.module = config.module || {}
    config.module.rules = config.module.rules || []

    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ]
    }

    // This modifies the existing image rule to exclude .svg files
    // since you want to handle those files with @svgr/webpack
    const imageRule = config.module.rules.find((rule) =>
      rule?.["test"]?.test(".svg")
    )
    if (imageRule) {
      imageRule["exclude"] = /\.svg$/
    }

    // Configure .svg files to be loaded with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  typescript: {
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
    },

    reactDocgen: "react-docgen-typescript",
  },
}
export default config
