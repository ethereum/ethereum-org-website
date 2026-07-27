import { Moon, Sun } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

import { trackCustomEvent } from "@/lib/utils/matomo"

import useColorModeValue from "@/hooks/useColorModeValue"
import { useEventListener } from "@/hooks/useEventListener"

export const useThemeToggle = () => {
  const t = useTranslations("common")
  const { setTheme, resolvedTheme } = useTheme()
  const ThemeIcon = useColorModeValue(Moon, Sun)

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
