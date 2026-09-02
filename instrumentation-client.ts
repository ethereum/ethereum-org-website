import * as Sentry from "@sentry/nextjs"

import { getDropReason } from "@/lib/sentry/filter-event"

const environment = process.env.NEXT_PUBLIC_CONTEXT || "development"

/**
 * Finds the closest element (including the element itself) that has an id attribute
 * @param element - The starting element to search from
 * @param maxDepth - Maximum number of parent levels to search (default: 3)
 * @returns The first found attribute value in priority order, null otherwise
 */
function findClosestElementId(
  element: Element | null | undefined,
  maxDepth: number = 3
): string | null {
  if (!element || maxDepth < 0) return null

  const sentryId = element.getAttribute("data-testid")
  if (sentryId) return sentryId

  const ariaLabel = element.getAttribute("aria-label")
  if (ariaLabel) return ariaLabel

  const id = element.getAttribute("id")
  if (id) return id

  // Recursively check parent elements up to maxDepth
  return findClosestElementId(element.parentElement, maxDepth - 1)
}

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampler(samplingContext) {
    // 10% of pageloads for reliable Web Vitals data
    if (samplingContext.attributes?.["sentry.op"] === "pageload") {
      return 0.1
    }
    // 1% for everything else
    return 0.01
  },
  debug: environment === "development",
  environment,
  enabled: environment === "production",
  initialScope: { tags: { module: "app" } },

  // Filter errors from browser extensions and third-party scripts
  denyUrls: [
    // Browser extension protocols
    /chrome-extension:\/\//,
    /moz-extension:\/\//,
    /safari(-web)?-extension:\/\//,
    // Netlify RUM analytics (blocked by ad blockers, not actionable)
    /\.netlify\/scripts\/rum/,
  ],

  // Filter common extension error messages and non-actionable errors
  ignoreErrors: [
    // Wallet extension proxy/property conflicts (ETHORG-Z1, ETHORG-115)
    /on proxy: trap returned falsish/i,
    /Cannot set property ethereum of #<Window>/,
    /Cannot set property isMetaMask of #<.+> which has only a getter/,
    // Extension messaging errors (ETHORG-7E)
    /Could not establish connection\. Receiving end does not exist/,
    /Attempting to use a disconnected port object/,
    /Invalid call to runtime\.sendMessage\(\)/,
    // Netlify RUM fetch blocked by ad blockers - the host is only in the
    // message, so denyUrls cannot match it (ETHORG-76)
    /\(ingesteer\.services-prod\.nsvcs\.net\)/,
    // WebView circular reference serialization failures - wallet app injections (ETHORG-72)
    /JSON\.stringify cannot serialize cyclic structures/,
    // Extension IPC / DApp bridge errors (ETHORG-FN, ETHORG-AT)
    /Object Not Found Matching Id:\d+/,
    /DApp request timeout/,
    // Cross-origin postMessage from extensions/embedded frames (ETHORG-87)
    /^Error: invalid origin$/,
    // Non-standard global referenced by a browser extension's injected
    // hit-testing script, not defined anywhere in our bundle (ETHORG-1B1)
    /Can't find variable: GetHTMLElementsAtPoint/,
  ],

  beforeSend(event) {
    return getDropReason(event) ? null : event
  },

  // Normalize transaction names to strip locale prefixes so all locales
  // group under one page (e.g., "/en/staking/", "/ko/staking/" → "/staking/")
  beforeSendTransaction(event) {
    const op = event.contexts?.trace?.op
    if (op !== "pageload" && op !== "navigation") return event

    const localePrefix = /^\/[a-z]{2,3}(-[a-z]{2})?(?=\/|$)/

    // Try to resolve from the actual URL first (most reliable)
    const url = event.request?.url || (event.tags?.url as string | undefined)
    if (url) {
      try {
        const pathname = new URL(url).pathname
        event.transaction = pathname.replace(localePrefix, "") || "/"
        return event
      } catch {
        // Fall through to transaction name normalization
      }
    }

    // Fallback: normalize the transaction name directly
    // Handles parameterized names like "/:locale/:slug*" → "/:slug*"
    if (event.transaction) {
      event.transaction =
        event.transaction.replace(localePrefix, "").replace(/^\/:locale/, "") ||
        "/"
    }
    return event
  },

  beforeBreadcrumb(breadcrumb, hint) {
    if (breadcrumb.category === "ui.click") {
      const element = hint?.event?.target

      const id = findClosestElementId(element)
      if (id) {
        breadcrumb.message = id + " (" + breadcrumb.message + ")"
      }
    }

    return breadcrumb
  },
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
