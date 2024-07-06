import { PropsWithChildren, useMemo } from "react"
import { useTheme as useNextTheme } from "next-themes"
import { ColorMode, ColorModeContext, ThemeProvider } from "@chakra-ui/react"
import merge from "lodash/merge"

import { useLocaleDirection } from "@/hooks/useLocaleDirection"
import customTheme from "@/@chakra-ui/theme"

function ChakraThemeProvider({ children }: PropsWithChildren) {
  // get the theme from next-themes
  const { resolvedTheme } = useNextTheme()

  const direction = useLocaleDirection()

  const theme = useMemo(() => merge(customTheme, { direction }), [direction])

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider
        value={{
          colorMode: resolvedTheme as ColorMode,
          toggleColorMode: () => {},
          setColorMode: () => {},
          forced: true,
        }}
      >
        {children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  )
}

export default ChakraThemeProvider
