import type { ReactNode } from "react"

import { ChevronNext } from "@/components/Chevron"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Tag, type TagProps } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

export type PathwayCardProps = {
  href: string
  title: ReactNode
  description: ReactNode
  badge?: { label: string; status?: TagProps["status"] }
  /**
   * Decorative leading visual: typically a `<Image>`, but any ReactNode is
   * accepted (SVG, icon, emoji). Caller owns alt text. When omitted, the card
   * renders text-only.
   */
  banner?: ReactNode
  className?: string
}

/**
 * Clickable card preset for offering the user a discrete pathway forward:
 * a banner (full-width on top when the card is narrow, left-aligned beside the
 * text once the card is wide enough), a bold title with an optional status
 * badge, a description, and a trailing chevron that animates on hover. Built on
 * the design-system `Card`.
 *
 * The banner/text layout switches on the card's own width via a container query
 * (`@container/pathway`), not the viewport -- so a card in a multi-column grid
 * stacks rather than cramming the row layout into a narrow column.
 */
const PathwayCard = ({
  href,
  title,
  description,
  badge,
  banner,
  className,
}: PathwayCardProps) => (
  <div className="@container/pathway">
    <Card
      href={href}
      variant="nested"
      className={cn("@lg/pathway:flex-row", className)}
      border
      hoverLift
      hoverOutline
    >
      {banner && (
        <CardBanner
          background="none"
          fit="contain"
          size="full"
          zoom={false}
          className="flex h-32 w-full shrink-0 items-center justify-center p-2 pt-4 @lg/pathway:h-36 @lg/pathway:w-40 @lg/pathway:self-center @lg/pathway:p-2"
        >
          {banner}
        </CardBanner>
      )}
      <CardContent spacing="none" className="flex items-center gap-4">
        <div className="flex-1">
          <div className="mb-1 flex flex-wrap-reverse items-center gap-x-3 gap-y-1">
            <CardTitle>{title}</CardTitle>
            {badge && (
              <Tag status={badge.status ?? "tag-green"} size="small">
                {badge.label}
              </Tag>
            )}
          </div>
          <CardParagraph>{description}</CardParagraph>
        </div>
        <ChevronNext
          className={cn(
            "size-6 shrink-0 text-body-medium",
            "transition-transform duration-100 group-hover/link:translate-x-1 group-hover/link:text-primary"
          )}
        />
      </CardContent>
    </Card>
  </div>
)

export default PathwayCard
