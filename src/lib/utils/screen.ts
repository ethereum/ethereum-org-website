import type { BreakpointKey } from "../types"

import twConfig from "@/styles/config"

export const breakpointAsNumber = Object.entries(twConfig.theme.screens).reduce(
  (acc, curr) => {
    const [breakpoint, value] = curr
    acc[breakpoint] = +value.split("px")[0]
    return acc
  },
  {}
) as Record<BreakpointKey, number>
