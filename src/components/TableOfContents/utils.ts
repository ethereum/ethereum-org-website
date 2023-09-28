import { ListProps } from "@chakra-ui/react"

export const customIdRegEx = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/
export const emojiRegEx = /<Emoji [^/]+\/>/g

export const slugify = (s: string): string =>
  encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-"))

export const getCustomId = (title: string): string => {
  const match = customIdRegEx.exec(title)
  if (match) {
    return match[2].toLowerCase()
  }
  console.warn("Missing custom ID on header: ", title)
  return slugify(title)
}

export const trimmedTitle = (title: string): string => {
  const match = customIdRegEx.exec(title)
  const trimmedTitle = match ? title.replace(match[1], "").trim() : title

  // Removes Twemoji components from title
  const emojiMatch = emojiRegEx.exec(trimmedTitle)
  return emojiMatch ? trimmedTitle.replaceAll(emojiRegEx, "") : trimmedTitle
}

export interface Item {
  title: string
  url: string
  items?: Array<Item>
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
 * Get title and URL from a Markdown heading string. If the heading contains a custom ID,
 * it will be used as the URL, otherwise the title will be slugified
 * @param heading Markdown text string starting with #s, optionally ending with {#id}
 * Example: "### Hello world {#hello-world}" or "## Hello world"
 * @returns Object of type `Item` containing `title` and `url` properties parsed from heading
 */
const parseHeadingToItem = (heading: string): Item => {
  const re = /^(#+\s+)(.+?)(\s+\{(#.*?)\})?$/
  const match = heading.match(re)
  if (!match) throw new Error(`Invalid heading: ${heading}`)
  const [title, id] = [match[2], match[4]]
  const url = id ? id : `#${slugify(title)}`
  const item: Item = { title: title.trim(), url }
  return item
}

/**
 * Recursive function used to generate nested array of `Items`, nesting according to heading depth
 * @param headings Array of Markdown headings (strings starting with #s)
 * @param h Heading level being parsed (2 for h2, 3 for h3, etc.), starting with 2
 * @returns Array of `Item` objects parsed from the headings
 */
const addHeadingAsItem = (headings: Array<string>, h = 2): Array<Item> => {
  const items: Array<Item> = []
  const depths: number[] = headings.map(
    (heading) => heading.match(/^#+/)?.[0].length ?? 0
  )
  depths.forEach((depth, i): void => {
    if (depth > h) return
    const headingItem: Item = parseHeadingToItem(headings[i])
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
export const generateTableOfContents = (content: string): Array<Item> => {
  const lines = content.split("\n")
  const headings = lines.filter((line) => line.startsWith("#"))
  return addHeadingAsItem(headings)
}
