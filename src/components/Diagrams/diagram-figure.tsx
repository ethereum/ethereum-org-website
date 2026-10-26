import { type ReactNode, useId } from "react"

import { cn } from "@/lib/utils/cn"

export interface DiagramFigureProps {
  /** Visible caption, centred under the drawing. */
  caption?: ReactNode
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
  description,
  className,
  children,
}: DiagramFigureProps) {
  const descriptionId = useId()
  return (
    <figure
      aria-describedby={descriptionId}
      className={cn("my-space-2x flex min-w-0 flex-col gap-3", className)}
    >
      {children}
      <p id={descriptionId} className="sr-only">
        {description}
      </p>
      {caption && (
        <figcaption className="text-center text-sm text-body-medium">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
