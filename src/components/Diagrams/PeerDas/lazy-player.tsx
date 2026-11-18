"use client"

import dynamic from "next/dynamic"

/**
 * The players as their own chunks: server-rendered where a figure is used,
 * with client code loaded only on those pages.
 */
export const ErasureCodingPlayer = dynamic(() =>
  import("./erasure-player").then((m) => m.ErasureCodingPlayer)
)

export const ColumnSubnetsPlayer = dynamic(() =>
  import("./subnets-player").then((m) => m.ColumnSubnetsPlayer)
)
