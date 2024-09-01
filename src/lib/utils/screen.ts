import resolveConfig from "tailwindcss/resolveConfig"

import type { BreakpointKey } from "../types"

import tailwindConfig from "@/../tailwind.config"

const fullConfig = resolveConfig(tailwindConfig)

export const breakpointAsNumber = Object.entries(
  fullConfig.theme.screens
).reduce((acc, curr) => {
  const [breakpoint, value] = curr
  acc[breakpoint] = +value.split("px")[0]
  return acc
}, {}) as Record<BreakpointKey, number>
