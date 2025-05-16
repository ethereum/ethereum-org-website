import type { ImageProps } from "next/image"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"
import { List, ListItem } from "@/components/ui/list"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

type Content = {
  title: string
  description: string
  contentItems?: React.ReactNode[]
  link?: string
  image?: ImageProps["src"]
  alt: string
  id?: string
  tag?: string
  colorVar?: string
}

export type ProductListProps = {
  content: Content[]
  category?: string
  actionLabel: string
}

const ProductList = ({ actionLabel, content, category }: ProductListProps) => {
  const CATEGORY_NAME = "category-name"

  return (
    <div className="w-full">
      {category && (
        <h3
          id={CATEGORY_NAME}
          className="mb-0 mt-10 border-b-2 border-border pb-4 text-2xl"
        >
          {category}
        </h3>
      )}
      <List aria-labelledby={CATEGORY_NAME} className="m-0 mb-4">
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
              tag,
              colorVar,
            },
            idx
          ) => (
            <ListItem
              key={id || idx}
              color="text"
              className={cn(
                "mb-0 mt-8 flex pb-4",
                idx !== content.length - 1 && "border-b"
              )}
            >
              <div className="w-20">
                {image && (
                  <Image
                    src={image}
                    alt={alt}
                    width={66}
                    className="rounded-xl shadow-lg dark:shadow-body-light"
                  />
                )}
              </div>
              <Flex className="ms-4 w-full flex-col justify-between pb-4 sm:flex-row">
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold">{title}</div>
                    {tag && (
                      <Tag
                        status="tag"
                        size="small"
                        className={cn("ms-2", colorVar)}
                      >
                        {tag}
                      </Tag>
                    )}
                  </div>
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
                    className="ms-0 mt-4 min-h-fit gap-0 self-center rounded-sm px-6 py-1 sm:ms-8 sm:mt-0"
                  >
                    {actionLabel}
                    <VisuallyHidden>to {title} website</VisuallyHidden>
                  </ButtonLink>
                )}
              </Flex>
            </ListItem>
          )
        )}
      </List>
    </div>
  )
}

export default ProductList
