import { useEffect } from "react"
import { useTheme } from "next-themes"

/**
 * Forces update of color mode to `next-theme` provider when
 * changing the mode from Storybook.
 *
 * This will keep color mode synced with the `theme` key in local storage.
 */
export const ThemeChanger = ({ theme }: { theme: "light" | "dark" }) => {
  const { setTheme } = useTheme()

  useEffect(() => {
    console.log("Syncing color mode for SB and next-themes to: ", theme)
    setTheme(theme)
  }, [setTheme, theme])

  return null
}
