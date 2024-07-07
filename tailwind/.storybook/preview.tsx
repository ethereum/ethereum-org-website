import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react"

import { ThemeProvider } from "../../src/components/ThemeProvider"

import i18n, { baseLocales } from "./i18next"

import "../../src/styles/global.css"
import "../../src/styles/main.css"


const preview: Preview = {
  globals: {
    locale: "en",
    locales: baseLocales,
  },
  decorators: [
   withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
     defaultTheme: 'light',
  }),
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ],
  parameters: {
    i18n,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    chromatic: {
      prefersReducedMotion: "reduce",
    },
    options: {
      storySort: {
        order: ["Atoms", "Molecules", "Organisms", "Templates", "Pages"],
      },
    },
    layout: "centered",
    // Modify viewport selection to match Chakra breakpoints (or custom breakpoints)
    viewport: {
      viewports: {
        base: {
          name: "base",
          styles: {
            width: '375px',
            height: "800px"
          },
          type: "mobile"
        },
        sm: {
          name: "sm",
          styles: {
            width: '640px',
            height: "800px"
          },
          type: "mobile"
        },
        md: {
          name: "md",
          styles: {
            width: '768px',
            height: "800px"
          },
          type: "tablet"
        },
        lg: {
          name: "lg",
          styles: {
            width: '1024px',
            height: "800px"
          },
          type: "desktop"
        },
        xl: {
          name: "xl",
          styles: {
            width: '1280px',
            height: "800px"
          },
          type: "desktop"
        },
        "2xl": {
          name: "2xl",
          styles: {
            width: '1536px',
            height: "800px"
          },
          type: "desktop"
        },
      },
    },
  },
}

export default preview
