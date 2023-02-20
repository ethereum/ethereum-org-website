const HASH_PATTERN = /^#.*/
const isHashLink = (href: string): boolean => HASH_PATTERN.test(href)

export const isExternal = (href: string): boolean =>
  href.includes("http") || href.includes("mailto:") || href.includes("ipfs")

export const isHash = (href: string): boolean => isHashLink(href)

export const isGlossary = (href: string): boolean =>
  href.includes("glossary") && href.includes("#")

export const isStatic = (href: string): boolean => href.includes("static")

export const isPdf = (href: string): boolean => href.includes(".pdf")
