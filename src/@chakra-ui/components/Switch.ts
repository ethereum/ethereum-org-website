import { switchAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

import {
  _notDisabledReadOnly,
  commonInputTriggerStyles,
  defineMergeStyles,
  switchDefaultTheme,
} from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const { baseStyle: defaultBaseStyle, sizes: defaultSizes } = switchDefaultTheme

const switchSmSize = defaultSizes?.sm

const { commonControlProps, commonContainerProps } = commonInputTriggerStyles

const baseStyleContainer = defineMergeStyles(
  defaultBaseStyle?.({} as never).container,
  switchSmSize?.container,
  commonContainerProps
)

const baseStyleThumb = defineMergeStyles(
  defaultBaseStyle?.({} as never).thumb,
  {
    bg: "background.base",
    [".chakra-switch__track:not([data-checked])[data-disabled] > &"]: {
      border: "1px",
      borderColor: "disabled",
    },
  }
)

const baseStyleTrack = defineMergeStyles(
  defaultBaseStyle?.({} as never).track,
  commonControlProps,
  {
    bg: "body.medium",
    borderColor: "transparent",
    _invalid: { borderColor: "error.outline" },
    _focusVisible: { bg: "gray.500", borderColor: "transparent" },
    ["&:not([data-checked])[data-disabled]"]: {
      bg: "transparent",
      borderColor: "disabled",
    },
    [_notDisabledReadOnly]: {
      "*[data-checked]:hover > &, *:not([data-checked]):hover > &": {
        bg: "primary.hover",
        borderColor: "transparent",
      },
    },
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
