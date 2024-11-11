import { isMobile } from "./isMobile"

export const isDesktop = (): boolean => {
  if (typeof window === "undefined") return false
  return !isMobile()
}
