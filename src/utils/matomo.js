export const MATOMO_LS_KEY = "ethereum-org.matomo-opt-out"

export const trackCustomEvent = ({
  eventCategory,
  eventAction,
  eventName,
  eventValue,
}) => {
  if (process.env.NODE_ENV === "production" || window.dev === true) {
    const isOptedOut = JSON.parse(localStorage.getItem(MATOMO_LS_KEY))
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
