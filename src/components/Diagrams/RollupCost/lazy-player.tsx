"use client"

import dynamic from "next/dynamic"

/** The player as its own chunk: server-rendered, client code only where used. */
export const RollupCostPlayer = dynamic(() =>
  import("./player").then((m) => m.RollupCostPlayer)
)
