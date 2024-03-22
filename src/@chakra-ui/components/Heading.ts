import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

import { headingDefaultTheme } from "./components.utils"

const { sizes: defaultSizes } = headingDefaultTheme

const lineHeightScale = {
  "4xl": "6xs",
  "3xl": ["6xs", null, "5xs"],
  "2xl": ["4xs", null, "5xs"],
  xl: ["2xs", null, "4xs"],
  lg: ["2xs", null, "3xs"],
  md: "xs",
  sm: "base",
  xs: "base",
}

/*
 * Instead of rewriting the entire sizes object, take the existing value from the
 * default theme and replace the lineHeight values.
 */
const sizes = Object.entries(defaultSizes || {}).reduceRight(
  (acc, [key, value]) => {
    return {
      ...acc,
      [key]: defineStyle({
        ...value,
        lineHeight: lineHeightScale[key],
      }),
    }
  },
  {
    ...defaultSizes,
  }
)

export const Heading = defineStyleConfig({
  ...headingDefaultTheme,
  sizes,
})
