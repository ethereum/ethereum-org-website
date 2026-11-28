import { Info } from "lucide-react"
import type { ReactNode } from "react"

import { CheckCircle } from "@/components/icons/CheckCircle"
import { XCircle } from "@/components/icons/XCircle"
import Tooltip from "@/components/Tooltip"

import { cn } from "@/lib/utils/cn"

/**
 * One label/value row of a catalog listing's spec list. Stack these in a
 * `flex flex-col gap-2` so the rows read as a single table.
 */
const DetailRow = ({
  label,
  tooltip,
  roomyLabel,
  alignTop,
  children,
}: {
  label: string
  tooltip?: string
  /**
   * Floors the label column. Both sides of the row shrink to min-content by
   * default, so a long label next to a long value collapses to one word per
   * line. Only set this where both are long -- it costs the value width, which
   * wraps shorter values that would otherwise fit on one line.
   */
  roomyLabel?: boolean
  /** Aligns the label with the first line of a multi-line value. */
  alignTop?: boolean
  children: ReactNode
}) => (
  <div
    className={cn(
      "flex justify-between gap-4 rounded-lg bg-background-highlight px-4 py-3",
      alignTop ? "items-start" : "items-center"
    )}
  >
    <div
      className={cn(
        "flex items-center gap-1.5 text-sm text-body-medium",
        roomyLabel && "min-w-[35%]"
      )}
    >
      <span>{label}</span>
      {tooltip && (
        <Tooltip nested content={<p className="text-body">{tooltip}</p>}>
          <Info className="size-4 shrink-0" />
        </Tooltip>
      )}
    </div>
    <div className="min-w-0 text-end text-sm">{children}</div>
  </div>
)

export const SupportedValue = ({
  supported,
  label,
}: {
  supported: boolean
  label: string
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 font-bold",
      supported ? "text-success" : "text-error"
    )}
  >
    {supported ? (
      <CheckCircle className="my-0 shrink-0" />
    ) : (
      <XCircle className="my-0 shrink-0" />
    )}
    {label}
  </span>
)

export default DetailRow
