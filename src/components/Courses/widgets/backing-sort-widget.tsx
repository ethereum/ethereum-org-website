"use client"

import { Landmark, LockKeyhole } from "lucide-react"

import SortWidget, { type SortConfig } from "./sort-widget"
import type { WidgetProps } from "./types"

const BACKING: SortConfig = {
  name: "backing-sort",
  buckets: [
    { id: "company", Icon: Landmark },
    { id: "crypto", Icon: LockKeyhole },
  ],
  items: [
    { id: "bank", bucket: "company" },
    { id: "eth", bucket: "crypto" },
    { id: "gold", bucket: "company" },
    { id: "bonds", bucket: "company" },
    { id: "tokens", bucket: "crypto" },
  ],
}

/** Tokens course: sort stablecoins by what stands behind them */
const BackingSortWidget = (props: WidgetProps) => (
  <SortWidget {...props} config={BACKING} />
)

export default BackingSortWidget
