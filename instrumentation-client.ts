import * as Sentry from "@sentry/nextjs"

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
    /safari-extension:\/\//,
    // Netlify RUM analytics (blocked by ad blockers, not actionable)
    /\.netlify\/scripts\/rum/,
    /ingesteer\.services-prod\.nsvcs\.net/,
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
    // Resource loading errors - network/ad blocker issues, not actionable (ETHORG-A8, ETHORG-8N)
    /Event `Event` \(type=error\) captured as promise rejection/,
    /NetworkError when attempting to fetch resource/,
    // WebView circular reference serialization failures - wallet app injections (ETHORG-72)
    /JSON\.stringify cannot serialize cyclic structures/,
    // Extension IPC / DApp bridge errors (ETHORG-FN, ETHORG-AT)
    /Object Not Found Matching Id:\d+/,
    /DApp request timeout/,
    // Cross-origin postMessage from extensions/embedded frames (ETHORG-87)
    /^Error: invalid origin$/,
    // Injected scripts from WebViews, adware, and OEM bloatware (ETHORG-14R, ETHORG-13N, ETHORG-JK, ETHORG-14B)
    /LIDNotify is not defined/,
    /tgetT is not defined/,
    /zaloJSV2 is not defined/,
    /onPagePause is not defined/,
  ],

  beforeSend(event) {
    // Filter wallet extension JSON-RPC errors that have no stacktrace (ETHORG-7Q)
    const values = event.exception?.values ?? []
    const hasNoStacktrace = values.every((v) => !v.stacktrace?.frames?.length)
    if (hasNoStacktrace) {
      const message = values[0]?.value ?? ""
      if (/Internal JSON-RPC error/i.test(message)) return null
    }

    // Filter extension injection script errors not caught by denyUrls
    const frames = values.flatMap((v) => v.stacktrace?.frames ?? [])
    const isExtensionScript = frames.some((f) => {
      const filename = f.filename || ""
      const absPath = f.abs_path || ""
      return (
        // Extension preload scripts
        filename.includes("preload/document.js") ||
        absPath.includes("preload/document.js") ||
        // Wallet extension injection scripts (ETHORG-Z1: TronLink, ETHORG-115: wallet bridges)
        /injected\/injected\.js/.test(filename) ||
        /bridge\/inject\.js/.test(filename) ||
        /content[-_]?script\.js/i.test(filename) ||
        /inpage\.js/.test(filename) ||
        // Generic app:// protocol used by extension injected scripts (ETHORG-117: BitVisionWeb wallet)
        filename.startsWith("app:///") ||
        absPath.startsWith("app:///") ||
        // Extension code injected via about:blank contexts (ETHORG-96)
        filename === "about:blank" ||
        absPath === "about:blank"
      )
    })
    return isExtensionScript ? null : event
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
