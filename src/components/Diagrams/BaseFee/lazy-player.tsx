"use client"

import dynamic from "next/dynamic"

/** The player as its own chunk: server-rendered, client code loaded only where used. */
export const BaseFeePlayer = dynamic(() =>
  import("./player").then((m) => m.BaseFeePlayer)
)
