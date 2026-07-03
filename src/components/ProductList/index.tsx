import { useId } from "react"
import type { ImageProps } from "next/image"

import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"
import { Grid } from "@/components/ui/grid"

import { cn } from "@/lib/utils/cn"

type ProductListContentBase = {
  title: string
  description: React.ReactNode | React.ReactNode[]
  href: string
  image?: ImageProps["src"]
  alt?: string
  id?: string
  className?: string
}

export type ProductListContent = ProductListContentBase & {
  /** Per-item CTA label; items without one fall back to `actionLabel` */
  ctaLabel?: string
}

// `actionLabel` (the shared CTA fallback) may be omitted only when every
// content item supplies its own `ctaLabel`.
export type ProductListProps = {
  category?: string
  columns?: 2
  as?: "h2" | "h4"
} & (
  | {
      content: (ProductListContentBase & { ctaLabel: string })[]
      actionLabel?: string
    }
  | {
      content: ProductListContent[]
      actionLabel: string
    }
)

const ProductList = ({
  actionLabel,
  content,
  category,
  columns,
  as,
}: ProductListProps) => {
  const headingId = useId()

  // Widen the union: TS can't call .map on a union of array types
  const items: ProductListContent[] = content
  const Heading = as || "h3"
  return (
    <div className={cn("mb-4 w-full", !category && "overflow-hidden")}>
      {category && (
        <Heading
          id={headingId}
          className="mt-10 mb-0 border-b-2 border-border pb-4 text-2xl"
        >
          {category}
        </Heading>
      )}
      {/* Fold-independent dividers: every item draws a border-t; the 1px
          pull-up hides the top row's line under the heading's border (same
          token), or overflow-hidden crops it when there's no heading.
          Pattern notes: design-system skill. */}
      <Grid
        asChild
        columns={columns || 1}
        className="m-0 -mt-px list-none gap-x-8 gap-y-0 [--grid-gap:--spacing(8)]"
        size="wider"
      >
        <ul role="list" aria-labelledby={category ? headingId : undefined}>
          {items.map(
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
                    "m-0 flex border-t border-border p-page",
                    className
                  )}
                >
                  {image && (
                    <Image
                      src={image}
                      alt={alt}
                      width={80}
                      height={80}
                      className="aspect-square h-20 rounded-3xl shadow-lg"
                    />
                  )}
                  <Flex className="ms-4 w-full justify-between gap-space max-sm:flex-col sm:items-center">
                    <div className="flow flex-1 self-start">
                      <p className="text-xl font-bold">{title}</p>
                      {descriptions.map((desc, idx) => (
                        <p key={idx} className="mb-0 text-sm text-body-medium">
                          {desc}
                        </p>
                      ))}
                    </div>
                    <ButtonLink variant="outline" href={href} className="h-fit">
                      {ctaLabel || (
                        <>
                          {actionLabel}
                          <span className="sr-only">to {title} website</span>
                        </>
                      )}
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
