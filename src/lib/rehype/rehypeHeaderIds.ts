import { visit } from "unist-util-visit"
import type { Plugin } from "unified"
import type { ElementContent, Root } from "hast"
import { getCustomId, trimmedTitle } from "@/lib/utils/toc"

interface Options {}

const setMarkdownHeaderIds: Plugin<[Options], Root> = () => (tree, _file) => {
  visit(tree, "element", (node) => {
    // Ignore non-heading elements
    const headingElements = ["h1", "h2", "h3", "h4", "h5", "h6"]
    if (!headingElements.includes(node.tagName as string)) return
    const concatenated: string = node.children.reduce(
      (acc: string, child: ElementContent) =>
        ("value" in child ? acc + child.value : acc) as string,
      ""
    )
    node.properties.id = getCustomId(concatenated)
    const lastIndex = node.children.length - 1
    const lastChild = node.children[lastIndex] as ElementContent
    if ("value" in lastChild) {
      const lastChildValue: string = lastChild.value as string
      node.children[lastIndex] = {
        type: "text",
        value: trimmedTitle(lastChildValue),
      }
    }
    // TODO: Add pseudo-element to heading to allow for anchor links
  })
}

export default setMarkdownHeaderIds
