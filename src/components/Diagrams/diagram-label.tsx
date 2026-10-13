import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils/cn"

const diagramPillVariants = tv({
  base: "inline-flex max-w-full items-center justify-center px-2.5 py-0.5 text-center font-mono text-xs [overflow-wrap:anywhere] md:text-sm",
  variants: {
    shape: {
      pill: "rounded-full",
      tab: "rounded-e-full rounded-s-none",
    },
    tone: {
      neutral: "bg-background-low italic text-body",
      revert:
        "border-2 border-diagram-revert bg-background font-bold text-diagram-revert",
    },
  },
  compoundVariants: [
    // Multi-line revert labels read as a box, not a blob.
    { shape: "pill", tone: "revert", class: "rounded-lg" },
  ],
  defaultVariants: { shape: "pill", tone: "neutral" },
})

type DiagramPillProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof diagramPillVariants>

/** Short label sitting on or beside a connector. */
export function DiagramPill({
  shape,
  tone,
  className,
  ...props
}: DiagramPillProps) {
  return (
    <span
      className={cn(diagramPillVariants({ shape, tone }), className)}
      {...props}
    />
  )
}

/**
 * Bold mono section title for a diagram or group. A `<p>`, not a heading,
 * so diagrams never add entries to the page outline or ToC.
 */
export function DiagramTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "font-mono text-sm font-bold text-body-medium md:text-lg",
        className
      )}
      {...props}
    />
  )
}
