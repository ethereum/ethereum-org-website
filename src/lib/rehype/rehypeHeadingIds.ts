import type { ElementContent, Root } from "hast"
import type { Plugin } from "unified"
import { visit } from "unist-util-visit"

import { parseHeadingId, trimmedTitle } from "@/lib/utils/toc"

/**
 * Parses DOM elements to find all headings, setting an `id` attribute on each one.
 * The `parseHeadingId` Table of Contents utility functions is used to generate the `id`
 * for each, allowing ToC links to match.
 * The `trimmedTitle` function is used to remove any trailing `{#id}` from the heading
 * @returns Plugin<[{}], Root>, a rehype plugin that can be used in [...dynamic-md-pages].tsx
 */
const setMarkdownHeadingIds: Plugin<[Record<string, never>], Root> =
  () => (tree) => {
    visit(tree, "element", (node) => {
      // Ignore non-heading elements
      const headingElements = ["h1", "h2", "h3", "h4", "h5", "h6"]
      if (!headingElements.includes(node.tagName as string)) return
      const concatenated: string = node.children.reduce(
        (acc: string, child: ElementContent) =>
          ("value" in child ? acc + child.value : acc) as string,
        ""
      )
      node.properties.id = parseHeadingId(concatenated)
      const lastIndex = node.children.length - 1
      const lastChild = node.children[lastIndex] as ElementContent
      if ("value" in lastChild) {
        const lastChildValue: string = lastChild.value as string
        node.children[lastIndex] = {
          type: "text",
          value: trimmedTitle(lastChildValue),
        }
      }
    })
  }

export default setMarkdownHeadingIds
