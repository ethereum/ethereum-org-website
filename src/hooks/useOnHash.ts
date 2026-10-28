import { useEffect, useRef } from "react"

/**
 * Runs `callback` when the URL fragment is `#${hash}`: on mount, and on later in-page
 * navigation to it. The fragment never reaches the server, so static pages stay static.
 */
export const useOnHash = (hash: string | undefined, callback: () => void) => {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (!hash) return
    const check = () => {
      if (window.location.hash === `#${hash}`) callbackRef.current()
    }
    check()
    window.addEventListener("hashchange", check)
    return () => window.removeEventListener("hashchange", check)
  }, [hash])
}
