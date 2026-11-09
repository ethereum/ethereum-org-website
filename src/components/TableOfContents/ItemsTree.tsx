import { Fragment, type ReactNode } from "react"

import type { ToCItem } from "@/lib/types"

export type ItemsTreeRenderProps = {
  item: ToCItem
  index: number
  depth: number
  /** The rendered nested items for this item, or null when it has none. */
  children: ReactNode
}

export type ItemsTreeProps = {
  items: Array<ToCItem>
  depth: number
  maxDepth: number
  renderItem: (props: ItemsTreeRenderProps) => ReactNode
}

/**
 * Walks a ToC tree up to `maxDepth` and hands each item to `renderItem`,
 * together with its already-rendered children. The desktop and mobile ToC
 * lists share this recursion and only differ in how each item is drawn.
 */
const ItemsTree = ({ items, depth, maxDepth, renderItem }: ItemsTreeProps) => {
  if (depth > maxDepth) return null

  return (
    <>
      {items.map((item, index) => (
        <Fragment key={index}>
          {renderItem({
            item,
            index,
            depth,
            children: item.items ? (
              <ItemsTree
                items={item.items}
                depth={depth + 1}
                maxDepth={maxDepth}
                renderItem={renderItem}
              />
            ) : null,
          })}
        </Fragment>
      ))}
    </>
  )
}

ItemsTree.displayName = "TocItemsTree"

export default ItemsTree
