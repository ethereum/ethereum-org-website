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
  tracesSampleRate: 0.01,
  debug: environment === "development",
  environment,
  enabled: environment === "production",

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
    // Extension messaging errors
    /Could not establish connection\. Receiving end does not exist/,
    /Attempting to use a disconnected port object/,
    // Resource loading errors - network/ad blocker issues, not actionable (ETHORG-A8)
    /Event `Event` \(type=error\) captured as promise rejection/,
    // WebView circular reference serialization failures - wallet app injections (ETHORG-72)
    /JSON\.stringify cannot serialize cyclic structures/,
  ],

  beforeSend(event) {
    // Filter extension injection script errors not caught by denyUrls
    const frames = event.exception?.values?.[0]?.stacktrace?.frames ?? []
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
  // Normalize transaction names for parameterized routes to enable per-page analysis
  // Sentry uses formats like "/:locale/:slug*" for catch-all routes
  beforeSendTransaction(event) {
    const op = event.contexts?.trace?.op
    const transaction = event.transaction

    // Matches patterns like ":locale", ":slug*", ":id", ":post", etc.
    const isParameterizedRoute = transaction && /:\w+/.test(transaction)
    const isPageTransaction = op === "pageload" || op === "navigation"

    if (isParameterizedRoute && isPageTransaction) {
      const url = event.request?.url || (event.tags?.url as string | undefined)
      if (url) {
        try {
          const pathname = new URL(url).pathname
          // Remove locale prefix (e.g., "/en/", "/fil/", "/zh-tw/", "/pt-br/"), keeping just the page path
          // e.g., "/en/developers/docs" -> "/developers/docs"
          // Only match complete path segments (must be followed by "/" or end of string)
          const normalizedPath = pathname.replace(
            /^\/[a-z]{2,3}(-[a-z]{2})?(?=\/|$)/,
            ""
          )
          event.transaction = normalizedPath || "/"
        } catch {
          // Keep original transaction name if URL parsing fails
        }
      }
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
