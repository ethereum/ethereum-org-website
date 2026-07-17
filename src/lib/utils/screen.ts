import type { BreakpointKey } from "../types"

export const screens = {
  sm: "480px",
  md: "768px",
  lg: "992px",
  xl: "1280px",
  "2xl": "1536px",
} as const satisfies Record<string, string>

export const breakpointAsNumber = Object.entries(screens).reduce(
  (acc, curr) => {
    const [breakpoint, value] = curr
    acc[breakpoint] = +value.split("px")[0]
    return acc
  },
  {}
) as Record<BreakpointKey, number>
