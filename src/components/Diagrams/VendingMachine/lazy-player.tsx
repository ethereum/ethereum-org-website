"use client"

import dynamic from "next/dynamic"

/** The player as its own chunk, loaded only on pages that render it. */
export const VendingMachinePlayer = dynamic(() =>
  import("./player").then((m) => m.VendingMachinePlayer)
)
