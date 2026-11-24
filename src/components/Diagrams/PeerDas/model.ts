/**
 * Plain model for the PeerDAS figures on /roadmap/fusaka/peerdas/:
 * `ErasureCodingDiagram` (replaces polynomial.png) and
 * `ColumnSubnetsDiagram` (replaces subnets.png).
 *
 * Sources (checked November 2026), Fulu consensus specs,
 * https://github.com/ethereum/consensus-specs/tree/master/specs/fulu:
 * - das-core.md: NUMBER_OF_COLUMNS = 128 (cells per extended blob),
 *   FIELD_ELEMENTS_PER_EXT_BLOB = 2 * FIELD_ELEMENTS_PER_BLOB (4096 -> 8192),
 *   NUMBER_OF_CUSTODY_GROUPS = 128 (one column per group), CUSTODY_REQUIREMENT
 *   = 4, SAMPLES_PER_SLOT = 8, sampling_size = max(SAMPLES_PER_SLOT,
 *   custody_group_count) groups from get_custody_groups(node_id, ...), custody
 *   groups a prefix of those; a node with 50%+ of the columns SHOULD
 *   reconstruct and cross-seed the rest.
 * - p2p-interface.md: DATA_COLUMN_SIDECAR_SUBNET_COUNT = 128, subnet =
 *   column_index % 128 (so column n is gossiped on subnet n, 0-127);
 *   supernodes custody every column.
 * - validator.md: one group per BALANCE_PER_ADDITIONAL_CUSTODY_GROUP (32 ETH),
 *   min VALIDATOR_CUSTODY_REQUIREMENT = 8, max 128, so 4096 ETH means all 128.
 * Peer sampling (asking random peers for random columns) was removed from
 * Fulu in consensus-specs #4393; sampling is custody sampling.
 */

/* ---------- Erasure coding (polynomial) ---------- */

/** viewBox of the erasure-coding drawing. */
export const ERASURE_SIZE = { width: 480, height: 238 }

export const ERASURE_PARTS = ["polynomial", "data", "extension"] as const
export type ErasurePart = (typeof ERASURE_PARTS)[number]

/** Eight evaluation points; the data sits at the even ones. Real blobs: 4096 values extended to 8192. */
export const SLOT_COUNT = 8
export const ORIGINAL_SLOTS = [0, 2, 4, 6] as const
export const EXTENSION_SLOTS = [1, 3, 5, 7] as const
export const NEEDED_POINTS = ORIGINAL_SLOTS.length
export const BLOB_VALUES = 4096
export const EXTENDED_BLOB_VALUES = 8192

export const VALUE_MIN = 1
export const VALUE_MAX = 9
/** Evaluates to whole numbers at every extension point: 7, 7, 3, 3. */
export const DEFAULT_VALUES = [3, 8, 5, 2]

export const ERASURE_STEPS = ["idle", "extend", "lose", "recover"] as const
export type ErasureStep = (typeof ERASURE_STEPS)[number]
export const ERASURE_LAST_STEP = ERASURE_STEPS.length - 1

export const LOSS_PRESET_IDS = ["data", "block", "extension"] as const
export type LossPresetId = (typeof LOSS_PRESET_IDS)[number]

export const LOSSES: Record<LossPresetId, number[]> = {
  data: [...ORIGINAL_SLOTS],
  block: [2, 3, 4, 5],
  extension: [...EXTENSION_SLOTS],
}

export type PointState = "hidden" | "known" | "lost" | "recovered"

export interface ErasurePoint {
  slot: number
  kind: "data" | "extension"
  value: number
  state: PointState
}

export interface ErasureView {
  step: number
  motion: ErasureStep
  /** Caption and status key. */
  key: string
  litPart: ErasurePart | null
  points: ErasurePoint[]
  /** The curve through the known points, sampled in data space; null while it is unknown. */
  curve: { x: number; y: number }[] | null
  /** Where the dashed, extended stretch of the curve starts. */
  curveSplit: number
  /** Plotted value range and gridlines; fixed per data values, so stepping never rescales. */
  yMin: number
  yMax: number
  ticks: number[]
  known: number
  recovered: number
  lost: number
}

/** The unique polynomial of degree < n through n points (Lagrange form). */
export const lagrange =
  (points: { x: number; y: number }[]) =>
  (x: number): number =>
    points.reduce(
      (sum, pi, i) =>
        sum +
        pi.y *
          points.reduce(
            (product, pj, j) =>
              j === i ? product : (product * (x - pj.x)) / (pi.x - pj.x),
            1
          ),
      0
    )

const SAMPLES_PER_SLOT_GAP = 8

