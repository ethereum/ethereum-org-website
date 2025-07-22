import type { ToCItem } from "@/lib/types"

import { ItemsListProps } from "@/components/TableOfContents/ItemsList"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { trimmedTitle } from "@/lib/utils/toc"

export type TableOfContentsLinkProps = {
  item: ToCItem
}

const TableOfContentsLink = ({
  item: { title, url },
}: TableOfContentsLinkProps) => {
  let isActive = false
  if (typeof window !== `undefined`) {
    isActive = window.location.hash === url
  }

  return (
    <BaseLink
      href={url}
      className={cn(
        "relative !mb-4 inline-block text-xl font-normal text-gray-500 no-underline hover:text-primary hover:no-underline dark:text-gray-400",
        isActive && "text-primary"
      )}
    >
      {trimmedTitle(title)}
    </BaseLink>
  )
}

const ItemsList = ({ items, depth, maxDepth }: ItemsListProps) => {
  // Return early if maxDepth hit, or if no items
  if (depth > maxDepth || !items) return null
  return (
    <>
      {items.map((item, index) => (
        <li key={index} className="m-0">
          <TableOfContentsLink item={item} />
        </li>
      ))}
    </>
  )
}

type UpgradeTableOfContentsProps = {
  items: ToCItem[]
  maxDepth?: number
}

const UpgradeTableOfContents = ({
  items,
  maxDepth = 1,
}: UpgradeTableOfContentsProps) => (
  <nav className="mb-8 hidden overflow-y-auto p-0 lg:block">
    <ul className="m-0 py-0 leading-relaxed">
      <ItemsList items={items} depth={0} maxDepth={maxDepth} />
    </ul>
  </nav>
)

export default UpgradeTableOfContents
