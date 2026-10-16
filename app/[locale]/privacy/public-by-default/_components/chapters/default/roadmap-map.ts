import type { PrivacyLessonDossierId } from "@/lib/types"

/**
 * Chapter 09 data: the privacy roadmap tracks, which dossier entries each
 * would hide or reduce, and the roadmap grid. Text lives in the
 * page-privacy-public-by-default namespace (keys below, without the prefix).
 */

/** Date the roadmap statuses were last checked (ISO, UTC). Update with the badges. */
export const ROADMAP_REVIEWED = "2026-10-14"

export const roadmapTracks = ["reads", "writes", "proving", "kohaku"] as const
export type RoadmapTrack = (typeof roadmapTracks)[number]

type Effect = "hidden" | "reduced"

/**
 * Which track would hide or reduce each entry if it landed. Conservative on
 * purpose; entries not listed stay visible (see `stillVisibleReason`).
 * Ported from the prototype.
 */
export const roadmapEffects: Partial<
  Record<PrivacyLessonDossierId, Array<[RoadmapTrack, Effect]>>
> = {
  ip: [
    ["reads", "hidden"],
    ["kohaku", "reduced"],
  ],
  linked: [
    ["reads", "hidden"],
    ["kohaku", "hidden"],
  ],
  holdings: [["reads", "hidden"]],
  rpclog: [
    ["reads", "hidden"],
    ["kohaku", "reduced"],
  ],
  origin: [
    ["reads", "hidden"],
    ["kohaku", "reduced"],
  ],
  networth: [
    ["writes", "hidden"],
    ["kohaku", "reduced"],
  ],
  salary: [
    ["writes", "hidden"],
    ["kohaku", "reduced"],
  ],
  rent: [
    ["writes", "hidden"],
    ["kohaku", "reduced"],
  ],
  friend: [
    ["writes", "hidden"],
    ["kohaku", "reduced"],
  ],
  home: [
    ["writes", "hidden"],
    ["kohaku", "reduced"],
  ],
  schedule: [["writes", "reduced"]],
  cluster: [
    ["writes", "reduced"],
    ["kohaku", "reduced"],
  ],
  kyc: [["proving", "reduced"]],
  poap: [["proving", "reduced"]],
}

export type RoadmapReason =
  | "browser"
  | "wallet-settings"
  | "public-trades"
  | "published"
  | "not-covered"

/** Why an entry stays visible even with every track on */
export const stillVisibleReason = (
  id: PrivacyLessonDossierId
): RoadmapReason => {
  switch (id) {
    case "tz":
    case "langs":
    case "device":
    case "gpu":
    case "fp":
    case "wallets":
      return "browser"
    case "pixel":
      return "wallet-settings"
    case "mev":
      return "public-trades"
    case "label":
    case "ens":
      return "published"
    default:
      return "not-covered"
  }
}

export type RoadmapState =
  | { state: "hidden"; by: RoadmapTrack }
  | { state: "reduced"; by: RoadmapTrack }
  | { state: "visible" }

export const roadmapStateOf = (
  id: PrivacyLessonDossierId,
  on: ReadonlySet<RoadmapTrack>
): RoadmapState => {
  let reduced: RoadmapState | null = null
  for (const [track, effect] of roadmapEffects[id] ?? []) {
    if (!on.has(track)) continue
    if (effect === "hidden") return { state: "hidden", by: track }
    if (!reduced) reduced = { state: "reduced", by: track }
  }
  return reduced ?? { state: "visible" }
}

export type RoadmapStatusTone =
  | "normal"
  | "accent-a"
  | "warning"
  | "primary"
  | "success"

export interface RoadmapItem {
  /** Key stem: default-roadmap-<id>-{status,title,body} */
  id: string
  tone: RoadmapStatusTone
  /** EIP number for "Read the proposal" */
  eip?: number
  /** Glossary anchor used by the body (or title) copy */
  glossary?: string
  /** href for a <link> tag in the body */
  link?: string
  /** Extra keys rendered after the body (short keys) */
  extras?: Array<{ key: string; link?: string }>
}

export interface RoadmapGroup {
  /** Key stem for witnesses/title/description: default-roadmap-<id>-… */
  id: "reads" | "writes" | "proving"
  items: RoadmapItem[]
}

export const roadmapGroups: RoadmapGroup[] = [
  {
    id: "reads",
    items: [
      { id: "reads-who", tone: "normal", link: "/privacy/online/" },
      { id: "reads-what", tone: "accent-a" },
      { id: "reads-check", tone: "success", glossary: "light-client" },
    ],
  },
  {
    id: "writes",
    items: [
      { id: "focil", tone: "primary", eip: 7805, glossary: "block-builder" },
      { id: "frame", tone: "primary", eip: 8141 },
      { id: "keyed-nonces", tone: "warning", eip: 8250, glossary: "nonce" },
      { id: "shielded-pool", tone: "normal", eip: 8182 },
    ],
  },
  {
    id: "proving",
    items: [
      { id: "credentials", tone: "accent-a", glossary: "zk-proof" },
      {
        id: "maci",
        tone: "success",
        extras: [
          { key: "default-roadmap-maci-trust" },
          { key: "default-roadmap-maci-link", link: "https://maci.pse.dev/" },
        ],
      },
      { id: "phone-proofs", tone: "normal" },
    ],
  },
]

export const KOHAKU_HREF = "https://github.com/ethereum/kohaku"
export const HUGHES_HREF = "https://www.activism.net/cypherpunk/manifesto.html"

export const keepGoingLinks = [
  { key: "default-more-privacy", href: "/privacy/" },
  { key: "default-more-privacy-ethereum", href: "/privacy/ethereum/" },
  { key: "default-more-roadmap", href: "/roadmap/privacy/" },
  { key: "default-more-online", href: "/privacy/online/" },
  { key: "default-more-security", href: "/security/" },
  { key: "default-more-run-a-node", href: "/run-a-node/" },
  { key: "default-more-find-wallet", href: "/wallets/find-wallet/" },
] as const
