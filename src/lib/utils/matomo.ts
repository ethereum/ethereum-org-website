import { push } from "@socialgouv/matomo-next"

import { IS_PROD } from "./env"

export const MATOMO_LS_KEY = "ethereum-org.matomo-opt-out"

export interface MatomoEventOptions {
  eventCategory: string
  eventAction: string
  eventName: string
  eventValue?: string
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
  window && push([`setCustomUrl`, window.location.href.replace(/[?#].*$/, "")])
  push([`trackEvent`, eventCategory, eventAction, eventName, eventValue])
}
