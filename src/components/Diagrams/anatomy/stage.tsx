import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

/**
 * One container for an interactive diagram: the illustration and its
 * controls panel. When the card is at least 640px wide the panel (15rem)
 * sits on the inline-end side, vertically centred, and the illustration takes
 * the rest (the grid mirrors in RTL); narrower, it stacks directly under the
 * illustration. A container query on the card, not a viewport breakpoint: the
 * docs column is only ~450-800px wide. Use it through `InteractiveDiagram`.
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
      className={cn("@container", className)}
    >
      <div
        data-diagram-grid=""
        className="grid gap-3 p-(--card-pad) @[640px]:grid-cols-[minmax(0,1fr)_15rem] @[640px]:items-center @[640px]:gap-6"
      >
        <div className="flex min-w-0 justify-center">{illustration}</div>
        <div data-diagram-panel="" className="flex min-w-0 flex-col gap-4">
          {panel}
        </div>
      </div>
    </Card>
  )
}
