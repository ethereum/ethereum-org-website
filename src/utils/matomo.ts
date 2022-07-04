export const MATOMO_LS_KEY = "ethereum-org.matomo-opt-out"

export interface EventOptions {
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
}: EventOptions): void => {
  if (process.env.NODE_ENV === "production" || window.dev === true) {
    const optedOutValue = localStorage.getItem(MATOMO_LS_KEY) || "false"
    const isOptedOut = JSON.parse(optedOutValue)
    if (!window._paq || isOptedOut) return

    const { _paq, dev } = window

    _paq.push([`trackEvent`, eventCategory, eventAction, eventName, eventValue])

    if (dev) {
      console.debug(
        `[Matomo] event tracked, category: ${eventCategory}, action: ${eventAction}, name: ${eventName}, value: ${eventValue}`
      )
    }
  }
}
