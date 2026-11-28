"use client"

import dynamic from "next/dynamic"

/** The player as its own chunk: client code loads only on pages that use it. */
export const WebErasPlayer = dynamic(() =>
  import("./player").then((m) => m.WebErasPlayer)
)
