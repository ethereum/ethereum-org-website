import type { SVGAttributes } from "react"

export const commonIconDefaultProps = {
  fillRule: "evenodd",
  clipRule: "evenodd",
  fill: "currentColor",
} as const

export const commonIconDefaultAttrs = {
  fill: "currentColor",
  fillRule: "evenodd",
  clipRule: "evenodd",
} satisfies SVGAttributes<SVGElement>
