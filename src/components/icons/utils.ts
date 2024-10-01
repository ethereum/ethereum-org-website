import type { SVGAttributes } from "react"
import { IconProps } from "@chakra-ui/react"

export const commonIconDefaultProps: IconProps = {
  fillRule: "evenodd",
  clipRule: "evenodd",
  fill: "currentColor",
}

export const commonIconDefaultAttrs = {
  fill: "currentColor",
  fillRule: "evenodd",
  clipRule: "evenodd",
} satisfies SVGAttributes<SVGElement>
