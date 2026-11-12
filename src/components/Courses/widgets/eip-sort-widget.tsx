"use client"

import { AppWindow, Server } from "lucide-react"

import SortWidget, { type SortConfig } from "./sort-widget"
import type { WidgetProps } from "./types"

/** How Ethereum changes: proposals that need every node, or that apps opt into */
const CONFIG: SortConfig = {
  name: "eip-sort",
  buckets: [
    { id: "core", Icon: Server },
    { id: "erc", Icon: AppWindow },
  ],
  items: [
    { id: "fee", bucket: "core" },
    { id: "token", bucket: "erc" },
    { id: "data", bucket: "core" },
    { id: "message", bucket: "erc" },
    { id: "cost", bucket: "core" },
    { id: "unique", bucket: "erc" },
  ],
}

const EipSortWidget = (props: WidgetProps) => (
  <SortWidget {...props} config={CONFIG} />
)

export default EipSortWidget
