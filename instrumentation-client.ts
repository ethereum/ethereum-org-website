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
  tracesSampleRate: 0.1,
  environment,
  enabled: environment === "production",
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
