import { ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils/cn"

// Decorative scroll affordance pinned to an edge of the menu. The solid
// background matches the menu surface so the chevron never overlaps list text;
// it fades in/out via opacity in step with its `hidden` flag.
export const ScrollChevron = ({
  edge,
  hidden,
}: {
  edge: "top" | "bottom"
  hidden: boolean
}) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute inset-x-0 flex h-6 items-center justify-center bg-background text-body-medium transition-opacity",
      edge === "top" ? "top-0" : "bottom-0",
      hidden && "opacity-0"
    )}
  >
    <ChevronUp className={cn("size-4", edge === "bottom" && "-scale-y-100")} />
  </div>
)
