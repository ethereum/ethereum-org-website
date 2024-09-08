import { useEffect } from "react"
import { useTheme } from "next-themes"
import {
  type DataAttributeStrategyConfiguration,
  DecoratorHelpers,
} from "@storybook/addon-themes"
import type { Decorator } from "@storybook/react/*"

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers

export const withNextThemes = ({
  themes,
  defaultTheme,
}: DataAttributeStrategyConfiguration): Decorator => {
  initializeThemeState(Object.keys(themes), defaultTheme)

  return (getStory, context) => {
    const selectedTheme = pluckThemeFromContext(context)
    const selected = selectedTheme || defaultTheme
    const { setTheme } = useTheme()

    useEffect(() => {
      setTheme(selected)
    }, [selected, setTheme])

    return getStory(context)
  }
}
