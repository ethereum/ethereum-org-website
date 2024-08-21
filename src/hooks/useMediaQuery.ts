import { useState } from "react"

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect"

const IS_SERVER = typeof window === "undefined"

/**
 * Modified from https://usehooks-ts.com/react-hook/use-media-query
 * to account for an array of queries.
 *
 * Modifications sourced from Chakra-UI.
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/hooks/src/use-media-query.ts
 */
export function useMediaQuery(
  queries: string[],
  fallbackQueries?: boolean[]
): boolean[] {
  const _fallbackQueries = fallbackQueries?.filter(
    (val) => val !== null
  ) as boolean[]

  const [value, setValue] = useState(() => {
    return queries.map((query, idx) => ({
      media: query,
      matches: !IS_SERVER
        ? window.matchMedia(query).matches
        : !!_fallbackQueries[idx],
    }))
  })

  useIsomorphicLayoutEffect(() => {
    const matchMedias = queries.map((query) => window.matchMedia(query))

    // Handles the change event of the media query.
    function handleChange(evt: MediaQueryListEvent) {
      setValue((prev) => {
        return prev.slice().map((item) => {
          if (item.media === evt.media) return { ...item, matches: evt.matches }
          return item
        })
      })
      return
    }

    const cleanups = matchMedias.map((v) => listen(v, handleChange))
    return () => cleanups.forEach((fn) => fn())
  }, [queries])

  return value.map((item) => item.matches)
}

type MediaQueryCallback = (event: MediaQueryListEvent) => void

function listen(query: MediaQueryList, callback: MediaQueryCallback) {
  // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
  try {
    query.addEventListener("change", callback)
    return () => query.removeEventListener("change", callback)
  } catch (e) {
    query.addListener(callback)
    return () => query.removeListener(callback)
  }
}
