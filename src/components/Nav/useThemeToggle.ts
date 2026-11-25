import { Moon, Sun } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

import { trackCustomEvent } from "@/lib/utils/matomo"

import useColorModeValue from "@/hooks/useColorModeValue"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"

export const useThemeToggle = () => {
  const t = useTranslations("common")
  const { setTheme, resolvedTheme } = useTheme()
  const ThemeIcon = useColorModeValue(Moon, Sun)

  // The nav-bar event records the theme change and how it was reached; the
  // keyboard path is separately counted as a shortcut by the hook below.
  const setColorMode = (eventAction: "click" | "keyboard") => {
    const targetTheme = resolvedTheme === "dark" ? "light" : "dark"

    setTheme(targetTheme)

    trackCustomEvent({
      eventCategory: "nav bar",
      eventAction,
      eventName: `${targetTheme} mode`,
    })
  }

  const toggleColorMode = () => setColorMode("click")

  const themeIconAriaLabel = useColorModeValue(
    t("dark-mode-aria-label"),
    t("light-mode-aria-label")
  )

  useKeyboardShortcut("theme", () => setColorMode("keyboard"))

  return {
    toggleColorMode,
    ThemeIcon,
    themeIconAriaLabel,
  }
}
