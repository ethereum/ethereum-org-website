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

const pushMatomoEvent = (
  currentUrl: string,
  { eventCategory, eventAction, eventName, eventValue }: MatomoEventOptions
) => {
  push([`setCustomUrl`, currentUrl])
  push([`trackEvent`, eventCategory, eventAction, eventName, eventValue])
}

// Use only for user-initiated actions (clicks, submits, swipes). Passive
// visibility/scroll tracking inflates `nb_actions` and breaks bounce-rate
// comparability with pages that don't auto-fire events.
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

  // Capture URL synchronously — client-side navigations can change
  // window.location before the idle callback fires
  const currentUrl = window.location.href.split(/[?#]/)[0]

  scheduleIdleCallback(() => {
    pushMatomoEvent(currentUrl, {
      eventCategory,
      eventAction,
      eventName,
      eventValue,
    })
  })
}

// Synchronous variant for external links (target="_blank").
// requestIdleCallback is throttled when the tab is backgrounded after
// opening a new tab, so the deferred push is lost (see #18928).
// This fires immediately on click to survive backgrounding.
export const trackCustomEventImmediate = ({
  eventCategory,
  eventAction,
  eventName,
  eventValue,
}: MatomoEventOptions): void => {
  if (!IS_PROD) return
  if (navigator.doNotTrack === "1") return
  if (isOptedOut()) return
  const currentUrl = window.location.href.split(/[?#]/)[0]
  pushMatomoEvent(currentUrl, {
    eventCategory,
    eventAction,
    eventName,
    eventValue,
  })
}

// Dimension 1 is the A/B variant; 2 must exist in Matomo with visit scope.
export const AUTOMATION_DIMENSION_ID = 2

export type AutomationVerdict = "human" | "webdriver" | "headless-ua"

type AutomationSignals = {
  webdriver: boolean
  userAgent: string
}

// Independent of the resolution/version heuristics the bot census uses -- don't
// add screen-size checks, that independence is what makes agreement meaningful.
export const classifyAutomation = ({
  webdriver,
  userAgent,
}: AutomationSignals): AutomationVerdict => {
  if (webdriver) return "webdriver"
  if (/headless/i.test(userAgent)) return "headless-ua"
  return "human"
}

export const detectAutomation = (): AutomationVerdict =>
  classifyAutomation({
    webdriver: navigator.webdriver,
    userAgent: navigator.userAgent,
  })
