import { action } from "@storybook/addon-actions"

import theme from "../src/@chakra-ui/gatsby-plugin/theme"

import "../static/fonts/inter-font-face.css"
import "../static/fonts/ibm-plex-font-face.css"

const chakraBreakpointArray = Object.entries(theme.breakpoints)

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = "/"

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions

// @ts-ignore
window.___navigate = (pathname) => {
  action("NavigateTo:")(pathname)
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    disable: true,
  },
  chakra: {
    theme,
  },
  layout: "centered",
  // Modify viewport selection to match Chakra breakpoints (or custom breakpoints)
  viewport: {
    viewports: chakraBreakpointArray.reduce((prevVal, currVal) => {
      const [token, key] = currVal

      // Unnecessary breakpoint
      if (token === "base") return { ...prevVal }

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
}
