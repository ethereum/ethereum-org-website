"use client"

import { Landmark, Wifi, WifiOff } from "lucide-react"

import SortWidget, { type SortConfig } from "./sort-widget"
import type { WidgetProps } from "./types"

const CUSTODY: SortConfig = {
  name: "custody",
  buckets: [
    { id: "custodial", Icon: Landmark },
    { id: "hot", Icon: Wifi },
    { id: "cold", Icon: WifiOff },
  ],
  items: [
    { id: "drawer", bucket: "cold" },
    { id: "exchange", bucket: "custodial" },
    { id: "phone", bucket: "hot" },
    { id: "cable", bucket: "cold" },
    { id: "friend", bucket: "custodial" },
    { id: "browser", bucket: "hot" },
  ],
}

/** Who holds the keys, and are they online or offline */
const CustodySortWidget = (props: WidgetProps) => (
  <SortWidget {...props} config={CUSTODY} />
)

export default CustodySortWidget
