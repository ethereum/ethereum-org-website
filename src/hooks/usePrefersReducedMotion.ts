import { useMediaQuery } from "usehooks-ts"

export const usePrefersReducedMotion = () => {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  return { prefersReducedMotion }
}
