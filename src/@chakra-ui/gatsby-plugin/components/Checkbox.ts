import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react"
import { checkboxAnatomy } from "@chakra-ui/anatomy"
import {
  checkboxDefaultTheme,
  commonInputTriggerStyles,
  defineMergeStyles,
} from "./components.utils"

const { sizes: defaultSizes } = checkboxDefaultTheme

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const { commonContainerProps, commonControlProps, commonLabelProps } =
  commonInputTriggerStyles

const checkboxMdSize = defaultSizes?.md

const baseStyleControl = defineMergeStyles(
  checkboxMdSize?.control,
  commonControlProps,
  {
    boxSize: "var(--checkbox-size)", // Comes from default theme
    borderRadius: "sm",
  }
)

const baseStyleLabel = defineStyle({ ...commonLabelProps })

const baseStyleContainer = defineStyle({ ...commonContainerProps })

const baseStyle = definePartsStyle({
  container: baseStyleContainer,
  control: baseStyleControl,
  label: baseStyleLabel,
})

export const Checkbox = defineMultiStyleConfig({
  baseStyle,
})
