import type { ReactNode } from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { DiagramTitle } from "./diagram-label"

const diagramGroupVariants = tv({
  base: "relative min-w-0 rounded-base border-2 p-4 md:p-6",
  variants: {
    variant: {
      // Groups related nodes (e.g. "Account state"); tinted by `tone`.
      dashed: "border-dashed",
      // Scope boundary (e.g. "World state"); neutral.
      outlined: "border-solid border-border-high-contrast bg-background",
    },
    tone: {
      state: "",
      entity: "",
    },
  },
  compoundVariants: [
    {
      variant: "dashed",
      tone: "state",
      class: "border-diagram-state bg-diagram-group-fill",
    },
    {
      variant: "dashed",
      tone: "entity",
      class: "border-accent-a bg-diagram-entity-fill/40",
    },
  ],
  defaultVariants: { variant: "outlined", tone: "state" },
})

export type DiagramGroupProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "title"
> &
  VariantProps<typeof diagramGroupVariants> & {
    /** Bold mono title in the top-start corner. */
    title?: ReactNode
  }

/** Container that scopes a set of nodes: dashed (tinted group) or outlined (grey boundary). */
export function DiagramGroup({
  variant,
  tone,
  title,
  className,
  children,
  ...props
}: DiagramGroupProps) {
  return (
    <div
      className={diagramGroupVariants({ variant, tone, className })}
      {...props}
    >
      {title && <DiagramTitle className="mb-4">{title}</DiagramTitle>}
      {children}
    </div>
  )
}
