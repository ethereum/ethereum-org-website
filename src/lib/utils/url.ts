import { DISCORD_PATH, MAIN_CONTENT_ID } from "@/lib/constants"

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
    .replace(/^https?:\/\/[^\/]+(?=\/)/, "")
    .replace(`#${MAIN_CONTENT_ID}`, "")
    .replace("#content", "")
    .replace("#top", "")

export const isHrefActive = (
  href: string,
  pathname: string,
  isPartiallyActive?: boolean
) => {
  // remove any potential trailing slash to compare the paths correctly
  const cleanHref = href.replace(/\/+$/, "")

  return isPartiallyActive
    ? pathname.startsWith(cleanHref)
    : pathname === cleanHref
}

export const isHash = (href: string): boolean => href.startsWith("#")