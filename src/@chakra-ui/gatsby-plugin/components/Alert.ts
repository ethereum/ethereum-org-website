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
      bg: "error.base",
      color: "error.light",
    },
    info: {
      bg: "body.medium",
      color: "background.base",
    },
    warning: {
      bg: "attention.base",
      color: "attention.light",
    },
    success: {
      bg: "success.base",
      color: "success.light",
    },
  },
  subtle: {
    error: {
      bg: "error.light",
      color: "error.base",
    },
    info: {
      bg: "background.highlight",
      color: "body.base",
    },
    warning: {
      bg: "attention.light",
      color: "gray.700",
    },
    success: {
      bg: "success.light",
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
