import type { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import "@/styles/flowchart.css"

/**
 * Draws the nested markdown list it wraps as a top-down flowchart; the list is
 * restructured at compile time by `remarkFlowchart` and styled by
 * `src/styles/flowchart.css`.
 */
const Flowchart = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => <div className={cn("flowchart", className)}>{children}</div>

export default Flowchart
