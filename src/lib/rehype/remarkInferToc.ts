import type { Plugin } from "unified"
import type { BlockContent, DefinitionContent, ListItem } from "mdast"
import { toc, type Options } from "mdast-util-toc"
import type { Nodes } from "mdast-util-toc/lib"
import { visit } from "unist-util-visit"

interface ITocNodeEntry {
  url?: string
  title?: string
}

export type TocNodeType =
  | ITocNodeEntry
  | {
      items: Array<TocNodeType>
    }

interface IRemarkTocOptions {
  maxDepth?: Options["maxDepth"]
  callback: (toc: TocNodeType) => void
}

const remarkInferToc: Plugin<[IRemarkTocOptions]> = (options) => {
  const { callback, maxDepth }: IRemarkTocOptions = {
    maxDepth: 6,
    ...options,
  }

  const processToC = (
    node: BlockContent | DefinitionContent | ListItem | null,
    current: TocNodeType
  ): TocNodeType => {
    if (!node) {
      return {}
    }

    switch (node.type) {
      case `paragraph`: {
        const typedCurrent = current as ITocNodeEntry

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
    }

    return {}
  }

  return (tree) => {
    const generatedToC = toc(tree as Nodes, { maxDepth })

    if (generatedToC.map) {
      const processedToC = processToC(generatedToC.map, {})
      callback(processedToC)
    }
  }
}

export default remarkInferToc
