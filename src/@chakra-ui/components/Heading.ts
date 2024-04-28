import { defineStyleConfig } from "@chakra-ui/react"

import { headingDefaultTheme } from "./components.utils"

const HEADING_SIZES = [
  "4xl",
  "3xl",
  "2xl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs",
] as const

type SCALE_VALUE = string | [string, null, null, string]

type SIZE_SCALE = { [key in (typeof HEADING_SIZES)[number]]: SCALE_VALUE }

const lineHeightScale: SIZE_SCALE = {
  "4xl": "6xs",
  "3xl": ["6xs", null, null, "5xs"],
  "2xl": ["4xs", null, null, "5xs"],
  xl: ["2xs", null, null, "4xs"],
  lg: ["2xs", null, null, "3xs"],
  md: "xs",
  sm: "base",
  xs: "base",
}

const fontSizeScale: SIZE_SCALE = {
  "4xl": ["6xl", null, null, "7xl"],
  "3xl": ["5xl", null, null, "6xl"],
  "2xl": ["4xl", null, null, "5xl"],
  xl: ["3xl", null, null, "4xl"],
  lg: ["2xl", null, null, "3xl"],
  md: "xl",
  sm: "md",
  xs: "sm",
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
