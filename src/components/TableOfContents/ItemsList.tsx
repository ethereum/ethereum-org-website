import { cva, type VariantProps } from "class-variance-authority"

import type { ToCItem } from "@/lib/types"

import ToCLink from "@/components/TableOfContents/TableOfContentsLink"

const itemVariants = cva("last:mb-0", {
  variants: {
    variant: {
      docs: "mb-2",
      card: "[&:has([data-state-active='true'])]:text-primary hover:text-primary-hover list-item",
      left: "mb-4 list-none text-xl",
    },
  },
  defaultVariants: {
    variant: "docs",
  },
})

const listVariants = cva("", {
  variants: {
    variant: {
      docs: "m-0 mt-2 list-none gap-2 ps-2 text-sm",
      card: "",
      left: "",
    },
  },
  defaultVariants: {
    variant: "docs",
  },
})

export type ItemsListProps = {
  items: Array<ToCItem>
  depth: number
  maxDepth: number
  activeHash?: string
} & VariantProps<typeof itemVariants>

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
          <li key={index} className={itemVariants({ variant })} {...rest}>
            <ToCLink
              variant={variant}
              depth={depth}
              item={item}
              activeHash={activeHash}
            />
            {items && (
              <ul key={title} className={listVariants({ variant })}>
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
