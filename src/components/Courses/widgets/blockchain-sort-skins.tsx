"use client"

import { Bitcoin, Diamond, EyeOff, Link2, NotebookPen } from "lucide-react"

import SortWidget, { type SortConfig } from "./sort-widget"
import type { WidgetProps } from "./types"

const skin = (config: SortConfig) => {
  const Skin = (props: WidgetProps) => <SortWidget {...props} config={config} />
  return Skin
}

/** Blockchains: same big ideas, different rules */
export const ChainSortWidget = skin({
  name: "chain-sort",
  buckets: [
    { id: "bitcoin", Icon: Bitcoin },
    { id: "ethereum", Icon: Diamond },
    { id: "both", Icon: Link2 },
  ],
  items: [
    { id: "copies", bucket: "both" },
    { id: "first", bucket: "bitcoin" },
    { id: "stake", bucket: "ethereum" },
    { id: "links", bucket: "both" },
    { id: "puzzle", bucket: "bitcoin" },
    { id: "programs", bucket: "ethereum" },
  ],
})

/** Ethereum: what fits on a public notebook, and what doesn't */
export const TrackSortWidget = skin({
  name: "track-sort",
  buckets: [
    { id: "fit", Icon: NotebookPen },
    { id: "off", Icon: EyeOff },
  ],
  items: [
    { id: "ticket", bucket: "fit" },
    { id: "password", bucket: "off" },
    { id: "art", bucket: "fit" },
    { id: "vote", bucket: "fit" },
    { id: "diary", bucket: "off" },
    { id: "sword", bucket: "fit" },
  ],
})
