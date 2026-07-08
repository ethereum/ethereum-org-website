import { existsSync, readdirSync } from "fs"
import { join } from "path"

const APP_LOCALE_DIR = join(process.cwd(), "app/[locale]")

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

      const newBasePath = `${basePath}/${entry.name}`
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
