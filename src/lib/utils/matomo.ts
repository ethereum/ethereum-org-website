import { push } from "@socialgouv/matomo-next"

import type { MatomoEventOptions } from "@/lib/types"

import { IS_PROD } from "./env"

export const MATOMO_LS_KEY = "ethereum-org.matomo-opt-out"

let cachedOptOut: boolean | null = null

export const isOptedOut = (): boolean => {
  if (cachedOptOut !== null) return cachedOptOut
  try {
    const value = localStorage.getItem(MATOMO_LS_KEY) || "false"
    cachedOptOut = JSON.parse(value)
  } catch {
    cachedOptOut = false
  }
  return cachedOptOut as boolean
}

export const clearMatomoOptOutCache = () => {
  cachedOptOut = null
}

const scheduleIdleCallback =
  typeof requestIdleCallback === "function"
    ? requestIdleCallback
    : (cb: () => void) => setTimeout(cb, 0)

export const trackCustomEvent = ({
  eventCategory,
  eventAction,
  eventName,
  eventValue,
}: MatomoEventOptions): void => {
  if (!IS_PROD) return

  // Respect Do Not Track header
  if (navigator.doNotTrack === "1") return

  if (isOptedOut()) return

  scheduleIdleCallback(() => {
    // Set custom URL removing any query params or hash fragments
    if (window) {
      push([`setCustomUrl`, window.location.href.split(/[?#]/)[0]])
    }
    push([`trackEvent`, eventCategory, eventAction, eventName, eventValue])
  })
}
