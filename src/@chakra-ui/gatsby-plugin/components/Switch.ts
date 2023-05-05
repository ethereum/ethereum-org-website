import { createMultiStyleConfigHelpers } from "@chakra-ui/react"
import { switchAnatomy } from "@chakra-ui/anatomy"
import {
  commonInputTriggerStyles,
  defineMergeStyles,
  switchDefaultTheme,
} from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const { baseStyle: defaultBaseStyle, sizes: defaultSizes } = switchDefaultTheme

const switchSmSize = defaultSizes?.sm

const { commonControlProps, commonContainerProps, commonLabelProps } =
  commonInputTriggerStyles

const baseStyleContainer = defineMergeStyles(
  defaultBaseStyle?.({} as never).container,
  switchSmSize?.container,
  commonContainerProps,
  {}
)

const baseStyleThumb = defineMergeStyles(
  defaultBaseStyle?.({} as never).thumb,
  { bg: "background" }
)

const baseStyleTrack = defineMergeStyles(
  defaultBaseStyle?.({} as never).track,
  commonControlProps,
  {
    bg: "bodyLight",
    _invalid: { borderColor: "errorOutline" },
    _focusVisible: { bg: "gray.500", borderColor: "transparent" },
  }
)

const baseStyle = definePartsStyle({
  container: baseStyleContainer,
  thumb: baseStyleThumb,
  track: baseStyleTrack,
})

export const Switch = defineMultiStyleConfig({
  baseStyle,
})
