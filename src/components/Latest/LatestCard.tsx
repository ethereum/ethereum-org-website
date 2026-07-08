import type { ReactNode } from "react"

import CardImage from "@/components/Image/CardImage"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  type CardProps,
  CardTitle,
} from "@/components/ui/card"
import { Tag } from "@/components/ui/tag"

type LatestCardProps = {
  href: string
  title: string
  /** Banner image; falls back to a generic thumbnail when missing or broken. */
  image?: string
  /** Italic byline — author for builder posts, source name for RSS/highlights. */
  byline?: string
  description?: string
  /** Display-only category/topic pills. */
  tags?: string[]
  /** Rendered footer line (e.g. date · read time), typically a TagsInlineText. */
  meta?: ReactNode
  customEventOptions?: CardProps["customEventOptions"]
}

/**
 * The shared card for /latest and the homepage "Latest updates" widget — used
 * for editorial highlights, the article grid, and the homepage preview. The
 * whole card is the link (internal or external, via `BaseLink`), so on-card
 * tags are display-only; filtering lives in the chip row.
 */
const LatestCard = ({
  href,
  title,
  image,
  byline,
  description,
  tags,
  meta,
  customEventOptions,
}: LatestCardProps) => (
  <Card
    href={href}
    variant="ghost"
    size="md"
    customEventOptions={customEventOptions}
  >
    <CardBanner className="aspect-video h-auto">
      <CardImage src={image} />
    </CardBanner>
    <CardContent>
      <CardTitle>{title}</CardTitle>

      {byline && (
        <CardParagraph variant="subtitle" size="sm">
          {byline}
        </CardParagraph>
      )}

      {description && (
        <CardParagraph size="sm" className="line-clamp-3">
          {description}
        </CardParagraph>
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} variant="subtle" status="tag">
              {tag}
            </Tag>
          ))}
        </div>
      )}

      {meta}
    </CardContent>
  </Card>
)

export default LatestCard
