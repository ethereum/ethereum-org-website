import { extname, join } from "path"

import { Lang } from "@/lib/types"

import {
  DEFAULT_LOCALE,
  DISCORD_PATH,
  MAIN_CONTENT_ID,
  SITE_URL,
} from "@/lib/constants"

export const isDiscordInvite = (href: string): boolean =>
  href.includes(DISCORD_PATH) && !href.includes("http")

export const isMailto = (href: string): boolean => href.includes("mailto:")

export const isExternal = (href: string): boolean =>
  href.includes("http") ||
  isMailto(href) ||
  href.includes("ipfs") ||
  isDiscordInvite(href)

export const isGlossary = (href: string): boolean =>
  href.includes("glossary") && href.includes("#")

export const isPdf = (href: string): boolean => href.endsWith(".pdf")

export const isFile = (href: string): boolean => extname(href).length > 0

export const sanitizeHitUrl = (url: string): string =>
  url
    .replace(/^https?:\/\/[^/]+(?=\/)/, "")
    .replace(`#${MAIN_CONTENT_ID}`, "")
    .replace("#content", "")
    .replace("#top", "")

// remove any query params or hashes from the path
export const cleanPath = (path: string): string => path.replace(/[$#].+$/, "")

export const isHrefActive = (
  href: string,
  pathname: string,
  isPartiallyActive?: boolean
) =>
  isPartiallyActive ? pathname.startsWith(href) : cleanPath(pathname) === href

export const isHash = (href: string): boolean => href.startsWith("#")

export const addSlashes = (href: string): string => {
  if (isExternal(href)) return href
  return join("/", href, "/")
}

export const getFullUrl = (locale: string | undefined, path: string) =>
  DEFAULT_LOCALE === locale || !locale
    ? addSlashes(new URL(path, SITE_URL).href)
    : addSlashes(new URL(join(locale, path), SITE_URL).href)

// Remove trailing slash from slug and add leading slash
export const normalizeSlug = (slug: string) => {
  return `/${slug.replace(/^\/+|\/+$/g, "")}`
}

/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to convert (e.g., "Governance/DAO", "Bridge Aave 1", "Hello world")
 * @returns URL slug (e.g., "governance-dao", "bridge-aave-1", "hello-world")
 */
export const slugify = (text: string): string => {
  return encodeURIComponent(
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
  )
}

export const normalizeUrlForJsonLd = (
  locale: string | Lang | undefined,
  pathWithoutLocale: string
): string => {
  if (!locale) {
    return new URL(pathWithoutLocale, SITE_URL).toString()
  }
  const path = join(locale === DEFAULT_LOCALE ? "" : locale, pathWithoutLocale)
  const url = new URL(path, SITE_URL)
  return url.toString()
}

/**
 * Get the base URL for API requests.
 * In development, uses localhost with the port from environment or default 3000.
 * Otherwise uses SITE_URL.
 */
export const getBaseUrl = (): string => {
  // In development, use localhost
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT || "3000"
    return `http://localhost:${port}`
  }
  return SITE_URL
}
