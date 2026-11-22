"use client"

import dynamic from "next/dynamic"

/** Its own chunk, so the player's JS loads only on pages that render it. */
export const GasperFinalityPlayer = dynamic(() =>
  import("./player").then((m) => m.GasperFinalityPlayer)
)
