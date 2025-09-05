import { push } from "@socialgouv/matomo-next"

import type { MatomoEventOptions } from "@/lib/types"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { IS_PROD } from "./env"

export const MATOMO_LS_KEY = "ethereum-org.matomo-opt-out"

/**
 * Normalizes paths to ensure consistent Matomo tracking.
 * With localePrefix: "as-needed", English paths don't have /en prefix,
 * but we want to track them as /en paths for analytics consistency.
 */
export const normalizePathForMatomo = (pathname: string): string => {
  const hasLocalePrefix = LOCALES_CODES.some((locale) =>
    pathname.startsWith(`/${locale}/`)
  )

  if (hasLocalePrefix) {
    return pathname
  }

  // For paths without locale prefix (English content), add /en prefix
  return `/${DEFAULT_LOCALE}${pathname}`
}

export const trackCustomEvent = ({
  eventCategory,
  eventAction,
  eventName,
  eventValue,
}: MatomoEventOptions): void => {
  if (!IS_PROD) return

  // Respect Do Not Track header
  if (navigator.doNotTrack === "1") return

  const optedOutValue = localStorage.getItem(MATOMO_LS_KEY) || "false"
  const isOptedOut = JSON.parse(optedOutValue)
  if (isOptedOut) return

  // Set custom URL removing any query params or hash fragments
  if (window) {
    const normalizedPathname = normalizePathForMatomo(window.location.pathname)
    const normalizedUrl = window.location.origin + normalizedPathname
    push([`setCustomUrl`, normalizedUrl])
  }
  push([`trackEvent`, eventCategory, eventAction, eventName, eventValue])
}
