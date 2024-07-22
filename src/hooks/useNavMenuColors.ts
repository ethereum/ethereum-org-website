import { useTheme } from "next-themes"

import { Level } from "@/components/Nav/types"

type LevelColors = {
  subtext: string
  background: string
  activeBackground: string
}

type NavMenuColors = {
  body: string
  stroke: string
  highlight: string
  active: string
  lvl: Record<Level, LevelColors>
}

export const useNavMenuColors = (): NavMenuColors => {
  const { theme } = useTheme()
  const isLight = theme === "light"

  return {
    body: "text-body",
    stroke: "border-body-light",
    highlight: "text-primary",
    active: "text-primary-high-contrast",
    lvl: {
      1: {
        subtext: isLight ? "text-gray-400" : "text-gray-400",
        background: isLight ? "bg-white" : "bg-black",
        activeBackground: isLight ? "bg-gray-150" : "bg-gray-700",
      },
      2: {
        subtext: isLight ? "text-gray-400" : "text-gray-300",
        background: isLight ? "bg-gray-150" : "bg-gray-700",
        activeBackground: isLight ? "bg-gray-200" : "bg-gray-600",
      },
      3: {
        subtext: isLight ? "text-gray-500" : "text-gray-300",
        background: isLight ? "bg-gray-200" : "bg-gray-600",
        activeBackground: isLight ? "bg-gray-100" : "bg-gray-700",
      },
      4: {
        subtext: isLight ? "text-gray-700" : "text-gray-300",
        background: isLight ? "bg-gray-300" : "bg-gray-700",
        activeBackground: isLight ? "bg-gray-200" : "bg-gray-800",
      },
    },
  }
}
