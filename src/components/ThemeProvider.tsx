import { useMemo } from "react"
import merge from "lodash/merge"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { ChakraBaseProvider, createLocalStorageManager } from "@chakra-ui/react"

import customTheme from "@/@chakra-ui/theme"

import { COLOR_MODE_STORAGE_KEY } from "@/lib/constants"

import { useLocaleDirection } from "@/hooks/useLocaleDirection"

const colorModeManager = createLocalStorageManager(COLOR_MODE_STORAGE_KEY)

/**
 * Primary theming wrapper for use with color mode. Uses the theme provider
 * from `next-themes`.
 *
 * Applied to _app.tsx as the main provider for the project, and supplied as the
 * primary decorator to Storybook.
 *
 * NOTE: This also includes the Chakra Provider. This will be removed after migration to ShadCN/Tailwind is complete
 */
const ThemeProvider = ({ children }: Pick<ThemeProviderProps, "children">) => {
  const direction = useLocaleDirection()

  const theme = useMemo(() => merge(customTheme, { direction }), [direction])
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey={COLOR_MODE_STORAGE_KEY}
    >
      <ChakraBaseProvider
        theme={theme}
        colorModeManager={colorModeManager}
        resetCSS={false}
      >
        {children}
      </ChakraBaseProvider>
    </NextThemesProvider>
  )
}

export default ThemeProvider
