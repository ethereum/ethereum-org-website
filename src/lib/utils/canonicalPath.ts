import { getFirstSegment } from "@/lib/utils/url"

export interface CanonicalPathOptions {
  /** Locale prefixes that are no longer served; stripped to the English page */
  deprecatedLocales: ReadonlySet<string>
  /** Locale prefixes that are served (including the default) */
  locales: readonly string[]
  /** Served unprefixed, so its prefix is stripped */
  defaultLocale: string
  /** Sources from redirects.config.js, e.g. "/eth" or "/pdfs/:path*" */
  legacySources: readonly string[]
}

const stripLocale = (path: string, locales: readonly string[]) => {
  const first = getFirstSegment(path)
  if (!first || !locales.includes(first)) return path
  return path.slice(first.length + 1) || "/"
}

const isLegacySource = (path: string, legacySources: readonly string[]) => {
  const bare = path.length > 1 ? path.replace(/\/$/, "") : path
  return legacySources.some((source) =>
    source.endsWith("/:path*")
      ? bare === source.slice(0, -"/:path*".length) ||
        bare.startsWith(source.slice(0, -":path*".length))
      : bare === source
  )
}

/**
 * The path a request should be redirected to, or null when it is already
 * canonical. Canonical is lowercase, without a deprecated or default-locale
 * prefix, and with a trailing slash - all applied in a single hop.
 *
 * Legacy redirect sources (redirects.config.js) keep their slash-less form so
 * Next's own redirect sends them straight to the destination in one hop.
 */
export const getCanonicalRedirectPath = (
  pathname: string,
  {
    deprecatedLocales,
    locales,
    defaultLocale,
    legacySources,
  }: CanonicalPathOptions
): string | null => {
  let path = pathname.toLowerCase()

  const first = getFirstSegment(path)
  if (first && deprecatedLocales.has(first)) {
    path = path.slice(first.length + 1) || "/"
  }

  if (!isLegacySource(stripLocale(path, locales), legacySources)) {
    if (getFirstSegment(path) === defaultLocale) {
      path = path.slice(defaultLocale.length + 1) || "/"
    }
    if (!path.endsWith("/")) path = `${path}/`
  }

  return path === pathname ? null : path
}
