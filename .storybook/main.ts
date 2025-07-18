import path from "path"

import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import type { StorybookConfig } from "@storybook/nextjs"

/**
 * Storybook configuration for the ethereum.org website
 * This loads our components as stories and configures the necessary
 * webpack settings for proper rendering
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

      config.resolve.alias = {
        ...config.resolve.alias,
        "@/storybook/*": path.resolve(__dirname, "./.storybook/"),
      }
    }

    // This modifies the existing image rule to exclude .svg files
    // since you want to handle those files with @svgr/webpack
    const imageRule = config.module.rules.find((rule) =>
      rule?.["test"]?.test(".svg")
    )
    if (imageRule) {
      imageRule["exclude"] = /\.svg$/
    }
    // Configure yaml files to be loaded with yaml-loader
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "yaml-loader",
    })

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
  features: {
    experimentalRSC: true,
  },
}
export default config
