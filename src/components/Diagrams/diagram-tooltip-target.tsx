"use client"

import type { ReactNode } from "react"

import Tooltip from "@/components/Tooltip"

interface DiagramTooltipTargetProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  definition: ReactNode
  as?: "div" | "span"
  children: ReactNode
}

/**
 * Focusable Tooltip trigger for diagram nodes and badges. The trigger element
 * is created here, on the client: Radix `asChild` cannot clone an element
 * passed in from a Server Component (React serializes it as a lazy
 * reference, and the trigger silently renders nothing after hydration).
 */
export function DiagramTooltipTarget({
  definition,
  as: Tag = "div",
  children,
  ...props
}: DiagramTooltipTargetProps) {
  return (
    <Tooltip content={definition} asChild renderChildrenOnServer>
      <Tag tabIndex={0} {...props}>
        {children}
      </Tag>
    </Tooltip>
  )
}
