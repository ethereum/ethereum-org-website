import { getLoadedSentry, loadSentry } from "@/lib/sentry/client"

// Sentry is loaded after the page is idle instead of before hydration: the SDK
// is the largest script on every page. Pageload traces still start at the
// navigation's time origin and Web Vitals are read from buffered performance
// entries, so late initialisation keeps them. Uncaught errors from before it
// loads are buffered here and replayed.
const MAX_EARLY_ERRORS = 20
const earlyErrors: unknown[] = []

const onEarlyError = (event: ErrorEvent) => {
  if (earlyErrors.length < MAX_EARLY_ERRORS) {
    earlyErrors.push(event.error ?? event.message)
  }
}
const onEarlyRejection = (event: PromiseRejectionEvent) => {
  if (earlyErrors.length < MAX_EARLY_ERRORS) earlyErrors.push(event.reason)
}

window.addEventListener("error", onEarlyError)
window.addEventListener("unhandledrejection", onEarlyRejection)

const start = () => {
  void loadSentry().then((sentry) => {
    // Sentry's own global handlers take over from here
    window.removeEventListener("error", onEarlyError)
    window.removeEventListener("unhandledrejection", onEarlyRejection)
    earlyErrors.splice(0).forEach((error) => sentry.captureException(error))
  })
}

const scheduleStart = () => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 5000 })
  } else {
    setTimeout(start, 2000)
  }
}

if (document.readyState === "complete") {
  scheduleStart()
} else {
  window.addEventListener("load", scheduleStart, { once: true })
}

// Client-side navigations before Sentry has loaded are not traced
export const onRouterTransitionStart = (href: string, navigationType: string) =>
  getLoadedSentry()?.captureRouterTransitionStart(href, navigationType)
