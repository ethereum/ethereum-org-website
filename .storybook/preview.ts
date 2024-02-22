import { extendBaseTheme } from "@chakra-ui/react"
import type { Preview } from "@storybook/react"

import theme from "../src/@chakra-ui/theme"

import i18n, { baseLocales } from "./i18next"

const extendedTheme = extendBaseTheme(theme)

const chakraBreakpointArray = Object.entries(extendedTheme.breakpoints)

const preview: Preview = {
  globals: {
    locale: "en",
    locales: baseLocales,
  },
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
    chakra: {
      theme: extendedTheme,
    },
    layout: "centered",
    // Modify viewport selection to match Chakra breakpoints (or custom breakpoints)
    viewport: {
      viewports: chakraBreakpointArray.reduce((prevVal, currVal) => {
        const [token, key] = currVal

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
              width: key,
              height: "600px",
            },
          },
        }
      }, {}),
    },
  },
}

export default preview
