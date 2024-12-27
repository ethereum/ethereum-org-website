import type { ImageProps } from "next/image"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { ButtonLink } from "./ui/buttons/Button"
import { Flex } from "./ui/flex"
import { List, ListItem } from "./ui/list"
import { TwImage } from "./Image"

type Content = {
  title: string
  description: string
  link?: string
  image?: ImageProps["src"]
  alt: string
  id?: string
}

export type ProductListProps = {
  content: Content[]
  category: string
  actionLabel: string
}

const ProductList = ({ actionLabel, content, category }: ProductListProps) => {
  const CATEGORY_NAME = "category-name"

  return (
    <div className="w-full">
      <h3
        id={CATEGORY_NAME}
        className="mb-0 mt-10 border-b-2 border-border pb-4 text-2xl"
      >
        {category}
      </h3>
      <List aria-labelledby={CATEGORY_NAME} className="m-0">
        {content.map(({ title, description, link, image, alt, id }, idx) => (
          <ListItem key={id || idx} color="text" className="mb-0 mt-8 flex">
            <div className="w-20">
              {image && (
                <TwImage
                  src={image}
                  alt={alt}
                  width={66}
                  className="rounded-sm shadow-lg dark:shadow-body-light"
                />
              )}
            </div>
            <Flex className="ms-4 w-full flex-col justify-between border-b pb-4 sm:ms-6 sm:flex-row">
              <div className="flex-1">
                <div>{title}</div>
                <div className="mb-0 text-sm opacity-60">{description}</div>
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
        ))}
      </List>
    </div>
  )
}

export default ProductList