const sampleCurve = (f: (x: number) => number, from: number, to: number) =>
  Array.from(
    { length: Math.round((to - from) * SAMPLES_PER_SLOT_GAP) + 1 },
    (_, i) => {
      const x = from + i / SAMPLES_PER_SLOT_GAP
      return { x, y: f(x) }
    }
  )

const yScale = (f: (x: number) => number) => {
  const ys = sampleCurve(f, 0, SLOT_COUNT - 1).map(({ y }) => y)
  const low = Math.min(0, ...ys)
  const high = Math.max(10, ...ys)
  const tick = high - low <= 12 ? 2 : high - low <= 30 ? 5 : 10
  const yMin = Math.floor(low / tick) * tick
  const yMax = Math.ceil(high / tick) * tick
  const ticks = Array.from(
    { length: Math.round((yMax - yMin) / tick) + 1 },
    (_, i) => yMin + i * tick
  )
  return { yMin, yMax, ticks }
}

const ERASURE_LIT: Record<ErasureStep, ErasurePart | null> = {
  idle: null,
  extend: "extension",
  lose: null,
  recover: "polynomial",
}

export const getErasureView = (
  values: number[],
  presetId: LossPresetId,
  requestedStep: number
): ErasureView => {
  const step = Math.min(Math.max(requestedStep, 0), ERASURE_LAST_STEP)
  const motion = ERASURE_STEPS[step]
  const original = ORIGINAL_SLOTS.map((x, i) => ({ x, y: values[i] }))
  const f = lagrange(original)
  const lostSlots = LOSSES[presetId]
  const extended = step >= 1
  const lostNow = motion === "lose"
  const recovered = motion === "recover"

  const points: ErasurePoint[] = Array.from({ length: SLOT_COUNT }, (_, s) => {
    const kind = s % 2 === 0 ? "data" : "extension"
    const isLost = lostSlots.includes(s)
    const state: PointState =
      kind === "extension" && !extended
        ? "hidden"
        : isLost && lostNow
          ? "lost"
          : isLost && recovered
            ? "recovered"
            : "known"
    return { slot: s, kind, value: f(s), state }
  })
  if (recovered) {
    // Rebuilt from the four survivors only: the same cubic comes back.
    const survivors = points
      .filter((p) => !lostSlots.includes(p.slot))
      .map((p) => ({ x: p.slot, y: p.value }))
    const g = lagrange(survivors)
    for (const p of points) if (p.state === "recovered") p.value = g(p.slot)
  }

  const curve = lostNow
    ? null
    : sampleCurve(f, 0, extended ? SLOT_COUNT - 1 : SLOT_COUNT - 2)
  const known = points.filter(
    (p) => p.state === "known" || p.state === "recovered"
  ).length

  return {
    step,
    motion,
    key:
      motion === "lose" || motion === "recover"
        ? `${motion}-${presetId}`
        : motion,
    litPart: ERASURE_LIT[motion],
    points,
    curve,
    curveSplit: SLOT_COUNT - 2,
    ...yScale(f),
    known,
    recovered: recovered ? lostSlots.length : 0,
    lost: lostSlots.length,
  }
}

/* ---------- Column subnets ---------- */

export const NUMBER_OF_COLUMNS = 128
export const SUBNET_COUNT = 128
export const CUSTODY_REQUIREMENT = 4
export const VALIDATOR_CUSTODY_REQUIREMENT = 8
export const SAMPLES_PER_SLOT = 8
export const ETH_PER_CUSTODY_GROUP = 32
export const SUPERNODE_BALANCE_ETH = 4096
/** Reconstruction needs 50% of the columns. */
export const RECONSTRUCT_COLUMNS = NUMBER_OF_COLUMNS / 2

/** Drawn columns, each standing for 8 real ones; rows are blobs in the block. */
export const DRAWN_COLUMNS = 16
export const COLUMNS_PER_DRAWN = NUMBER_OF_COLUMNS / DRAWN_COLUMNS
export const BLOB_ROWS = 6

/** viewBox of the column-subnets drawing. */
export const SUBNETS_SIZE = { width: 480, height: 296 }

export const NODE_IDS = ["a", "b", "c"] as const
export type NodeId = (typeof NODE_IDS)[number]
export type NodeKind = "regular" | "validator" | "supernode"

export const SUBNETS_PARTS = [
  "node-a",
  "node-b",
  "node-c",
  "subnet",
  "blob",
  "original-half",
  "extension-half",
] as const
export type SubnetsPart = (typeof SUBNETS_PARTS)[number]

