import { StorybookConfig } from "@storybook/react-webpack5"
import { propNames } from "@chakra-ui/react"
import { babelConfig } from "./babel-storybook-config"

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // https://storybook.js.org/addons/@storybook/addon-a11y/
    "@storybook/addon-a11y",
    "@chakra-ui/storybook-addon",
    "storybook-react-i18next",
  ],
  staticDirs: ["../static"],
  babel: async () => ({
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
    if (
      config.module != undefined &&
      config.module.rules != undefined &&
      config.module.rules[0] !== "..."
    ) {
      config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
      config.module.rules[0].use = [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              // use @babel/preset-react for JSX and env (instead of staged presets)
              require.resolve("@babel/preset-react"),
              require.resolve("@babel/preset-env"),
            ],
            plugins: [
              // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
              require.resolve("babel-plugin-remove-graphql-queries"),
            ],
          },
        },
      ]
    }

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

export default config
