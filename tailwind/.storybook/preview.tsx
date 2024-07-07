import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react"

import { ThemeProvider } from "../../src/components/ThemeProvider"

import i18n, { baseLocales } from "./i18next"

import "../../src/styles/global.css"
import "../../src/styles/main.css"

export const breakpointSet: [token: string, value: string][] = [
  ["base", "375px"],
  ["sm", "640px"],
  ["md", "768px"],
  ["lg", "1024px"],
  ["xl", "1280px"],
  ["2xl", "1536px"],

]


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
      viewports: breakpointSet.reduce<{ [token: string]: { name: string, styles: Record<'width' | 'height', string>} }>((arr, [token, value]) => {
        return {
          ...arr,
          [token]: {
            name: token,
            styles: {
              width: value,
              height: "800px"
            }
          }
        }
      }, {})
    },
  },
}

export default preview
