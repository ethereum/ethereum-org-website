import type { ToCItem } from "@/lib/types"

type FumadocsToc = {
  title: unknown
  url: string
  depth: number
}[]

const titleToString = (title: unknown): string => {
  if (typeof title === "string") return title
  if (title == null) return ""
  if (typeof title === "number" || typeof title === "boolean")
    return String(title)
  // Heading content with inline HTML/JSX comes through as a React element
  // (e.g., {props: {children: "Foo"}}). Walk it shallowly.
  if (typeof title === "object" && "props" in (title as object)) {
    const children = (title as { props?: { children?: unknown } }).props
      ?.children
    if (typeof children === "string") return children
    if (Array.isArray(children))
      return children.map((c) => titleToString(c)).join("")
  }
  return ""
}

// Convert Fumadocs' flat depth-tagged TOC into our nested `ToCItem` tree.
// Algorithm: keep a stack of ancestors; an item at depth N becomes a child of
// the last ancestor with depth < N. PoC scope; assumes well-ordered headings.
export const fumadocsTocToCItems = (
  toc: FumadocsToc | undefined
): ToCItem[] => {
  if (!toc?.length) return []
  const root: ToCItem[] = []
  const stack: { depth: number; items: ToCItem[] }[] = [
    { depth: 0, items: root },
  ]
  for (const entry of toc) {
    while (stack.length > 1 && stack[stack.length - 1].depth >= entry.depth) {
      stack.pop()
    }
    const item: ToCItem = {
      title: titleToString(entry.title),
      url: entry.url,
    }
    stack[stack.length - 1].items.push(item)
    const nestedContainer: ToCItem[] = []
    item.items = nestedContainer
    stack.push({ depth: entry.depth, items: nestedContainer })
  }
  const prune = (items: ToCItem[]): ToCItem[] =>
    items.map((it) => {
      const kids = it.items ? prune(it.items) : []
      return kids.length
        ? { ...it, items: kids }
        : { title: it.title, url: it.url }
    })
  return prune(root)
}
