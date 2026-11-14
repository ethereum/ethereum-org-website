"use client"

import { Ban, Coins, Gift, Globe, TrendingDown } from "lucide-react"

import SortWidget, { type SortConfig } from "./sort-widget"
import type { WidgetProps } from "./types"

const skin = (config: SortConfig) => {
  const Skin = (props: WidgetProps) => <SortWidget {...props} config={config} />
  return Skin
}

/** ETH up close: is a statement about Ethereum the network, or ETH the money */
export const EtherSortWidget = skin({
  name: "ether-sort",
  buckets: [
    { id: "network", Icon: Globe },
    { id: "money", Icon: Coins },
  ],
  items: [
    { id: "price", bucket: "money" },
    { id: "nodes", bucket: "network" },
    { id: "fees", bucket: "money" },
    { id: "record", bucket: "network" },
    { id: "stake", bucket: "money" },
    { id: "upgrade", bucket: "network" },
  ],
})

/** Proof of stake: what a validator's behaviour earns or costs it */
export const ValidatorSortWidget = skin({
  name: "validator-sort",
  buckets: [
    { id: "reward", Icon: Gift },
    { id: "penalty", Icon: TrendingDown },
    { id: "slashed", Icon: Ban },
  ],
  items: [
    { id: "vote", bucket: "reward" },
    { id: "outage", bucket: "penalty" },
    { id: "double", bucket: "slashed" },
    { id: "propose", bucket: "reward" },
    { id: "contradict", bucket: "slashed" },
    { id: "update", bucket: "penalty" },
  ],
})
