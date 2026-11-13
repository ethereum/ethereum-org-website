"use client"

import dynamic from "next/dynamic"

/**
 * The player as its own chunk: it is server-rendered where the diagram is
 * used, and its client code loads only on those pages (the docs layout knows
 * every diagram, so a static import would ship it to every docs page).
 */
export const AccountsPlayer = dynamic(() =>
  import("./player").then((m) => m.AccountsPlayer)
)
