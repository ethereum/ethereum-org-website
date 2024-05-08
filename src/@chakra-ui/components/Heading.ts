import { defineStyleConfig } from "@chakra-ui/react"

import { headingDefaultTheme } from "./components.utils"

const HEADING_SIZES = ["2xl", "xl", "lg", "md", "sm", "xs"] as const

type SCALE_VALUE = string | [string, null, null, string]

type SIZE_SCALE = { [key in (typeof HEADING_SIZES)[number]]: SCALE_VALUE }

const lineHeightScale: SIZE_SCALE = {
  "2xl": "4xs",
  xl: ["2xs", null, null, "4xs"],
  lg: "2xs",
  md: ["xs", null, null, "2xs"],
  sm: ["base", null, null, "xs"],
  xs: "base",
}

const fontSizeScale: SIZE_SCALE = {
  "2xl": ["4xl", null, null, "5xl"],
  xl: ["3xl", null, null, "4xl"],
  lg: ["2xl", null, null, "3xl"],
  md: ["xl", null, null, "2xl"],
  sm: ["md", null, null, "xl"],
  xs: ["sm", null, null, "md"],
}

const sizes = HEADING_SIZES.reduce<{
  [key: string]: { fontSize: SCALE_VALUE; lineHeight: SCALE_VALUE }
}>((obj, key) => {
  return {
    ...obj,
    [key]: {
      fontSize: fontSizeScale[key],
      lineHeight: lineHeightScale[key],
    },
  }
}, {})

export const Heading = defineStyleConfig({
  ...headingDefaultTheme,
  sizes,
})
