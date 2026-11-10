import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

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

const LOCALES = new Set<string>(LOCALES_CODES)

/**
 * Compiles a redirects.config.js source to a regex. Supports the subset those
 * sources use: literal (possibly percent-encoded) segments plus `:name` and a trailing `:name*`. Returns
 * null for anything else; a unit test fails if a source ever needs it.
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
  return new RegExp(`^${pattern}/?$`)
}

const LEGACY_SOURCE_PATTERNS = legacyRedirects
  .map(([source]) => compileRedirectSource(source))
  .filter((pattern): pattern is RegExp => pattern !== null)

/** Whether a locale-less, lowercase pathname is a redirects.config.js source */
export const isLegacyRedirectSource = (pathname: string): boolean =>
  LEGACY_SOURCE_PATTERNS.some((pattern) => pattern.test(pathname))

const withTrailingSlash = (pathname: string) =>
  pathname.endsWith("/") ? pathname : `${pathname}/`

export type PathRoute = { type: "redirect" | "rewrite"; pathname: string }

/**
 * URL normalization the proxy applies before i18n routing. Redirect targets
 * always carry the trailing slash, so each case resolves in one 301 hop.
 *
 * On Netlify the proxy runs before Next's own trailingSlash redirect and
 * next-intl rewrites `/foo` to `/en/foo/`, so without the slash redirect here
 * a slash-less English URL renders a 200 duplicate. Locally Next redirects
 * first and the proxy never sees slash-less paths.
 */
export const resolvePathRoute = (pathname: string): PathRoute | null => {
  const lowerPath = pathname.toLowerCase()
  if (pathname !== lowerPath) {
    return { type: "redirect", pathname: withTrailingSlash(lowerPath) }
  }

  const firstSegment = getFirstSegment(pathname)

  if (firstSegment && DEPRECATED_LOCALES.has(firstSegment)) {
    // Strip deprecated locale and redirect to default locale version
    const rest = pathname.slice(firstSegment.length + 1) || "/"
    return { type: "redirect", pathname: withTrailingSlash(rest) }
  }

  const locale = LOCALES.has(firstSegment) ? firstSegment : null
  const rest = locale ? pathname.slice(locale.length + 1) || "/" : pathname

  // Rewrite legacy sources to the slashed, locale-prefixed form their
  // next.config rule matches after the proxy, so they reach the destination
  // in one hop instead of detouring through a slash or `/en` strip redirect.
  if (isLegacyRedirectSource(rest)) {
    return {
      type: "rewrite",
      pathname: withTrailingSlash(`/${locale ?? DEFAULT_LOCALE}${rest}`),
    }
  }

  // Default-locale paths are left to next-intl, whose prefix strip already
  // lands on the slashed URL in one hop.
  if (locale !== DEFAULT_LOCALE && !pathname.endsWith("/")) {
    return { type: "redirect", pathname: `${pathname}/` }
  }

  return null
}
