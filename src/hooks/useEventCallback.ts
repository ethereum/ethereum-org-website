import { useCallback, useRef } from "react"

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect"

/**
 * Custom callback hook from `useHook-ts` that ensures that an event
 * handler is not called while rendering.
 *
 * @source https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useEventCallback/useEventCallback.ts
 */
export function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R
) {
  const ref = useRef<typeof fn>(() => {
    throw new Error("Cannot call an event handler while rendering.")
  })

  useIsomorphicLayoutEffect(() => {
    ref.current = fn
  }, [fn])

  return useCallback((...args: Args) => ref.current(...args), [ref])
}
