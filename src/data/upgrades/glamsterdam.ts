import type { UpgradeData } from "./types"

export const glamsterdam = {
  name: "Glamsterdam",
  slug: "glamsterdam",
  "consensus-layer": "Gloas",
  "execution-layer": "Amsterdam",
  "meta-eip": 7773,
  phase: "devnet",
  // Forkcast records the mainnet target as the year only. No quarter has an ACD
  // source, and the meta EIP's activation table is still empty.
  "mainnet-target": { when: { year: 2026 }, confirmed: false },
  milestones: [
    {
      name: "Devnet-7",
      when: { year: 2026, month: 7, day: 14 },
      status: "complete",
    },
    {
      // A named devnet, not a public testnet. Forkcast has it targeting early
      // August with the exact date deferred to ACDT #90.
      name: "Devnet-8 (Plataberget)",
      when: { year: 2026, month: 8 },
      status: "anticipated",
    },
    {
      name: "Mainnet activation",
      when: { year: 2026 },
      status: "projected",
    },
  ],
  // One entry per EIP the Glamsterdam page has a section for, in page order.
  // Deliberately not the full meta EIP roster: Forkcast already publishes that,
  // and duplicating it here would create a second source of truth.
  eips: [
    { id: 7732, status: "sfi", headliner: true },
    { id: 7928, status: "sfi", headliner: true },
    { id: 8159, status: "sfi", headliner: false },
    { id: 8037, status: "sfi", headliner: false },
    { id: 8038, status: "sfi", headliner: false },
    { id: 8045, status: "sfi", headliner: false },
    { id: 8061, status: "sfi", headliner: false },
    { id: 2780, status: "sfi", headliner: false },
    { id: 7997, status: "sfi", headliner: false },
    { id: 7708, status: "sfi", headliner: false },
    { id: 7975, status: "sfi", headliner: false },
  ],
  "facts-verified": "2026-08-06",
  "source-url": "https://forkcast.org/upgrade/glamsterdam",
} satisfies UpgradeData
