"use client"

import {
  CloudUpload,
  EyeOff,
  HandCoins,
  Landmark,
  Link,
  PenLine,
  Send,
  TriangleAlert,
  WifiOff,
} from "lucide-react"

import SortWidget, { type SortConfig } from "./sort-widget"
import type { WidgetProps } from "./types"

const skin = (config: SortConfig) => {
  const Skin = (props: WidgetProps) => <SortWidget {...props} config={config} />
  return Skin
}

/** Everyday: paying hand to hand, or asking a bank to move it */
export const CashSortWidget = skin({
  name: "cash-sort",
  buckets: [
    { id: "hand", Icon: HandCoins },
    { id: "bank", Icon: Landmark },
  ],
  items: [
    { id: "coins", bucket: "hand" },
    { id: "card", bucket: "bank" },
    { id: "birthday", bucket: "hand" },
    { id: "online", bucket: "bank" },
    { id: "lemonade", bucket: "hand" },
    { id: "transfer", bucket: "bank" },
  ],
})

/** Everyday: where to hide the spare copy of a key */
export const SpareKeySortWidget = skin({
  name: "spare-key-sort",
  buckets: [
    { id: "safe", Icon: EyeOff },
    { id: "risky", Icon: TriangleAlert },
  ],
  items: [
    { id: "doormat", bucket: "risky" },
    { id: "drawer", bucket: "safe" },
    { id: "taped", bucket: "risky" },
    { id: "secret", bucket: "safe" },
    { id: "photo", bucket: "risky" },
  ],
})

/** Wallets: recovery phrase backups that stay offline, or could end up online */
export const PhraseSortWidget = skin({
  name: "phrase-sort",
  buckets: [
    { id: "offline", Icon: WifiOff },
    { id: "online", Icon: CloudUpload },
  ],
  items: [
    { id: "photo", bucket: "online" },
    { id: "paper", bucket: "offline" },
    { id: "email", bucket: "online" },
    { id: "metal", bucket: "offline" },
    { id: "chat", bucket: "online" },
    { id: "two", bucket: "offline" },
  ],
})

/** Wallets: what a wallet pop-up asks for: connect, sign or send */
export const PopupSortWidget = skin({
  name: "popup-sort",
  buckets: [
    { id: "connect", Icon: Link },
    { id: "sign", Icon: PenLine },
    { id: "send", Icon: Send },
  ],
  items: [
    { id: "game", bucket: "connect" },
    { id: "pay", bucket: "send" },
    { id: "login", bucket: "sign" },
    { id: "shop", bucket: "connect" },
    { id: "rules", bucket: "sign" },
    { id: "ticket", bucket: "send" },
  ],
})
