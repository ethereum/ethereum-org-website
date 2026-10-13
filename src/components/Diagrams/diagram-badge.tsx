import type { CSSProperties, ReactNode } from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { DiagramTooltipTarget } from "./diagram-tooltip-target"

const diagramBadgeVariants = tv({
  slots: {
    root: "relative isolate flex size-24 shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-full border-2 p-2 text-center font-mono text-xs text-body [overflow-wrap:anywhere] hyphens-auto md:size-28 md:text-sm",
    icon: "size-6 shrink-0 md:size-7 [&>svg]:size-full",
    label: "italic leading-tight",
    gauge:
      "absolute inset-x-0 bottom-0 -z-10 h-full origin-bottom bg-diagram-state/35 transition-transform duration-700 ease-out motion-reduce:transition-none",
  },
  variants: {
    tone: {
      state: { icon: "text-diagram-state" },
      entity: { icon: "text-accent-a" },
    },
    border: {
      // Something reserved or pending (gas supply, refund).
      dashed: { root: "border-dashed bg-diagram-group-fill" },
      // Something consumed or final (gas burned).
      solid: {},
    },
    interactive: {
      true: {
        root: "cursor-help outline-offset-2 hover:outline-2 hover:outline-primary focus-visible:outline-2 focus-visible:outline-primary",
      },
    },
  },
  compoundVariants: [
    {
      tone: "state",
      class: { root: "border-diagram-state" },
    },
    {
      tone: "entity",
      class: { root: "border-accent-a" },
    },
    {
      tone: "state",
      border: "solid",
      class: { root: "bg-diagram-state-fill" },
    },
    {
      tone: "entity",
      border: "solid",
      class: { root: "bg-diagram-entity-fill" },
    },
  ],
  defaultVariants: { tone: "state", border: "solid" },
})

export type DiagramBadgeProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
> &
  Omit<VariantProps<typeof diagramBadgeVariants>, "interactive"> & {
    label: ReactNode
    /** Decorative icon above the label. */
    icon?: ReactNode
    /** One-line definition. Makes the badge focusable and shows it in a Tooltip. */
    definition?: ReactNode
    /**
     * Fill gauge from the bottom. A number (0-1) sets it directly; `"inherit"`
     * reads `--diagram-level` from an ancestor so a client island can drive it.
     */
    level?: number | "inherit"
    /** Extra classes for the gauge element (e.g. a transition delay). */
    gaugeClassName?: string
  }

/** Round badge with an icon and a short label. */
export function DiagramBadge({
  label,
  icon,
  definition,
  level,
  gaugeClassName,
  tone,
  border,
  className,
  style,
  ...props
}: DiagramBadgeProps) {
  const styles = diagramBadgeVariants({
    tone,
    border,
    interactive: !!definition,
  })
  const levelStyle =
    typeof level === "number"
      ? ({ "--diagram-level": level } as CSSProperties)
      : undefined

  const content = (
    <>
      {level !== undefined && (
        <span
          aria-hidden
          className={styles.gauge({ className: gaugeClassName })}
          style={{ transform: "scaleY(var(--diagram-level, 0))" }}
        />
      )}
      {icon && (
        <span aria-hidden className={styles.icon()}>
          {icon}
        </span>
      )}
      <span className={styles.label()}>{label}</span>
    </>
  )
  const rootProps = {
    className: styles.root({ className }),
    style: { ...levelStyle, ...style },
    ...props,
  }

  return definition ? (
    <DiagramTooltipTarget definition={definition} {...rootProps}>
      {content}
    </DiagramTooltipTarget>
  ) : (
    <div {...rootProps}>{content}</div>
  )
}
