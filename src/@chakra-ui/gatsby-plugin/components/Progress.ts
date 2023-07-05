import { progressAnatomy as parts } from "@chakra-ui/anatomy"
import { defineStyleConfig } from "@chakra-ui/react"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

const { definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle(() => ({
  track: {
    bg: "primary.light",
    // `borderRadius` applies to both track and `filledTrack` (https://github.com/chakra-ui/chakra-ui/pull/2946)
    borderRadius: "full",
  },
  filledTrack: {
    bgColor: "primary.base",
  },
}))

// see https://github.com/chakra-ui/chakra-ui/blob/38acfe89c5d1f1edc67bbc44e2edd38980ca3e08/packages/components/theme/src/components/progress.ts#L63
const sizes = {
  xs: definePartsStyle({
    track: { h: "1" },
  }),
  sm: definePartsStyle({
    track: { h: "2" },
  }),
  md: definePartsStyle({
    track: { h: "2.5" },
  }),
  lg: definePartsStyle({
    track: { h: "3" },
  }),
}

export const Progress = defineStyleConfig({
  sizes,
  baseStyle,
  defaultProps: {
    size: "md",
  },
})
