"use client"

import {
  ArrowLeftRight,
  CircleHelp,
  EyeOff,
  HandCoins,
  Landmark,
  PenLine,
  Sparkles,
  Timer,
} from "lucide-react"

import SortWidget, { type SortConfig } from "./sort-widget"
import type { WidgetProps } from "./types"

/* Sort-puzzle skins for the "using Ethereum" track; see `sort-skins.tsx` */

const skin = (config: SortConfig) => {
  const Skin = (props: WidgetProps) => <SortWidget {...props} config={config} />
  return Skin
}

/** Trading and lending: who pays each reward, if anyone can say */
export const RewardSortWidget = skin({
  name: "reward-sort",
  buckets: [
    { id: "borrowers", Icon: HandCoins },
    { id: "traders", Icon: ArrowLeftRight },
    { id: "network", Icon: Landmark },
    { id: "unknown", Icon: CircleHelp },
  ],
  items: [
    { id: "lend", bucket: "borrowers" },
    { id: "daily", bucket: "unknown" },
    { id: "pool", bucket: "traders" },
    { id: "stake", bucket: "network" },
    { id: "invite", bucket: "unknown" },
    { id: "demand", bucket: "borrowers" },
  ],
})

/** Scams: the four marks most scams share */
export const RedFlagSortWidget = skin({
  name: "red-flag-sort",
  buckets: [
    { id: "hurry", Icon: Timer },
    { id: "secret", Icon: EyeOff },
    { id: "good", Icon: Sparkles },
    { id: "ask", Icon: PenLine },
  ],
  items: [
    { id: "spots", bucket: "hurry" },
    { id: "tell", bucket: "secret" },
    { id: "sure", bucket: "good" },
    { id: "verify", bucket: "ask" },
    { id: "locked", bucket: "hurry" },
    { id: "free", bucket: "good" },
    { id: "private", bucket: "secret" },
    { id: "activate", bucket: "ask" },
  ],
})
