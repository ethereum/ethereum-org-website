import { Fragment } from "react"

import type { ToCItem } from "@/lib/types"

import { BaseLink } from "@/components/atoms/Link"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils/cn"

export type ItemsListProps = {
  items: Array<ToCItem>
  depth: number
  maxDepth: number
  activeHash?: string
  className?: string
}

const ItemsListMobile = ({
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
        const { items, title, url } = item
        return (
          <Fragment key={title}>
            <DropdownMenuItem key={index} {...rest} asChild>
              <BaseLink
                className="text-body no-underline focus-visible:outline-0"
                href={url}
              >
                {title}
              </BaseLink>
            </DropdownMenuItem>
            {items && (
              <ItemsListMobile
                className={cn("ps-4", depth > 1 && "ps-8")}
                items={items}
                depth={depth + 1}
                maxDepth={maxDepth}
                activeHash={activeHash}
              />
            )}
          </Fragment>
        )
      })}
    </>
  )
}

ItemsListMobile.displayName = "TocItemsListMobile"

export default ItemsListMobile
