import { ListProps } from "@chakra-ui/react"
import type { ToCItem } from "@/lib/interfaces"

export const customIdRegEx = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/
export const emojiRegEx = /<Emoji [^/]+\/>/g

export const slugify = (s: string): string =>
  encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-"))

export const getCustomId = (title: string): string => {
  const match = customIdRegEx.exec(title)
  if (!match) return slugify(title)
  return match[2].toLowerCase()
}

export const trimmedTitle = (title: string): string => {
  const match = customIdRegEx.exec(title)
  const trimmedTitle = match ? title.replace(match[1], "").trim() : title

  // Removes Twemoji components from title
  const emojiMatch = emojiRegEx.exec(trimmedTitle)
  return emojiMatch ? trimmedTitle.replaceAll(emojiRegEx, "") : trimmedTitle
}

/**
 * Removes {#...} from .md file so content can be parsed properly
 * @deprecated Use `trimmedTitle` instead for each heading instead
 * @param mdContent
 * @returns string with {#id} removed
 */
export const removeAnchorLinks = (mdContent: string) =>
  mdContent.replace(/{#.*?}/g, "").trim()

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
  mt: 20,
  mb: 12,
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
export const removeMarkdownComments = (content: string): string => {
  const multilineHtmlCommentsRe = /<!--[^]*-->/gm
  return content.replaceAll(multilineHtmlCommentsRe, "")
}

/**
 * Get title and URL from a Markdown heading string. If the heading contains a custom ID,
 * it will be used as the URL, otherwise the title will be slugified
 * @param heading Markdown text string starting with #s, optionally ending with {#id}
 * Example: "### Hello world {#hello-world}" or "## Hello world"
 * @returns Object of type `Item` containing `title` and `url` properties parsed from heading
 */
const parseHeadingToItem = (heading: string): ToCItem => {
  const re = /^(#+\s+)(.+?)(\s+\{(#[A-Za-z0-9\-_]+?)\})?$/
  const match = heading.match(re)
  if (!match) throw new Error(`Invalid heading: ${heading}`)
  const title = trimmedTitle(match[2])
  const url = `#${getCustomId(heading)}`
  return { title, url }
}

/**
 * Recursive function used to generate nested array of `Items`, nesting according to heading depth
 * @param headings Array of Markdown headings (strings starting with #s)
 * @param h Heading level being parsed (2 for h2, 3 for h3, etc.), starting with 2
 * @returns Array of `Item` objects parsed from the headings
 */
const addHeadingAsItem = (headings: Array<string>, h = 2): Array<ToCItem> => {
  const items: Array<ToCItem> = []
  const depths: number[] = headings.map(
    (heading) => heading.match(/^#+/)?.[0].length ?? 0
  )
  depths.forEach((depth, i): void => {
    if (depth > h) return
    const headingItem: ToCItem = parseHeadingToItem(headings[i])
    if (depths[i + 1] > h) {
      const start = i + 1
      const rest = depths.slice(start)
      const end = start + rest.indexOf(h)
      const subHeadings = headings.slice(start, end)
      headingItem.items = addHeadingAsItem(subHeadings, h + 1)
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
  return addHeadingAsItem(headings)
}