interface NodeSpec {
  kind: NodeKind
  /** Columns of get_custody_groups(node_id, sampling_size), in the order its loop finds them. */
  sampling: number[]
  custodyCount: number
}

/*
 * Real outputs of the spec's get_custody_groups for example node IDs 12 (A,
 * custody group count 4) and 59 (B, a validator node at the minimum 8), with
 * one column per group. The first `custodyCount` are custodied; the rest are
 * only sampled. Node C is a supernode: every column.
 */
export const NODES: Record<NodeId, NodeSpec> = {
  a: {
    kind: "regular",
    sampling: [44, 27, 93, 124, 86, 52, 12, 38],
    custodyCount: CUSTODY_REQUIREMENT,
  },
  b: {
    kind: "validator",
    sampling: [66, 26, 106, 115, 61, 20, 3, 101],
    custodyCount: VALIDATOR_CUSTODY_REQUIREMENT,
  },
  c: {
    kind: "supernode",
    sampling: Array.from({ length: NUMBER_OF_COLUMNS }, (_, i) => i),
    custodyCount: NUMBER_OF_COLUMNS,
  },
}

/** The node that rebuilds missing columns in the last step: it follows every subnet. */
export const REBUILDER: NodeId = "c"

/** Drawn columns that don't arrive in the last step: half of them. */
export const MISSING_DRAWN = [0, 3, 5, 6, 9, 10, 12, 15]

export const SUBNETS_STEPS = ["idle", "custody", "sample", "rebuild"] as const
export type SubnetsStep = (typeof SUBNETS_STEPS)[number]
export const SUBNETS_LAST_STEP = SUBNETS_STEPS.length - 1

export type ColumnRole = "none" | "custody" | "sampled"

export interface SubnetsView {
  step: number
  motion: SubnetsStep
  key: string
  kind: NodeKind
  litPart: SubnetsPart | null
  /** Per drawn column: the chosen node's use of it, and whether it is rebuilt. */
  columns: { role: ColumnRole; rebuilt: boolean }[]
  /** Which node's subnet links are drawn, and to which drawn columns. */
  linkNode: NodeId | null
  links: number[]
  /** Drawn columns whose subnet carries a flow this step. */
  flows: number[]
  custodyColumns: number[]
  extraColumns: number[]
  custodied: number
  sampled: number
  samplingSize: number
}

const drawnOf = (column: number) => Math.floor(column / COLUMNS_PER_DRAWN)
const sorted = (columns: number[]) => [...columns].sort((x, y) => x - y)

export const getSubnetsView = (
  nodeId: NodeId,
  requestedStep: number
): SubnetsView => {
  const step = Math.min(Math.max(requestedStep, 0), SUBNETS_LAST_STEP)
  const motion = SUBNETS_STEPS[step]
  const node = NODES[nodeId]
  const samplingSize = Math.max(SAMPLES_PER_SLOT, node.custodyCount)
  const custodyColumns = sorted(node.sampling.slice(0, node.custodyCount))
  const extraColumns = sorted(
    node.sampling.slice(node.custodyCount, samplingSize)
  )
  const custodyDrawn = new Set(custodyColumns.map(drawnOf))
  const extraDrawn = new Set(extraColumns.map(drawnOf))

  const columns = Array.from({ length: DRAWN_COLUMNS }, (_, d) => ({
    role: (step >= 1 && custodyDrawn.has(d)
      ? "custody"
      : step >= 2 && extraDrawn.has(d)
        ? "sampled"
        : "none") as ColumnRole,
    rebuilt: motion === "rebuild" && MISSING_DRAWN.includes(d),
  }))

  const links =
    motion === "rebuild"
      ? Array.from({ length: DRAWN_COLUMNS }, (_, d) => d)
      : step === 0
        ? []
        : [...new Set([...custodyDrawn, ...(step >= 2 ? extraDrawn : [])])]
  const flows =
    motion === "custody"
      ? [...custodyDrawn]
      : motion === "sample"
        ? [...extraDrawn]
        : motion === "rebuild"
          ? MISSING_DRAWN
          : []

  return {
    step,
    motion,
    key: step === 0 || motion === "rebuild" ? motion : `${motion}-${node.kind}`,
    kind: node.kind,
    litPart:
      step === 0
        ? null
        : motion === "rebuild"
          ? `node-${REBUILDER}`
          : `node-${nodeId}`,
    columns,
    linkNode: step === 0 ? null : motion === "rebuild" ? REBUILDER : nodeId,
    links,
    flows,
    custodyColumns,
    extraColumns,
    custodied: step >= 1 ? node.custodyCount : 0,
    sampled: step >= 2 ? samplingSize : 0,
    samplingSize,
  }
}
