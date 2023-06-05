import {
  createMultiStyleConfigHelpers,
  SystemStyleObject,
} from "@chakra-ui/react"
import { alertAnatomy } from "@chakra-ui/anatomy"
import { alertDefaultTheme, defineMergeStyles } from "./components.utils"
import { AlertStatusType } from "../../../components/Alert"

const STATUS_COLORS: Record<
  "solid" | "subtle",
  Record<AlertStatusType, SystemStyleObject>
> = {
  solid: {
    error: {
      bg: "error",
      color: "errorLight",
    },
    info: {
      bg: "bodyMedium",
      color: "background",
    },
    warning: {
      bg: "attention",
      color: "attentionLight",
    },
    success: {
      bg: "success",
      color: "successLight",
    },
  },
  subtle: {
    error: {
      bg: "errorLight",
      color: "error",
    },
    info: {
      bg: "backgroundHighlight",
      color: "body",
    },
    warning: {
      bg: "attentionLight",
      color: "gray.700",
    },
    success: {
      bg: "successLight",
      color: "success",
    },
  },
}

const { baseStyle: alertBaseStyle } = alertDefaultTheme

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyleContainer = defineMergeStyles(alertBaseStyle?.container, {
  justifyContent: "center",
  gap: 2,
})

const baseStyleIcon = defineMergeStyles(alertBaseStyle?.icon, {
  me: 2,
})

const baseStyle = definePartsStyle({
  container: baseStyleContainer,
  icon: baseStyleIcon,
})

const variantSolid = definePartsStyle((props) => ({
  container: {
    ...STATUS_COLORS["solid"][props.status],
  },
}))

const variantSubtle = definePartsStyle((props) => ({
  container: {
    ...STATUS_COLORS["subtle"][props.status],
  },
}))

const variants = {
  solid: variantSolid,
  subtle: variantSubtle,
}

export const Alert = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "solid",
  },
})
