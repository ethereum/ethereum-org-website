import type { UpgradeData } from "./types"

export const glamsterdam = {
  name: "Glamsterdam",
  slug: "glamsterdam",
  "consensus-layer": "Gloas",
  "execution-layer": "Amsterdam",
  "meta-eip": 7773,
  phase: "devnet",
  "mainnet-target": { window: "2026", date: null, confirmed: false },
  milestones: [
    {
      name: "Devnet-7",
      window: "July 2026",
      date: "2026-07-14",
      status: "complete",
    },
    {
      // Named devnet, not a public testnet. Forkcast has it targeting early
      // August with the exact date deferred to ACDT #90.
      name: "Devnet-8 (Plataberget)",
      window: "August 2026",
      date: null,
      status: "anticipated",
    },
    {
      name: "Mainnet activation",
      window: "2026",
      date: null,
      status: "projected",
    },
  ],
  eips: [
    { id: 7732, status: "sfi", headliner: true },
    { id: 7928, status: "sfi", headliner: true },
  ],
  "facts-verified": "2026-08-06",
  "source-url": "https://forkcast.org/upgrade/glamsterdam",
} satisfies UpgradeData
