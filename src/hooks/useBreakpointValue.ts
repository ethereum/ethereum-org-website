import { screens } from "@/lib/utils/screen"

import { useMediaQuery } from "./useMediaQuery"

const breakpointMap = {
  // Essentially to query from no width if smaller than "sm"
  base: "0px",
  ...screens,
}

type BreakpointKeys = keyof typeof breakpointMap

export const useBreakpointValue = <T = unknown>(
  values: Partial<Record<BreakpointKeys, T>>,
  fallbackBreakpoint?: BreakpointKeys
): T => {
  const breakpointKeys = Object.keys(values) as BreakpointKeys[]

  let fallbackPassed = false

  const setBreakpoints = Object.entries(breakpointMap)
    .map(([breakpoint, value]) => {
      const item = {
        breakpoint,
        query: `(min-width: ${value})`,
        fallback: !fallbackPassed,
      }

      if (breakpoint === fallbackBreakpoint) {
        fallbackPassed = true
      }

      return item
    })
    .filter(({ breakpoint }) =>
      breakpointKeys.includes(breakpoint as BreakpointKeys)
    )

  const fallbackQueries = setBreakpoints.map(({ fallback }) => fallback)

  const queryValues = useMediaQuery(
    setBreakpoints.map((bp) => bp.query),
    fallbackQueries
  )

  const index = queryValues.lastIndexOf(true)

  const breakpointPicked = breakpointKeys[index]

  return values[breakpointPicked] as T
}
