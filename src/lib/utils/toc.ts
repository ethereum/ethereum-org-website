import { ListProps } from "@chakra-ui/react"

import type { SourceHeadingItem, ToCItem } from "@/lib/types"
import type { TocNodeType } from "../rehype/remarkInferToc"

// RegEx patterns
const customIdRegEx = /^.+(\s*\{#([^\}]+?)\}\s*)$/
const emojiRegEx = /<Emoji [^/]+\/>/g

const unicodeEmojiRegEx = /\\u{[0-9A-F]+}/gi
const unicodeIntlRegEx = /\\u[0-9A-F]+/gi

/**
 * Creates a slug from a string (Hello world => hello-world)
 * @param s Any string
 * @returns Lowercased string with spaces replaced with hyphens (kebab-casing)
 */
const slugify = (s: string): string =>
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
 * Parse out the title to be displayed in the Table of Contents
 * @param title Heading string without leading #s that may contain Emoji's or a {#custom-id}
 * @returns Title string with custom ID and Emoji's removed
 */
export const parseToCTitle = (title: string): string => {
  const match = customIdRegEx.exec(title)
  const trimmedTitle = match ? title.replace(match[1], "").trim() : title
  const sanitizedTitle = trimmedTitle
    .replaceAll(unicodeEmojiRegEx, (match) =>
      String.fromCodePoint(parseInt(match.slice(3, -1), 16))
    )
    .replaceAll(unicodeIntlRegEx, (match) =>
      String.fromCharCode(parseInt(match.slice(2), 16))
    )
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
 * Refactor title and URL from `SourceHeadingItem` object. The contained `id`'s are obtained
 * from the compiled DOM source and do not need further alteration.
 * @param heading SourceHeadingItem object with label and id strings
 * @returns Object of type `Item` containing `title` and `url` properties parsed from heading
 */
const parseSourceToToCItem = ({ label, id }: SourceHeadingItem): ToCItem => ({
  title: parseToCTitle(label),
  url: "#" + id,
})

/**
 * Recursive function used to generate nested array of `Items`, nesting according to heading depth
 * @param headings Array of `SourceHeadingItem` objects: { depth: number, id: string, label: string }
 * @param h Heading level being parsed (2 for h2, 3 for h3, 4 for h4), starting with 2
 * @returns Array of `Item` objects parsed from the headings
 */
const addHeadingsAsItems = (
  headings: Array<SourceHeadingItem>,
  h = 2
): Array<ToCItem> => {
  const items: Array<ToCItem> = []
  const depths: number[] = headings.map(({ depth }) => depth)
  depths.forEach((depth, i): void => {
    if (depth !== h) return
    const headingItem = parseSourceToToCItem(headings[i])
    if (depths[i + 1] > h) {
      const start = i + 1
      const rest = depths.slice(start)
      const stepOutIndex = rest.indexOf(h)
      const end = stepOutIndex < 0 ? headings.length : start + stepOutIndex
      const subHeadings = headings.slice(start, end)
      headingItem.items = addHeadingsAsItems(subHeadings, h + 1)
    }
    items.push(headingItem)
  })
  return items
}

/**
 * TODO: Update documentation comments
 * @param title
 * @returns
 */
export const trimmedTitle = (title: string): string => {
  const match = customIdRegEx.exec(title)
  const trimmedTitle = match ? title.replace(match[1], "").trim() : title

  // Removes Twemoji components from title
  const emojiMatch = emojiRegEx.exec(trimmedTitle)
  return emojiMatch ? trimmedTitle.replaceAll(emojiRegEx, "") : trimmedTitle
}

/**
 * Recursive function to sanitize original `title` property, and extract appropriate heading id
 * title comes in form 'A note on names {#a-note-on-names}'
 * url is in form '#a-note-on-names'... if no {#name} exists, call slugify(title) for url
 *
 * @param item: Of ToCItem type, { title: string, url: string, items?: ToCItem[] }
 * @returns Updated ToCItem with cleaned up title, url, and any subitems
 */
const parseItem = (item: ToCItem): ToCItem => {
  const { title, items: subItems } = item
  const parsedItem = {
    title: trimmedTitle(title),
    url: `#${parseHeadingId(title)}`,
  }
  if (!subItems) return parsedItem
  return {
    ...parsedItem,
    items: subItems.map(parseItem),
  }
}

/**
 * Remaps the ToC generated by remarkInferToc plugin (@/lib/rehype/remarkInferToc.ts)
 * Note: each file should only have one h1, and it is not included in the ToC
 * @param tocNodeItems Array of TocNodeType objects generated by remarkInferToc
 * @returns Modified array of ToCItem objects
 */

export const remapTableOfContents = (
  tocNodeItems: TocNodeType[],
  compiledSource: string
): ToCItem[] => {
  const h1Count = Array.from(compiledSource.matchAll(/mdx\("h1"/g)).length
  if ("url" in tocNodeItems[0] && h1Count > 1) {
    console.warn("More than one h1 found in file at id:", tocNodeItems[0].url)
  }
  const items = (
    h1Count > 0 && "items" in tocNodeItems[0]
      ? tocNodeItems[0].items
      : tocNodeItems
  ) as ToCItem[]
  return items.map(parseItem)
}
