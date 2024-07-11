import { useEffect, useMemo, useState } from "react"
import {
  ChakraBaseProvider,
  extendBaseTheme,
  useColorMode,
} from "@chakra-ui/react"
import type { Decorator } from "@storybook/react"

import theme from "../src/@chakra-ui/theme"

import i18n from "./i18next"

type DecoratorProps = Parameters<Decorator>

const ColorModeSync = ({ context }: { context: DecoratorProps[1] }) => {
  const { setColorMode } = useColorMode()

  useEffect(() => {
    const isDarkMode = localStorage.getItem("chakra-ui-color-mode") === "dark"

    context.globals.colorMode = isDarkMode ? "dark" : "light"
  }, [])

  useEffect(() => {
    setColorMode(context.globals.colorMode)
  }, [setColorMode, context])

  return null
}

/**
 * This is a custom local setup of the official Chakra UI Storybook addon.
 *
 * A local version was created in response to provide a better sync between
 * updated local direction to the Chakra theme.
 *
 * (This would most likely not be updated in the addon due to ongoing creation of Chakra v3 at the time this
 * setup was created.)
 *
 * Will be deprecated and removed when Chakra v3 is available for migration.
 *
 */
export const ChakraDecorator: Decorator = (getStory, context) => {
  const [dir, updateDir] = useState<"ltr" | "rtl">()

  i18n.on("languageChanged", (locale) => {
    const direction = i18n.dir(locale)
    document.documentElement.dir = direction
    updateDir(direction)
  })

  const themeWithDirectionOverride = useMemo(() => {
    return extendBaseTheme({ direction: dir }, theme)
  }, [dir])

  return (
    <ChakraBaseProvider theme={themeWithDirectionOverride}>
      <>
        <ColorModeSync context={context} />
        {getStory(context)}
      </>
    </ChakraBaseProvider>
  )
}
