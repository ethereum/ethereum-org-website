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
    // Recursive everywhere: a story nested a directory deeper than expected
    // would otherwise never load, with no error to say so.
    "../src/components/**/*.stories.{ts,tsx}",
    "../src/layouts/**/*.stories.{ts,tsx}",
    "../src/styles/**/*.stories.{ts,tsx}",
    "../app/**/*.stories.{ts,tsx}",
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "@chromatic-com/storybook",
    "storybook-next-intl",
    "@storybook/addon-docs",
  ],

  staticDirs: ["../public"],

  framework: {
    name: "@storybook/nextjs",
    options: {},
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
        "@/storybook/*": path.resolve(process.cwd(), ".storybook"),
        // Async server components render in the browser here, where the real
        // helpers throw. See the shim's header for why this is a swap, not a
        // fake. `$` keeps it an exact-request match.
        "next-intl/server$": path.resolve(
          process.cwd(),
          ".storybook/next-intl-server.tsx"
        ),
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

    // .all-contributorsrc is JSON without a .json extension
    config.module.rules.push({
      test: /\.all-contributorsrc$/,
      type: "json",
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
    backgrounds: false,
  },
}
export default config
