import { push } from "@socialgouv/matomo-next"

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
  if (process.env.NODE_ENV !== "production") return
  const optedOutValue = localStorage.getItem(MATOMO_LS_KEY) || "false"
  const isOptedOut = JSON.parse(optedOutValue)
  if (isOptedOut) return

  // Set custom URL removing any query params or hash fragments
  window && push([`setCustomUrl`, window.location.href.replace(/[?#].*$/, "")])
  push([`trackEvent`, eventCategory, eventAction, eventName, eventValue])

  console.debug(
    `[Matomo] event tracked, category: ${eventCategory}, action: ${eventAction}, name: ${eventName}, value: ${eventValue}`
  )
}
