import { PropsWithChildren, useMemo } from "react"
import merge from "lodash/merge"
import { ChakraBaseProvider, createLocalStorageManager } from "@chakra-ui/react"

import customTheme from "@/@chakra-ui/theme"

import { COLOR_MODE_STORAGE_KEY } from "@/lib/constants"

import { useLocaleDirection } from "@/hooks/useLocaleDirection"

const colorModeManager = createLocalStorageManager(COLOR_MODE_STORAGE_KEY)

function ChakraThemeProvider({ children }: PropsWithChildren) {
  const direction = useLocaleDirection()

  const theme = useMemo(() => merge(customTheme, { direction }), [direction])

  return (
    <ChakraBaseProvider theme={theme} colorModeManager={colorModeManager}>
        {children}
    </ChakraBaseProvider>
  )
}

export default ChakraThemeProvider
