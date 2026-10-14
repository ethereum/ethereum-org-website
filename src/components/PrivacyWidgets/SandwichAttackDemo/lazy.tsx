"use client"

import dynamic from "next/dynamic"

import SandwichAttackLoading from "./loading"

/** Client-only: the demo is interactive and animates with timers */
export default dynamic(() => import("./sandwich-attack-client"), {
  ssr: false,
  loading: SandwichAttackLoading,
})
