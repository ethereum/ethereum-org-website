import { visit } from "unist-util-visit"
import type { Plugin } from "unified"
import type { Element, Root } from "hast"
import { getCustomId, trimmedTitle } from "@/lib/utils/toc"

interface Options {
  dir: string
  srcPath: string
}

const setMarkdownHeaderIds: Plugin<[Options], Root> = () => (tree, _file) => {
  visit(tree, "element", (node: Element) => {
    // Ignore non-heading elements
    const headingElements = ["h1", "h2", "h3", "h4", "h5", "h6"]
    if (!headingElements.includes(node.tagName as string)) return
    // TODO: Fix type issue
    const concatenated: string = node.children.reduce(
      (acc, { value }) => acc + value,
      ""
    )
    node.properties.id = getCustomId(concatenated)
    const lastIndex = node.children.length - 1
    const lastChild: string = node.children[lastIndex].value
    node.children[lastIndex].value = trimmedTitle(lastChild)
    // TODO: Add pseudoelement to heading to allow for anchor links
  })
}

export default setMarkdownHeaderIds
