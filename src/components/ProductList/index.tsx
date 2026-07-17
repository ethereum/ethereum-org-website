import type { ImageProps } from "next/image"

import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"
import { List, ListItem } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"

type Content = {
  title: string
  description: string
  contentItems?: React.ReactNode[]
  link?: string
  image?: ImageProps["src"]
  alt?: string
  id?: string
  className?: string
}

export type ProductListProps = {
  content: Content[]
  category?: string
  actionLabel: string
  /** Columns rendered from `md` up. Defaults to a single column. */
  columns?: 1 | 2
}

const ProductList = ({
  actionLabel,
  content,
  category,
  columns = 1,
}: ProductListProps) => {
  const CATEGORY_NAME = "category-name"

  // In a two-column grid the bottom row shouldn't draw a divider on `md+` (one
  // item when the count is odd, two when it's even). On mobile the list is
  // always a single column, so only the very last item drops its divider.
  const lastRowSize = content.length % 2 === 0 ? 2 : 1

  return (
    <div className="w-full">
      {category && (
        <h3
          id={CATEGORY_NAME}
          className="mt-10 mb-0 border-b-2 border-border pb-4 text-2xl"
        >
          {category}
        </h3>
      )}
      <List
        aria-labelledby={CATEGORY_NAME}
        className={cn(
          "m-0 mb-4",
          columns === 2 && "grid grid-cols-1 gap-x-16 md:grid-cols-2"
        )}
      >
        {content.map(
          (
            {
              title,
              description,
              link,
              image,
              alt,
              id,
              contentItems,
              className,
            },
            idx
          ) => {
            const isLast = idx === content.length - 1
            const inLastGridRow =
              columns === 2 && idx >= content.length - lastRowSize

            return (
              <ListItem
                key={id || idx}
                color="text"
                className={cn(
                  "mt-8 mb-0 flex pb-4",
                  !isLast && "border-b",
                  inLastGridRow && "md:border-b-0",
                  className
                )}
              >
                <div className="w-20">
                  {image && (
                    <Image
                      src={image}
                      alt={alt || ""}
                      width={66}
                      height={66}
                      className="rounded-xl shadow-lg dark:shadow-body-light"
                    />
                  )}
                </div>
                <Flex className="ms-4 w-full flex-col justify-between pb-4 sm:flex-row">
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="text-xl font-bold">{title}</div>
                    <div className="mb-0 text-sm opacity-60">{description}</div>
                    {contentItems && (
                      <div className="mb-0 flex flex-col gap-2 text-sm">
                        {contentItems}
                      </div>
                    )}
                  </div>
                  {link && (
                    <ButtonLink
                      variant="outline"
                      href={link}
                      className="ms-0 mt-4 min-h-fit gap-0 self-start rounded-xs px-6 py-1 sm:ms-8 sm:mt-0 sm:self-center"
                    >
                      {actionLabel}
                      <span className="sr-only">to {title} website</span>
                    </ButtonLink>
                  )}
                </Flex>
              </ListItem>
            )
          }
        )}
      </List>
    </div>
  )
}

export default ProductList
