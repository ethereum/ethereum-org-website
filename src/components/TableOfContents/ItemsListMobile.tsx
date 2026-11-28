import type { ToCItem } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { DropdownMenuItem } from "../ui/dropdown-menu"
import { BaseLink } from "../ui/Link"

import ItemsTree from "./ItemsTree"

export type ItemsListProps = {
  items: Array<ToCItem>
  depth: number
  maxDepth: number
  className?: string
}

const ItemsListMobile = ({
  items,
  depth,
  maxDepth,
  ...rest
}: ItemsListProps) => (
  <ItemsTree
    items={items}
    depth={depth}
    maxDepth={maxDepth}
    renderItem={({ item, depth: itemDepth, children }) => (
      <>
        <DropdownMenuItem
          // Nested levels indent by depth; the root keeps the caller's class.
          className={
            itemDepth > 0 ? cn("ps-4", itemDepth > 2 && "ps-8") : rest.className
          }
          asChild
        >
          <BaseLink
            className="text-body no-underline focus-visible:outline-0"
            href={item.url}
          >
            {item.title}
          </BaseLink>
        </DropdownMenuItem>
        {children}
      </>
    )}
  />
)

ItemsListMobile.displayName = "TocItemsListMobile"

export default ItemsListMobile
