import type { Heading, Root } from "mdast"
import { mdastHeadingId } from "mdast-heading-id"
import type { MdIdString } from "mdast-heading-id/tree-extension"
import { micromarkHeadingId } from "micromark-heading-id"
import type { Plugin } from "unified"
import { visit } from "unist-util-visit"

import { slugify } from "@/lib/utils/toc"

/**
 * Parses DOM elements to find all headings, setting an `id` attribute on each one.
 * If a heading has an ID string {#id}, it will be used as the ID. Otherwise,
 * the heading text will be slugified.
 * @returns Plugin<[{}], Root>, a rehype plugin that can be used in [...dynamic-md-pages].tsx
 */
const remarkHeadingIds: Plugin<[], Root, Root> = function () {
  const data = this.data()

  function add(key: string, value: unknown) {
    const list = (data[key] as unknown[]) || (data[key] = [])
    list.push(value)
  }

  // Add support for the {#id} syntax
  add("micromarkExtensions", micromarkHeadingId())
  add("fromMarkdownExtensions", mdastHeadingId())

  return (tree) => {
    visit(tree, "heading", (node: Heading) => {
      if (!node.data) node.data = {}
      if (!node.data.hProperties) node.data.hProperties = {}

      const ids = node.children.filter(
        (child) => child.type === "idString"
      ) as MdIdString[]
      const [idNode] = ids

      if (idNode) {
        node.data.id = (node.data.hProperties as { id: string | null }).id =
          idNode.value

        idNode.value = ""
      } else {
        const concatenated = node.children.reduce(
          (acc: string, child) => ("value" in child ? acc + child.value : acc),
          ""
        )
        node.data.id = (node.data.hProperties as { id: string | null }).id =
          slugify(concatenated)
      }
    })
  }
}

export default remarkHeadingIds
