"use client"

import dynamic from "next/dynamic"

/**
 * The player as its own chunk: server-rendered where the figure is used, with
 * client code loaded only on that page.
 */
export const WalletKeysPlayer = dynamic(() =>
  import("./player").then((m) => m.WalletKeysPlayer)
)
