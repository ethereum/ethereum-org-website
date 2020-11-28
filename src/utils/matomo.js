export const trackCustomEvent = ({
  eventCategory,
  eventAction,
  eventName,
  eventValue,
}) => {
  if (process.env.NODE_ENV === "production" || window.dev === true) {
    if (!window._paq) return

    const { _paq, dev } = window

    _paq.push([`trackEvent`, eventCategory, eventAction, eventName, eventValue])

    if (dev) {
      console.debug(
        `[Matomo] event tracked, category: ${eventCategory}, action: ${eventAction}, name: ${eventName}, value: ${eventValue}`
      )
    }
  }
}
