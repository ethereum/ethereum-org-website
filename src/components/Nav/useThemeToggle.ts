import { useTheme } from "next-themes"
import { MdBrightness2, MdWbSunny } from "react-icons/md"

import { trackCustomEvent } from "@/lib/utils/matomo"

import useColorModeValue from "@/hooks/useColorModeValue"
import { useEventListener } from "@/hooks/useEventListener"
import useTranslation from "@/hooks/useTranslation"

export const useThemeToggle = () => {
  const { t } = useTranslation("common")
  const { setTheme, resolvedTheme } = useTheme()
  const ThemeIcon = useColorModeValue(MdBrightness2, MdWbSunny)

  const toggleColorMode = () => {
    const targetTheme = resolvedTheme === "dark" ? "light" : "dark"

    setTheme(targetTheme)

    trackCustomEvent({
      eventCategory: "nav bar",
      eventAction: "click",
      eventName: `${targetTheme} mode`,
    })
  }

  const themeIconAriaLabel = useColorModeValue(
    t("dark-mode-aria-label"),
    t("light-mode-aria-label")
  )

  /**
   * Adds a keydown event listener to toggle color mode (ctrl|cmd + \).
   * @param {string} event - The keydown event.
   */
  useEventListener("keydown", (e) => {
    if (e.key !== "\\") return
    e.preventDefault()
    if (e.metaKey || e.ctrlKey) toggleColorMode()
  })

  return {
    toggleColorMode,
    ThemeIcon,
    themeIconAriaLabel,
  }
}
