import { DEFAULT_LOCALE } from "@/lib/constants"

import i18nConfig from "../../../i18n.config.json"
import legacyRedirects from "../../../redirects.config"

import { getFirstSegment } from "./url"

// Locales that have been removed but may have external links pointing to them
const DEPRECATED_LOCALES = new Set([
  // Previously deprecated
  "pcm",
  "fil",
  "ph",
  // Removed in locale reduction (67 → 25)
  "am",
  "az",
  "be",
  "bg",
  "bs",
  "ca",
  "da",
  "el",
  "fa",
  "fi",
  "ga",
  "gl",
  "gu",
  "ha",
  "he",
  "hr",
  "hu",
  "hy-am",
  "ig",
  "ka",
  "kk",
  "km",
  "kn",
  "lt",
  "ml",
  "ms",
  "nb",
  "ne-np",
  "nl",
  "no",
  "pt",
  "ro",
  "se",
  "sk",
  "sl",
  "sn",
  "sr",
  "sv",
  "th",
  "tk",
  "tl",
  "tw",
  "uz",
  "yo",
])

// Full list, not LOCALES_CODES: subset builds must route like production
const LOCALES = new Set(i18nConfig.map(({ code }) => code))

/**
 * Compiles a redirects.config.js source to a case-insensitive regex. Supports
 * literal (possibly percent-encoded) segments, `:name` and a trailing `:name*`.
 */
export const compileRedirectSource = (source: string): RegExp | null => {
  let pattern = ""
  const segments = source.split("/").slice(1)
  for (const [i, segment] of segments.entries()) {
    if (/^:\w+\*$/.test(segment) && i === segments.length - 1) {
      pattern += "(?:/[^/]+)*"
    } else if (/^:\w+$/.test(segment)) {
      pattern += "/[^/]+"
    } else if (/^[\w.~%-]+$/.test(segment)) {
      pattern += `/${segment.replace(/\./g, "\\.")}`
    } else {
      return null
    }
  }
  return new RegExp(`^${pattern}/?$`, "i")
}

type LegacyRedirect = { destination: string; permanent: boolean }

const LEGACY_LITERALS = new Map<string, LegacyRedirect>()
const LEGACY_PATTERNS: [RegExp, LegacyRedirect][] = []
for (const [source, destination, permanent = true] of legacyRedirects) {
  const redirect = { destination, permanent }
  if (!source.includes(":")) {
    LEGACY_LITERALS.set(source.toLowerCase(), redirect)
    continue
  }
  const pattern = compileRedirectSource(source)
  if (pattern) LEGACY_PATTERNS.push([pattern, redirect])
}

/** The redirects.config.js entry for a locale-less, lowercase pathname */
export const findLegacyRedirect = (
  pathname: string
): LegacyRedirect | undefined =>
  LEGACY_LITERALS.get(
    pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname
  ) ?? LEGACY_PATTERNS.find(([pattern]) => pattern.test(pathname))?.[1]

const withTrailingSlash = (pathname: string) =>
  pathname.endsWith("/") ? pathname : `${pathname}/`

/** `destination` is a path (may carry `?`/`#`) or an absolute URL */
export type PathRoute = { destination: string; permanent: boolean }

/**
 * Redirect the proxy issues before i18n routing, resolved in one hop. On
 * Netlify it runs before Next's own redirects (see next.config.js).
 */
export const resolvePathRoute = (pathname: string): PathRoute | null => {
  // Collapse `//` first: Netlify relativizes same-origin Locations, so a
  // target like `//evil.com/x/` would become an open redirect.
  let path = pathname.replace(/\/{2,}/g, "/").toLowerCase()

  const deprecated = getFirstSegment(path)
  if (DEPRECATED_LOCALES.has(deprecated)) {
    path = path.slice(deprecated.length + 1) || "/"
  }

  const segment = getFirstSegment(path)
  const locale = LOCALES.has(segment) ? segment : null
  const rest = locale ? path.slice(segment.length + 1) || "/" : path

  const legacy = findLegacyRedirect(rest)
  if (legacy) {
    const { destination, permanent } = legacy
    const prefixed =
      locale && locale !== DEFAULT_LOCALE && destination.startsWith("/")
    return {
      destination: prefixed ? `/${locale}${destination}` : destination,
      permanent,
    }
  }

  // Otherwise-canonical default-locale paths are left to next-intl, whose
  // prefix strip already lands on the slashed URL in one hop.
  if (locale === DEFAULT_LOCALE && path === pathname) return null

  const destination = withTrailingSlash(locale === DEFAULT_LOCALE ? rest : path)
  return destination === pathname ? null : { destination, permanent: true }
}
