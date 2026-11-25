"use client"

import dynamic from "next/dynamic"

/**
 * The players as their own chunks: they are server-rendered where a diagram
 * is used, and their client code loads only on those pages (the docs layout
 * knows every diagram, so a static import would ship it to every docs page).
 */
export const VaultInterfacePlayer = dynamic(() =>
  import("./interface-player").then((m) => m.VaultInterfacePlayer)
)

export const VaultDepositPlayer = dynamic(() =>
  import("./sync-player").then((m) => m.VaultDepositPlayer)
)

export const AsyncVaultPlayer = dynamic(() =>
  import("./async-player").then((m) => m.AsyncVaultPlayer)
)
