import path from "path"

import type { StorybookConfig } from "@storybook/nextjs"
import { propNames } from "@chakra-ui/react"

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
  stories: ["../src/components/**/*.stories.{ts,tsx}"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chakra-ui/storybook-addon",
    "storybook-react-i18next",
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
  webpackFinal: async (config: any) => {
    // Add path aliases
    config.resolve.alias["@"] = path.resolve(__dirname, "../src")
    config.resolve.alias["@/public"] = path.resolve(__dirname, "../public")

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
  },
}
export default config
