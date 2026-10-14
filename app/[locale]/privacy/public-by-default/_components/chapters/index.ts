import type { ComponentType } from "react"

import type { PrivacyLessonChapterId } from "@/lib/types"

import ChapterSend from "./ch00-send"
import ChapterWallet from "./ch01-wallet"
import ChapterRpc from "./ch02-rpc"
import ChapterNetwork from "./ch03-network"
import ChapterChain from "./ch04-chain"
import ChapterAnalysts from "./ch05-analysts"
import ChapterWorld from "./ch06-world"
import ChapterFixes from "./ch07-fixes"
import ChapterToday from "./ch08-today"
import ChapterDefault from "./ch09-default"
import type { ChapterProps } from "./types"

export const chapterBodies: Record<
  PrivacyLessonChapterId,
  ComponentType<ChapterProps>
> = {
  send: ChapterSend,
  wallet: ChapterWallet,
  rpc: ChapterRpc,
  network: ChapterNetwork,
  chain: ChapterChain,
  analysts: ChapterAnalysts,
  world: ChapterWorld,
  fixes: ChapterFixes,
  today: ChapterToday,
  default: ChapterDefault,
}
