import type { ImageProps } from "next/image"

import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"
import { Grid } from "@/components/ui/grid"

import { cn } from "@/lib/utils/cn"

export type ProductListContent = {
  title: string
  description: React.ReactNode | React.ReactNode[]
  href: string
  /** Complete, self-descriptive CTA label, e.g. "Visit EigenLayer" */
  ctaLabel: string
  image?: ImageProps["src"]
  alt?: string
  id?: string
  className?: string
}

export type ProductListProps = {
  content: ProductListContent[]
  category?: string
  columns?: 2
  parentHeadingLevel?: 1 | 2 | 3
}

const ProductList = ({
  content,
  category,
  columns,
  parentHeadingLevel = 2,
}: ProductListProps) => {
  const CategoryHeading = `h${parentHeadingLevel + 1}` as "h2" | "h3" | "h4"
  const ProductHeading = `h${parentHeadingLevel + (category ? 2 : 1)}` as
    | "h2"
    | "h3"
    | "h4"
    | "h5"

  return (
    <div className={cn("mb-4 w-full", !category && "overflow-hidden")}>
      {category && (
        <CategoryHeading className="mt-space-2x border-b pb-space-half text-h3">
          {category}
        </CategoryHeading>
      )}
      {/* Fold-independent dividers: every item draws a border-t; the 1px
          pull-up hides the top row's line under the heading's border (same
          token), or overflow-hidden crops it when there's no heading.
          Pattern notes: design-system skill. */}
      <Grid
        asChild
        columns={columns || 1}
        className="m-0 -mt-px list-none gap-y-0"
        size="wider"
      >
        <ul role="list">
          {content.map(
            (
              {
                title,
                description,
                href,
                ctaLabel,
                image,
                alt = "",
                id,
                className,
              },
              idx
            ) => {
              const descriptions = Array.isArray(description)
                ? description
                : [description]
              return (
                <li
                  key={id || idx}
                  className={cn(
                    "@container/list m-0 flex gap-4 border-t p-page",
                    className
                  )}
                >
                  {image && (
                    <Image
                      src={image}
                      alt={alt}
                      width={80}
                      height={80}
                      className="aspect-square h-20 rounded-xl shadow-lg"
                    />
                  )}
                  <Flex className="w-full flex-col gap-space">
                    <div className="space-y-space-half">
                      <ProductHeading className="text-h5 font-bold">
                        {title}
                      </ProductHeading>
                      {descriptions.map((desc, idx) => (
                        <p key={idx} className="text-sm text-body-medium">
                          {desc}
                        </p>
                      ))}
                    </div>
                    <ButtonLink
                      variant="outline"
                      href={href}
                      className="mt-auto @md/list:w-fit"
                    >
                      {ctaLabel}
                    </ButtonLink>
                  </Flex>
                </li>
              )
            }
          )}
        </ul>
      </Grid>
    </div>
  )
}

export default ProductList
