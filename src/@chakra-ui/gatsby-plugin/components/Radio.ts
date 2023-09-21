import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/react"
import { radioAnatomy } from "@chakra-ui/anatomy"
import {
  commonInputTriggerStyles,
  defineMergeStyles,
  radioDefaultTheme,
} from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(radioAnatomy.keys)

export const $radioDisableColor = cssVar("radio-disable-color")

const { commonContainerProps, commonControlProps, commonLabelProps } =
  commonInputTriggerStyles

const baseStyleContainer = defineStyle({ ...commonContainerProps })

const baseStyleControl = defineMergeStyles(
  radioDefaultTheme.baseStyle?.({} as never).control,
  commonControlProps,
  {
    boxSize: 4,
    fontSize: "md",
    "*:hover > &": {
      outlineOffset: "-1px",
    },
    _checked: {
      _before: {
        // Force half the size, as '50%' value not reliable.
        boxSize: 2,
      },
    },
  }
)

const baseStyleLabel = defineStyle({ ...commonLabelProps })

const baseStyle = definePartsStyle({
  container: baseStyleContainer,
  control: baseStyleControl,
  label: baseStyleLabel,
})

export const Radio = defineMultiStyleConfig({
  baseStyle,
})
