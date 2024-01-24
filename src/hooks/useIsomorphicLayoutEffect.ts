import { useEffect, useLayoutEffect } from "react"

/**
 * useHook from `useHook-ts` that determines which effect hook to use
 * based on the execution environment.
 *
 * @source https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect
