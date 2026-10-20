import { type ReactNode, useId } from "react"

import { cn } from "@/lib/utils/cn"

export interface DiagramFigureProps {
  /** Visible caption. */
  caption?: ReactNode
  /** Put the caption above the drawing (an intro) instead of under it. */
  captionPlacement?: "top" | "bottom"
  /** Full text alternative describing the whole diagram; screen-reader only. */
  description: ReactNode
  className?: string
  children: ReactNode
}

/**
 * `<figure>` shell for every diagram: the drawing, a screen-reader text
 * alternative wired with `aria-describedby`, and a visible `<figcaption>`.
 */
export function DiagramFigure({
  caption,
  captionPlacement = "bottom",
  description,
  className,
  children,
}: DiagramFigureProps) {
  const descriptionId = useId()
  return (
    <figure
      aria-describedby={descriptionId}
      className={cn("m-0 flex min-w-0 flex-col gap-3", className)}
    >
      {caption && captionPlacement === "top" && (
        <figcaption className="text-body">{caption}</figcaption>
      )}
      {children}
      <p id={descriptionId} className="sr-only">
        {description}
      </p>
      {caption && captionPlacement === "bottom" && (
        <figcaption className="text-sm text-body-medium">{caption}</figcaption>
      )}
    </figure>
  )
}
