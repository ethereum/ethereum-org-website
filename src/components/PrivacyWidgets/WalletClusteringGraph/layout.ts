/**
 * Structure of the clustering demo: seven addresses, the six links four
 * heuristics find between them, and two layouts (wide and tall). Coordinates
 * are in each layout's viewBox units; labels are HTML placed by percentage,
 * so their size never depends on string length.
 */
export type ClusterNodeId =
  | "savings"
  | "trading"
  | "staking"
  | "memecoins"
  | "airdrop-1"
  | "airdrop-2"
  | "private"

export type ClusterEdgeLabel =
  | "first-gas"
  | "airdrop-sweep"
  | "deposit-address"
  | "amount"

export interface ClusterEdge {
  from: ClusterNodeId
  to: ClusterNodeId
  /** Heuristic step (1-4) that finds this link */
  step: 1 | 2 | 3 | 4
  label: ClusterEdgeLabel
  /** Where along the link its label sits, 0-1 (default: the middle) */
  labelAt?: number
}

export const NODES: ClusterNodeId[] = [
  "savings",
  "trading",
  "staking",
  "memecoins",
  "airdrop-1",
  "airdrop-2",
  "private",
]

export const EDGES: ClusterEdge[] = [
  { from: "savings", to: "trading", step: 1, label: "first-gas" },
  { from: "savings", to: "staking", step: 1, label: "first-gas" },
  { from: "savings", to: "memecoins", step: 1, label: "first-gas" },
  { from: "airdrop-1", to: "airdrop-2", step: 2, label: "airdrop-sweep" },
  { from: "trading", to: "airdrop-1", step: 3, label: "deposit-address" },
  { from: "savings", to: "private", step: 4, label: "amount", labelAt: 0.68 },
]

/** Steps 1-4 are heuristics; step 5 looks up the public name */
export const HEURISTIC_STEPS = 4
export const TOTAL_STEPS = 5

/** Sample short addresses shown under each node label */
export const NODE_ADDRESSES: Record<ClusterNodeId, string> = {
  savings: "0x7a3f…c21d",
  trading: "0x51be…09a4",
  staking: "0xd90c…77e1",
  memecoins: "0x2f68…b35e",
  "airdrop-1": "0x8e12…4c90",
  "airdrop-2": "0xa4d7…13f8",
  private: "0x6c05…e2ab",
}

export interface ClusterLayout {
  width: number
  height: number
  nodes: Record<ClusterNodeId, { x: number; y: number }>
}

export const WIDE: ClusterLayout = {
  width: 800,
  height: 460,
  nodes: {
    savings: { x: 400, y: 90 },
    trading: { x: 170, y: 215 },
    staking: { x: 400, y: 245 },
    memecoins: { x: 630, y: 215 },
    "airdrop-1": { x: 170, y: 375 },
    "airdrop-2": { x: 400, y: 385 },
    private: { x: 640, y: 380 },
  },
}

export const TALL: ClusterLayout = {
  width: 400,
  height: 640,
  nodes: {
    savings: { x: 200, y: 70 },
    trading: { x: 80, y: 210 },
    staking: { x: 180, y: 340 },
    memecoins: { x: 320, y: 210 },
    "airdrop-1": { x: 80, y: 450 },
    "airdrop-2": { x: 180, y: 570 },
    private: { x: 320, y: 480 },
  },
}

/** Number of clusters after applying heuristics up to `step` (union-find) */
export const countClusters = (step: number) => {
  const parent = Object.fromEntries(NODES.map((id) => [id, id])) as Record<
    ClusterNodeId,
    ClusterNodeId
  >
  const find = (id: ClusterNodeId): ClusterNodeId =>
    parent[id] === id ? id : (parent[id] = find(parent[id]))
  for (const edge of EDGES) {
    if (edge.step <= step) parent[find(edge.from)] = find(edge.to)
  }
  return new Set(NODES.map(find)).size
}
