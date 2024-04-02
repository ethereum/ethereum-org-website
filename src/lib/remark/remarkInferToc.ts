import cloneDeep from "lodash/cloneDeep"
import type {
  BlockContent,
  DefinitionContent,
  Heading,
  ListItem,
  Parent,
} from "mdast"
import { toc } from "mdast-util-toc"
import type { List, Nodes } from "mdast-util-toc/lib"
import type { Plugin } from "unified"
import { SKIP, visit } from "unist-util-visit"

import type { IRemarkTocOptions, ToCNodeEntry, TocNodeType } from "@/lib/types"

const remarkInferToc: Plugin<[IRemarkTocOptions]> = (options) => {
  const { callback, minDepth, maxDepth }: IRemarkTocOptions = {
    minDepth: 1,
    maxDepth: 6,
    ...options,
  }

  const processToC = (
    node: BlockContent | DefinitionContent | ListItem | List | null,
    current: TocNodeType
  ): TocNodeType => {
    if (!node) {
      return {}
    }

    switch (node.type) {
      case `paragraph`: {
        const typedCurrent = current as ToCNodeEntry

        visit(node, (item) => {
          if (item.type === `link`) {
            typedCurrent.url = item.url
          }
          if (item.type === `text` || item.type === `inlineCode`) {
            if (typedCurrent.title) {
              typedCurrent.title += item.value
            } else {
              typedCurrent.title = item.value
            }
          }
        })

        return current
      }

      case `list`: {
        const typedCurrent = current as { items: Array<TocNodeType> }

        typedCurrent.items = node.children.map((item) => processToC(item, {}))

        return typedCurrent
      }

      case `listItem`: {
        if (node.children.length) {
          const heading = processToC(node.children[0], {})

          if (node.children.length > 1) {
            processToC(node.children[1], heading)
          }

          return heading
        }
      }

      default:
        return {}
    }
  }

  return (tree) => {
    // remove all headings with depth less than minDepth before generating ToC
    // bc `toc()` does not support minDepth
    if (minDepth) {
      // clone tree to avoid mutating the original
      tree = cloneDeep(tree)

      visit(tree, `heading`, (node: Heading, index: number, parent: Parent) => {
        if (node.depth < minDepth) {
          // Remove headings with depth less than minDepth
          // Idea taken from https://unifiedjs.com/learn/recipe/remove-node/
          parent.children.splice(index, 1, ...node.children)
          // Do not traverse `node`, continue at the node *now* at `index`.
          return [SKIP, index]
        }
      })
    }

    const table = toc(tree as Nodes, { maxDepth })

    if (table.map) {
      const processedToC = processToC(table.map, {})
      callback(processedToC)
    }
  }
}

export default remarkInferToc
