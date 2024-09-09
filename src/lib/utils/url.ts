import { join } from "path"

import {
  DEFAULT_LOCALE,
  DISCORD_PATH,
  MAIN_CONTENT_ID,
  SITE_URL,
} from "@/lib/constants"

export const isDiscordInvite = (href: string): boolean =>
  href.includes(DISCORD_PATH) && !href.includes("http")

export const isExternal = (href: string): boolean =>
  href.includes("http") ||
  href.includes("mailto:") ||
  href.includes("ipfs") ||
  isDiscordInvite(href)

export const isGlossary = (href: string): boolean =>
  href.includes("glossary") && href.includes("#")

export const isPdf = (href: string): boolean => href.endsWith(".pdf")

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
  addSlashes(new URL(join(locale || DEFAULT_LOCALE, path), SITE_URL).href)
