import type { Preview } from "@storybook/react"

import theme from "../src/@chakra-ui/theme"

const chakraBreakpointArray = Object.entries(theme.breakpoints)

const preview: Preview = {
  parameters: {
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
  },
}

export default preview
