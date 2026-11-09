import { cva, type VariantProps } from "class-variance-authority"

import type { ToCItem } from "@/lib/types"

import ToCLink from "@/components/TableOfContents/TableOfContentsLink"

import ItemsTree from "./ItemsTree"

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
}: ItemsListProps) => (
  <ItemsTree
    items={items}
    depth={depth}
    maxDepth={maxDepth}
    renderItem={({ item, depth: itemDepth, children }) => (
      <li className={itemVariants({ variant })} {...rest}>
        <ToCLink
          variant={variant}
          depth={itemDepth}
          item={item}
          activeHash={activeHash}
        />
        {children && <ul className={listVariants({ variant })}>{children}</ul>}
      </li>
    )}
  />
)

ItemsList.displayName = "TocItemsList"

export default ItemsList
