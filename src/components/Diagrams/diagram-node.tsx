import type { ReactNode } from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { DiagramTooltipTarget } from "./diagram-tooltip-target"

const diagramNodeVariants = tv({
  slots: {
    root: "relative flex min-w-0 items-center justify-center gap-2 border-2 text-center font-mono text-sm text-body [overflow-wrap:anywhere] hyphens-auto md:text-base",
    icon: "shrink-0 [&>svg]:size-full",
    label: "italic",
  },
  variants: {
    tone: {
      entity: {
        root: "border-accent-a bg-diagram-entity-fill",
        icon: "text-accent-a",
      },
      state: {
        root: "border-diagram-state bg-diagram-state-fill",
        icon: "text-diagram-state",
      },
      // Sub-box inside an entity or state node (e.g. "EVM code").
      chip: {
        root: "border-transparent bg-background text-xs md:text-sm",
        icon: "text-accent-a",
      },
    },
    shape: {
      box: { root: "rounded-base px-4 py-3" },
      circle: { root: "aspect-square rounded-full p-4" },
      pill: { root: "rounded-full px-4 py-1.5" },
    },
    layout: {
      stack: { root: "flex-col", icon: "size-6" },
      inline: { root: "flex-row", icon: "size-5" },
    },
    interactive: {
      true: {
        root: "cursor-help outline-offset-2 hover:outline-2 hover:outline-primary focus-visible:outline-2 focus-visible:outline-primary",
      },
    },
  },
  defaultVariants: { tone: "entity", shape: "box", layout: "stack" },
})

export type DiagramNodeProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
> &
  Omit<VariantProps<typeof diagramNodeVariants>, "interactive"> & {
    label: ReactNode
    /** Decorative icon; sized by the node. */
    icon?: ReactNode
    /** One-line definition. Makes the node focusable and shows it in a Tooltip on hover/focus. */
    definition?: ReactNode
    /** Nested content below the label, e.g. a `tone="chip"` node or a badge. */
    children?: ReactNode
  }

const interactiveLabel =
  "cursor-help rounded-sm outline-offset-2 hover:outline-2 hover:outline-primary focus-visible:outline-2 focus-visible:outline-primary"

/**
 * Entity (blue), state (orange) or chip box in a diagram. With `definition`,
 * the node becomes a focusable Tooltip trigger -- or just its label when it
 * has children, so nested nodes and badges keep their own tooltips.
 */
export function DiagramNode({
  label,
  icon,
  definition,
  tone,
  shape,
  layout,
  className,
  children,
  ...props
}: DiagramNodeProps) {
  const hasChildren = !!children
  const styles = diagramNodeVariants({
    tone,
    shape,
    layout,
    interactive: !!definition && !hasChildren,
  })

  const iconElement = icon && (
    <span aria-hidden className={styles.icon()}>
      {icon}
    </span>
  )

  // Leaf node: the whole box is the trigger.
  if (definition && !hasChildren) {
    return (
      <DiagramTooltipTarget
        definition={definition}
        className={styles.root({ className })}
        {...props}
      >
        {iconElement}
        <span className={styles.label()}>{label}</span>
      </DiagramTooltipTarget>
    )
  }

  // Container node: only the label is the trigger.
  return (
    <div className={styles.root({ className })} {...props}>
      {iconElement}
      {definition ? (
        <DiagramTooltipTarget
          as="span"
          definition={definition}
          className={styles.label({ className: interactiveLabel })}
        >
          {label}
        </DiagramTooltipTarget>
      ) : (
        <span className={styles.label()}>{label}</span>
      )}
      {children}
    </div>
  )
}
