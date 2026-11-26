"use client"

import { FileCode, KeyRound } from "lucide-react"

import SortWidget, { type SortConfig } from "./sort-widget"
import type { WidgetProps } from "./types"

/** Smart accounts: what only a key can decide, and what code can enforce */
const CONFIG: SortConfig = {
  name: "account-sort",
  buckets: [
    { id: "regular", Icon: KeyRound },
    { id: "smart", Icon: FileCode },
  ],
  items: [
    { id: "thief", bucket: "regular" },
    { id: "wait", bucket: "smart" },
    { id: "free", bucket: "regular" },
    { id: "friends", bucket: "smart" },
    { id: "gone", bucket: "regular" },
    { id: "batch", bucket: "smart" },
  ],
}

const AccountSortWidget = (props: WidgetProps) => (
  <SortWidget {...props} config={CONFIG} />
)

export default AccountSortWidget
