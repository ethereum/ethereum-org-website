"use client"

import dynamic from "next/dynamic"

/** The player as its own chunk: client code loads only where it is used. */
export const ZkProofGamePlayer = dynamic(() =>
  import("./player").then((m) => m.ZkProofGamePlayer)
)
