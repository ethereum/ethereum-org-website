import { cva, type VariantProps } from "class-variance-authority"

import type { ToCItem } from "@/lib/types"

import ToCLink from "@/components/TableOfContents/TableOfContentsLink"

const variants = cva("mb-2 last:mb-0", {
  variants: {
    variant: {
      default: "",
      beginner:
        "[&:has([data-state-active='true'])]:text-primary hover:text-primary-hover list-item",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type ItemsListProps = {
  items: Array<ToCItem>
  depth: number
  maxDepth: number
  activeHash?: string
} & VariantProps<typeof variants>

const ItemsList = ({
  items,
  depth,
  maxDepth,
  activeHash,
  variant,
  ...rest
}: ItemsListProps) => {
  if (depth > maxDepth) return null

  return (
    <>
      {items.map((item, index) => {
        const { title, items } = item
        return (
          <li key={index} className={variants({ variant })} {...rest}>
            <ToCLink
              variant={variant}
              depth={depth}
              item={item}
              activeHash={activeHash}
            />
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
