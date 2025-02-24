import type { ToCItem } from "@/lib/types"

import ToCLink from "@/components/TableOfContents/TableOfContentsLink"

export type ItemsListProps = {
  items: Array<ToCItem>
  depth: number
  maxDepth: number
  activeHash?: string
}

const ItemsList = ({
  items,
  depth,
  maxDepth,
  activeHash,
  ...rest
}: ItemsListProps) => {
  if (depth > maxDepth) return null

  return (
    <>
      {items.map((item, index) => {
        const { title, items } = item
        return (
          <li key={index} className="mb-2 last:mb-0" {...rest}>
            <ToCLink depth={depth} item={item} activeHash={activeHash} />
            {items && (
              <ul key={title} className="m-0 mt-2 list-none gap-2 ps-2 text-sm">
                <ItemsList
                  items={items}
                  depth={depth + 1}
                  maxDepth={maxDepth}
                  activeHash={activeHash}
                />
              </ul>
            )}
          </li>
        )
      })}
    </>
  )
}

ItemsList.displayName = "TocItemsList"

export default ItemsList
