import React from "react"
import { ThemeProvider } from "@emotion/react"
import { useColorModeValue } from "@chakra-ui/react"

import { darkTheme, lightTheme } from "../theme"

export default function OldThemeProvider({ children }) {
  // TODO: tmp - for backward compatibility with old theme
  const oldTheme = useColorModeValue(lightTheme, darkTheme)

  return <ThemeProvider theme={oldTheme}>{children}</ThemeProvider>
}
