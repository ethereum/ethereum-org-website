import type { Preview } from "@storybook/react"

import theme from "../src/@chakra-ui/theme"

import { ChakraDecorator } from "./ChakraDecorator"
import i18n, { baseLocales } from "./i18next"

import "../src/styles/global.css"

const chakraBreakpointArray = Object.entries(theme.breakpoints) as [
  string,
  string
][]

const preview: Preview = {
  globals: {
    locale: "en",
    locales: baseLocales,
  },
  globalTypes: {
    colorMode: {
      name: "Color Mode",
      description: "Change the color mode",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "Light Mode" },
          { value: "dark", icon: "circle", title: "Dark Mode" },
        ],
      },
    },
  },
  decorators: [ChakraDecorator],
  parameters: {
    i18n,
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    options: {
      storySort: {
        order: ["Atoms", "Molecules", "Organisms", "Templates", "Pages"],
      },
    },
    layout: "centered",
    // Modify viewport selection to match Chakra breakpoints (or custom breakpoints)
    viewport: {
      viewports: chakraBreakpointArray.reduce((prevVal, currVal) => {
        const [token, key] = currVal

        // `key` value is in em. Need to convert to px for Chromatic Story mode snapshots
        const emToPx = (Number(key.replace("em", "")) * 16).toString() + "px"

        // Replace base value
        if (token === "base")
          return {
            ...prevVal,
            base: {
              name: "base",
              styles: {
                width: "375px", // A popular minimum mobile width
                height: "600px",
              },
            },
          }

        return {
          ...prevVal,
          [token]: {
            name: token,
            styles: {
              width: emToPx,
              height: "600px",
            },
          },
        }
      }, {}),
    },
  },
}

export default preview
