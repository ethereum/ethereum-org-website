import type {
  BlockContent,
  DefinitionContent,
  List,
  ListItem,
  Nodes,
} from "mdast"
import { toc } from "mdast-util-toc"
import { visit } from "unist-util-visit"

import type { ToCNodeEntry, TocNodeType } from "@/lib/types"

type Options = { maxDepth?: 1 | 2 | 3 | 4 | 5 | 6 }

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

      // Strip trailing `{#custom-id}` if remarkHeadingId hasn't already.
      // (Happens when this runs outside the MDX remark pipeline -- e.g.,
      // directly against VeliteFile.mdast.)
      if (typedCurrent.title) {
        typedCurrent.title = typedCurrent.title
          .replace(/\s*\{#[\w-]+\}\s*$/, "")
          .trim()
      }

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
      return {}
    }

    default:
      return {}
  }
}

/**
 * Computes the table of contents from headings and writes it to `vfile.data.toc`.
 * Velite-style: read from `data.toc` after compilation.
 */
/**
 * Compute a structured TOC from a parsed mdast tree.
 * Called from the Velite schema transform against `VeliteFile.mdast` -- the
 * MDX pipeline can't be used because @mdx-js/mdx runs plugins on an internal
 * vfile whose `data` doesn't survive to the schema layer.
 */
export const computeToc = (
  tree: Nodes,
  { maxDepth = 6 }: Options = {}
): TocNodeType => {
  const generated = toc(tree, { maxDepth })
  if (!generated.map) return {}
  return processToC(generated.map, {})
}
