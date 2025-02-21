import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

import { COLOR_MODE_STORAGE_KEY } from "@/lib/constants"

import { useLocaleDirection } from "@/hooks/useLocaleDirection"

/**
 * Primary theming wrapper for use with color mode. Uses the theme provider
 * from `next-themes`.
 *
 * Applied to _app.tsx as the main provider for the project, and supplied as the
 * primary decorator to Storybook.
 */
const ThemeProvider = ({ children }: Pick<ThemeProviderProps, "children">) => {
  useLocaleDirection()

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
      storageKey={COLOR_MODE_STORAGE_KEY}
    >
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider
