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
