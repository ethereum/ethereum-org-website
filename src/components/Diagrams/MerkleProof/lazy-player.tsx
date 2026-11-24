"use client"

import dynamic from "next/dynamic"

/**
 * The player as its own chunk: it is server-rendered where the diagram is
 * used, and its client code loads only on those pages.
 */
export const MerkleProofPlayer = dynamic(() =>
  import("./player").then((m) => m.MerkleProofPlayer)
)
