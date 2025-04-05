import isChromatic from "chromatic/isChromatic"
import { MotionGlobalConfig } from "framer-motion"
import { IBM_Plex_Mono, Inter } from "next/font/google"
import type { Preview } from "@storybook/react"

import ThemeProvider from "@/components/ThemeProvider"
import { TooltipProvider } from "@/components/ui/tooltip"

import nextIntl, { baseLocales } from "./next-intl"
import { withNextThemes } from "./withNextThemes"

import "../src/styles/global.css"
import "../src/styles/docsearch.css"

import "@docsearch/css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-mono",
})

MotionGlobalConfig.skipAnimations = isChromatic()

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
    withNextThemes({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    (Story) => (
      <div className={`${inter.variable} ${ibmPlexMono.variable}`}>
        <ThemeProvider>
          <TooltipProvider>
            <Story />
          </TooltipProvider>
        </ThemeProvider>
      </div>
    ),
  ],
  parameters: {
    nextIntl,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
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
      viewports: breakpointSet.reduce<{
        [token: string]: {
          name: string
          styles: Record<"width" | "height", string>
        }
      }>((arr, [token, value]) => {
        return {
          ...arr,
          [token]: {
            name: token,
            styles: {
              width: value,
              height: "800px",
            },
          },
        }
      }, {}),
    },
  },
}

export default preview
