import { Level } from "@/components/Nav/types"

import useColorModeValue from "./useColorModeValue"

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

/**
 * Hook to provide colors for the mobile navigation menu.
 *
 * TODO: replace with useNavMenuColorsTw when the desktop menu is migrated.
 */

export const useNavMenuColors = (): NavMenuColors => ({
  body: "body.base",
  stroke: "body.light",
  highlight: "primary.base",
  active: "primary.highContrast",
  lvl: {
    1: {
      subtext: useColorModeValue("gray.400", "gray.400"),
      background: useColorModeValue("white", "black"),
      activeBackground: useColorModeValue("gray.150", "gray.700"),
    },
    2: {
      subtext: useColorModeValue("gray.400", "gray.300"),
      background: useColorModeValue("gray.150", "gray.700"),
      activeBackground: useColorModeValue("gray.200", "gray.600"),
    },
    3: {
      subtext: useColorModeValue("gray.500", "gray.300"),
      background: useColorModeValue("gray.200", "gray.600"),
      activeBackground: useColorModeValue("gray.100", "gray.700"),
    },
    4: {
      subtext: useColorModeValue("gray.700", "gray.300"),
      background: useColorModeValue("gray.300", "gray.700"),
      activeBackground: useColorModeValue("gray.200", "gray.800"),
    },
  },
})
