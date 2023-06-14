const { propNames } = require("@chakra-ui/react")

const { babelConfig } = require("./babel-storybook-config")

module.exports = {
  stories: ["../src/components/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // https://storybook.js.org/addons/@storybook/addon-a11y/
    "@storybook/addon-a11y",
    "@chakra-ui/storybook-addon",
  ],
  staticDirs: ["../static"],
  babel: async (options) => ({
    ...babelConfig,
  }),
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  refs: {
    "@chakra-ui/react": {
      disable: true,
    },
  },
  features: {},
  webpackFinal: async (config) => {
    const isRuleExist =
      config.module && config.module.rules && config.module.rules.length
    if (isRuleExist) {
      // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
      config.module.rules[0].exclude = [
        /node_modules\/(?!(gatsby|gatsby-script)\/)/,
      ]

      // Remove core-js to prevent issues with Storybook
      config.module.rules[0].exclude = [/core-js/]
    }

    if (
      isRuleExist &&
      config.module.rules[0].use &&
      config.module.rules[0].use.length
    ) {
      // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      config.module.rules[0].use[0].options.plugins.push(
        require.resolve("babel-plugin-remove-graphql-queries")
      )
    }

    config.resolve.mainFields = ["browser", "module", "main"]
    return config
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
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
