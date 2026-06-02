import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"

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
 * leading banner (centered top banner on mobile, left-edge bleed at `sm`+),
 * a bold title with an optional status badge, a description, and a trailing
 * chevron that animates on hover. Built on the design-system `Card`.
 */
const PathwayCard = ({
  href,
  title,
  description,
  badge,
  banner,
  className,
}: PathwayCardProps) => (
  <Card
    href={href}
    variant="nested"
    className={cn("border sm:flex-row", className)}
  >
    {banner && (
      <CardBanner
        background="none"
        fit="contain"
        size="full"
        zoom={false}
        className="flex h-32 w-full shrink-0 items-center justify-center sm:h-36 sm:w-40 sm:self-center"
      >
        {banner}
      </CardBanner>
    )}
    <CardContent spacing="none" className="flex items-center gap-4">
      <div className="flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <CardTitle variant="bold">{title}</CardTitle>
          {badge && (
            <Tag status={badge.status ?? "success"} size="small">
              {badge.label}
            </Tag>
          )}
        </div>
        <CardParagraph>{description}</CardParagraph>
      </div>
      <ChevronRight
        className={cn(
          "size-6 shrink-0 text-body-medium rtl:-scale-x-100",
          "transition-transform duration-100 group-hover/link:translate-x-1 group-hover/link:text-primary"
        )}
      />
    </CardContent>
  </Card>
)

export default PathwayCard
