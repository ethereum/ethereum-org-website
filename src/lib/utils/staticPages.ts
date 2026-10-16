import { existsSync, readdirSync } from "fs"
import { join } from "path"

const APP_LOCALE_DIR = join(process.cwd(), "app/[locale]")

// Mirrors Next's INTERCEPTION_ROUTE_MARKERS.
const INTERCEPTION_MARKERS = ["(..)(..)", "(.)", "(..)", "(...)"]

/**
 * Recursively discover all static page paths from app/[locale].
 * Excludes dynamic routes like [slug], [...slug], [application].
 *
 * @returns Array of paths like ["/", "/apps", "/wallets/find-wallet", ...]
 */
export function discoverStaticPages(
  dir: string = APP_LOCALE_DIR,
  basePath: string = ""
): string[] {
  if (!existsSync(dir)) {
    return []
  }

  const pages: string[] = []
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Skip dynamic routes (names starting with '[')
      if (entry.name.startsWith("[")) continue

      // Skip private folders starting with '_' (Next.js convention - not routable)
      if (entry.name.startsWith("_")) continue

      // Skip parallel-route slots ('@modal') and intercepting routes
      // ('(.)[tool]'). Neither is a URL segment, so emitting them produces
      // unroutable paths -- and requesting one makes Next throw
      // "Invalid interception route" while parsing the marker.
      if (entry.name.startsWith("@")) continue
      if (INTERCEPTION_MARKERS.some((m) => entry.name.startsWith(m))) continue

      // Route groups ('(marketing)') are transparent: they contain real pages
      // but contribute no URL segment.
      const isRouteGroup = entry.name.startsWith("(")
      const newBasePath = isRouteGroup ? basePath : `${basePath}/${entry.name}`
      pages.push(...discoverStaticPages(join(dir, entry.name), newBasePath))
    } else if (entry.name === "page.tsx") {
      // Found a page - add the path
      pages.push(basePath || "/")
    }
  }

  return pages
}

let cachedStaticPages: string[] | null = null

/**
 * Get all static page paths from app/[locale], cached after first call.
 * Returns paths with trailing slashes for consistency.
 */
export function getStaticPagePaths(): string[] {
  if (!cachedStaticPages) {
    cachedStaticPages = discoverStaticPages()
  }
  // Normalize to have trailing slashes
  return cachedStaticPages.map((p) => (p === "/" ? "/" : `${p}/`))
}
