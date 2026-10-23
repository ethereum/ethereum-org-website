import type { ImageProps } from "next/image"

import { Image } from "@/components/Image"
import {
  Card,
  CardBanner,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
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
    <div className="mb-4 w-full space-y-space">
      {category && (
        <CategoryHeading className="mt-space-2x border-b pb-space-half text-h3">
          {category}
        </CategoryHeading>
      )}
      <Grid columns={columns || 1} size="wider">
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
              <Card
                key={id || idx}
                variant="ghost"
                href={href}
                className={cn("@container/card flex-row", className)}
              >
                {image && (
                  <CardContent className="flex-none pe-0">
                    <CardBanner
                      background="none"
                      fit="contain"
                      size="thumbnail"
                    >
                      <Image src={image} alt={alt} width={128} height={128} />
                    </CardBanner>
                  </CardContent>
                )}
                <div className="flex flex-col">
                  <CardContent>
                    <CardTitle asChild>
                      <ProductHeading>{title}</ProductHeading>
                    </CardTitle>
                    {descriptions.map((desc, i) => (
                      <CardParagraph key={i}>{desc}</CardParagraph>
                    ))}
                  </CardContent>
                  {/* Full-width CTA when the card is narrow; fit-content once
                      the card is wide enough (most visible at 1 column). */}
                  <CardFooter className="mt-auto" buttons="inherit">
                    <CardButtonFake
                      variant="outline"
                      className="w-full @md/card:w-fit"
                    >
                      {ctaLabel}
                    </CardButtonFake>
                  </CardFooter>
                </div>
              </Card>
            )
          }
        )}
      </Grid>
    </div>
  )
}

export default ProductList
