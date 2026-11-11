import { type ReactNode, useId } from "react"

import { cn } from "@/lib/utils/cn"

export interface DiagramFigureProps {
  /** Anchor id, `fig-N`. */
  id?: string
  /** Visible caption, centred under the drawing. */
  caption?: ReactNode
  /** Full text alternative describing the whole diagram; screen-reader only. */
  description: ReactNode
  className?: string
  children: ReactNode
}

// Without JS the controls can't run, so hide the panel and show the full
// description instead. Unlayered, so it beats the Tailwind utilities.
const NO_JS_STYLE = `[data-diagram-panel]{display:none}[data-diagram-grid]{grid-template-columns:minmax(0,1fr)}[data-diagram-description]{position:static;width:auto;height:auto;margin:0;overflow:visible;clip-path:none;white-space:normal;font-size:var(--text-sm);color:var(--color-body-medium)}`

/**
 * `<figure>` shell for every diagram: the drawing, a screen-reader text
 * alternative wired with `aria-describedby`, and a visible `<figcaption>`.
 * Without JS the description is shown and the controls panel hidden.
 */
export function DiagramFigure({
  id,
  caption,
  description,
  className,
  children,
}: DiagramFigureProps) {
  const descriptionId = useId()
  return (
    <figure
      id={id}
      aria-describedby={descriptionId}
      className={cn("my-space-2x flex min-w-0 flex-col gap-3", className)}
    >
      <noscript>
        <style>{NO_JS_STYLE}</style>
      </noscript>
      {children}
      <p id={descriptionId} data-diagram-description="" className="sr-only">
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
