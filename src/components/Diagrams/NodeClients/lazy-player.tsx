"use client"

import dynamic from "next/dynamic"

/**
 * The players as their own chunks: they are server-rendered where a diagram
 * is used, and their client code loads only on those pages (the docs layout
 * knows every diagram, so a static import would ship it to every docs page).
 */
export const NodeClientsPlayer = dynamic(() =>
  import("./player").then((m) => m.NodeClientsPlayer)
)

export const NodeArchitecturePlayer = dynamic(() =>
  import("./architecture-player").then((m) => m.NodeArchitecturePlayer)
)
