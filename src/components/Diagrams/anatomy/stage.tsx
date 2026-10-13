import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

/**
 * One container for an interactive diagram: the illustration and its
 * controls panel. When the card is at least 860px wide the panel (18.5rem)
 * sits on the inline-end side, vertically centred (the grid mirrors in RTL);
 * narrower, as in the docs column, it stacks directly under the illustration.
 * A container query on the card, not a viewport breakpoint: the docs column
 * is only ~450-800px wide.
 */
export function DiagramStage({
  illustration,
  panel,
  className,
}: {
  illustration: ReactNode
  panel: ReactNode
  className?: string
}) {
  return (
    <Card
      variant="nested"
      border
      size="md"
      data-diagram-stage=""
      className={cn("@container", className)}
    >
      <div className="grid gap-2 p-(--card-pad) @[860px]:grid-cols-[minmax(0,1fr)_18.5rem] @[860px]:items-center @[860px]:gap-6">
        <div className="flex min-w-0 justify-center">{illustration}</div>
        <div className="flex min-w-0 flex-col gap-4">{panel}</div>
      </div>
    </Card>
  )
}
