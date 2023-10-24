import { ListProps } from "@chakra-ui/react"
import type { ToCItem } from "@/lib/interfaces"

// RegEx patterns
export const mdHeadingRegEx = /^(#+\s+)(.+)$/
export const customIdRegEx = /^.+(\s*\{#([^\}]+?)\}\s*)$/
export const emojiRegEx = /<Emoji [^/]+\/>/g
export const escapeSlashRegEx = /\\(?=[+*?^$\\.[\]{}()|/#])/g
export const multilineHtmlCommentsRegEx = /<!--[^]*-->/gm

/**
 * Creates a slug from a string (Hello world => hello-world)
 * @param s Any string
 * @returns Lowercased string with spaces replaced with hyphens (kebab-casing)
 */
export const slugify = (s: string): string =>
  encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-"))

/**
 * Parse a heading ID from a Markdown heading string. If the heading contains a custom ID,
 * it will be used as the ID, otherwise the heading will be slugified
 * @param heading Heading string without leading #s that may contain a {#custom-id}
 * @returns Heading ID string
 */
export const parseHeadingId = (heading: string): string => {
  const match = customIdRegEx.exec(heading)
  return match ? match[2].toLowerCase() : slugify(heading)
}

/**
 * Parse out the title to be displayed in the Table of Contents by removing any custom
 * ID and Twemoji components, as well as any backslashes used to escape Markdown characters
 * @param title Heading string without leading #s that may contain Emoji's or a {#custom-id}
 * @returns Title string with custom ID and Emoji's removed
 */
export const parseToCTitle = (title: string): string => {
  const match = customIdRegEx.exec(title)
  const trimmedTitle = match ? title.replace(match[1], "").trim() : title
  const sanitizedTitle = trimmedTitle
    .replaceAll(emojiRegEx, "")
    .replaceAll(escapeSlashRegEx, "")
  return sanitizedTitle
}

/**
 * Common props used used for the outermost list element in the mobile and desktop renders
 */
export const outerListProps: ListProps = {
  borderStart: "1px solid",
  borderStartColor: "dropdownBorder",
  borderTop: 0,
  fontSize: "sm",
  lineHeight: 1.6,
  fontWeight: 400,
  m: 0,
  mt: 2,
  mb: 2,
  ps: 4,
  pe: 1,
  pt: 0,
  sx: {
    // TODO: Flip to object syntax with `lg` token after completion of Chakra migration
    "@media (max-width: 1024px)": {
      borderStart: 0,
      borderTop: "1px",
      borderTopColor: "primary300",
      ps: 0,
      pt: 4,
    },
  },
}

/**
 * Removes content between HTML comment tags
 * @param content Full content as a string
 * @returns Full content as a string with comments removed
 */
export const removeMarkdownComments = (content: string): string =>
  content.replaceAll(multilineHtmlCommentsRegEx, "")

/**
 * Get title and URL from a Markdown heading string. If the heading contains a custom ID,
 * it will be used as the URL, otherwise the title will be slugified
 * @param heading Markdown text string starting with #s, optionally ending with {#id}
 * Example: "### Hello world {#hello-world}" or "## Hello world"
 * @returns Object of type `Item` containing `title` and `url` properties parsed from heading
 */
const parseHeadingToItem = (heading: string): ToCItem => {
  const match = heading.match(mdHeadingRegEx)
  if (!match) throw new Error(`Invalid heading: ${heading}`)
  const title = parseToCTitle(match[2])
  const url = `#${parseHeadingId(heading)}`
  return { title, url }
}

/**
 * Recursive function used to generate nested array of `Items`, nesting according to heading depth
 * @param headings Array of Markdown headings (strings starting with #s)
 * @param h Heading level being parsed (2 for h2, 3 for h3, etc.), starting with 2
 * @returns Array of `Item` objects parsed from the headings
 */
const addHeadingsAsItems = (headings: Array<string>, h = 2): Array<ToCItem> => {
  const items: Array<ToCItem> = []
  const depths: number[] = headings.map(
    (heading) => heading.match(/^#+/)?.[0].length ?? 0
  )
  depths.forEach((depth, i): void => {
    if (depth !== h) return
    const headingItem = parseHeadingToItem(headings[i])
    if (depths[i + 1] > h) {
      const start = i + 1
      const rest = depths.slice(start)
      const end = start + rest.indexOf(h)
      const subHeadings = headings.slice(start, end)
      headingItem.items = addHeadingsAsItems(subHeadings, h + 1)
    }
    items.push(headingItem)
  })
  return items
}

/**
 * Splits the content by lines and filters out lines that don't start with #s
 * Calls `addHeadingAsItem` with array of Markdown headers to generate list of `Item` objects
 * @param content Markdown content as a string (all lines)
 * @returns List of `Item` objects parsed from the content, nested according to heading depth
 */
export const generateTableOfContents = (content: string): Array<ToCItem> => {
  const contentWithoutComments = removeMarkdownComments(content)
  const lines = contentWithoutComments.split("\n")
  const headings = lines.filter((line) => line.startsWith("#"))
  return addHeadingsAsItems(headings)
}
