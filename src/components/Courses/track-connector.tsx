import { ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils/cn"

/**
 * Decorative arrow in the grid gap after a hub card, toward the next course in
 * reading order. Goes in a `relative` grid item. Hidden where the next card
 * wraps to a new row (2 columns at md, 3 at xl) so it never points at nothing.
 */
const TrackConnector = ({ index, count }: { index: number; count: number }) => {
  if (index >= count - 1) return null
  return (
    <span
      aria-hidden
      className={cn(
        // Mobile: below the card, pointing down; 32px chip centred on the 24px gap
        "pointer-events-none absolute inset-x-0 top-full mx-auto -mt-1 flex size-8 items-center justify-center rounded-full border border-border bg-background text-(--course-strong) dark:text-(--course-bright)",
        "md:start-full md:end-auto md:top-1/2 md:mx-0 md:-ms-1 md:mt-0 md:-translate-y-1/2",
        index % 2 === 1 ? "md:hidden" : "md:flex",
        index % 3 === 2 ? "xl:hidden" : "xl:flex"
      )}
    >
      <ArrowDown className="size-4 md:-rotate-90 md:rtl:rotate-90" />
    </span>
  )
}

export default TrackConnector
