import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import { propNames } from "@chakra-ui/react"
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
    "../src/@chakra-ui/stories/*.stories.tsx",
    "../src/layouts/stories/*.stories.tsx",
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
    "storybook-react-i18next",
    "@storybook/addon-themes",
    "@chromatic-com/storybook",
  ],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  refs: {
    "@chakra-ui/react": {
      disable: true,
    },
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
      /**
       * For handling bloated controls table of Chakra Props
       *
       * https://github.com/chakra-ui/chakra-ui/issues/2009#issuecomment-852793946
       */
      propFilter: (prop) => {
        const excludedPropNames = propNames.concat([
          "as",
          "apply",
          "sx",
          "__css",
        ])
        const isStyledSystemProp = excludedPropNames.includes(prop.name)
        const isHTMLElementProp =
          prop.parent?.fileName.includes("node_modules") ?? false
        return !(isStyledSystemProp || isHTMLElementProp)
      },
    },

    reactDocgen: "react-docgen-typescript",
  },
}
export default config
