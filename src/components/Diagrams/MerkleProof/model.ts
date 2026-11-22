/**
 * Plain model for `MerkleProofDiagram`, the replacement for tree.png and
 * proof-c.png on /developers/tutorials/merkle-proofs-for-offline-data-integrity/:
 * checking one value against a stored Merkle root with a proof of one
 * sibling hash per level.
 *
 * Follows the tutorial's own code: leaves are the first eight entries of its
 * `dataArray` (the article uses nine, padded with empty branches; eight keeps
 * the tree of its figures, A to H), `hash(x)` is keccak256 of `x` as a 32-byte
 * uint (`abi.encode`), and `pairHash(a, b) = hash(hash(a) ^ hash(b))`. The
 * proof for C is D, H(A-B), H(E-H), as in the article.
 */

import { hexToBigInt, keccak256, numberToHex } from "viem"

/** viewBox of the drawing. */
export const MERKLE_PROOF_SIZE = { width: 460, height: 300 }

/** The tutorial's `dataArray`, first eight entries: A to H. */
export const LEAF_VALUES = [
  BigInt(0x0bad0010),
  BigInt(0x60a70020),
  BigInt(0xbeef0030),
  BigInt(0xdead0040),
  BigInt(0xca110050),
  BigInt(0x0e660060),
  BigInt(0xface0070),
  BigInt(0xbad00080),
] as const
export const LEAF_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H"] as const
export const LEAVES = LEAF_VALUES.length
/** log2 of the leaves: one sibling hash per level. */
export const PROOF_SIZE = Math.log2(LEAVES)
/** The article's rollup example: 1,024 words need ten levels. */
export const BIG_LEAVES = 1024
export const BIG_PROOF_SIZE = Math.log2(BIG_LEAVES)

/** C with its token amount changed (the last two bytes, 0x0030 to 0x0300). */
const TAMPERED_C = BigInt(0xbeef0300)

const hash = (x: bigint) => hexToBigInt(keccak256(numberToHex(x, { size: 32 })))
const pairHash = (a: bigint, b: bigint) => hash(hash(a) ^ hash(b))

/** levels[0] = leaves, levels[3] = [root]. */
const buildLevels = (leaves: readonly bigint[]) => {
  const levels: bigint[][] = [[...leaves]]
  while (levels[levels.length - 1].length > 1) {
    const below = levels[levels.length - 1]
    levels.push(
      Array.from({ length: below.length / 2 }, (_, i) =>
        pairHash(below[2 * i], below[2 * i + 1])
      )
    )
  }
  return levels
}

const LEVELS = buildLevels(LEAF_VALUES)
const STORED_ROOT = LEVELS[PROOF_SIZE][0]

/** Name of node `index` on `level`, in the article's notation: C, H(A-B), H(A-H). */
export const nodeName = (level: number, index: number) => {
  if (level === 0) return LEAF_NAMES[index]
  const span = 2 ** level
  return `H(${LEAF_NAMES[index * span]}-${LEAF_NAMES[index * span + span - 1]})`
}

/** Short hex for display: hashes are code, never number-formatted. */
export const shortHex = (x: bigint) => {
  const hex = numberToHex(x, { size: 32 })
  return `0x${hex.slice(2, 6)}…${hex.slice(-4)}`
}
export const fullHex = (x: bigint) => `0x${x.toString(16).padStart(8, "0")}`

export const MERKLE_PROOF_PRESET_IDS = ["c", "f", "tampered"] as const
export type MerkleProofPresetId = (typeof MERKLE_PROOF_PRESET_IDS)[number]

const PRESETS: Record<
  MerkleProofPresetId,
  { leaf: number; value: bigint; tampered: boolean }
> = {
  c: { leaf: 2, value: LEAF_VALUES[2], tampered: false },
  f: { leaf: 5, value: LEAF_VALUES[5], tampered: false },
  tampered: { leaf: 2, value: TAMPERED_C, tampered: true },
}

const STEPS = [
  "idle",
  "value",
  "level1",
  "level2",
  "level3",
  "compare",
] as const
export type MerkleProofMotion = (typeof STEPS)[number]
export const MERKLE_PROOF_LAST_STEP = STEPS.length - 1

/** Every drawn part; ids match `data-part` and the label spots. */
export const MERKLE_PROOF_PARTS = ["value", "proof", "path", "root"] as const
export type MerkleProofPart = (typeof MERKLE_PROOF_PARTS)[number]

const LIT: Record<MerkleProofMotion, MerkleProofPart | null> = {
  idle: null,
  value: "value",
  level1: "path",
  level2: "path",
  level3: "path",
  compare: "root",
}

export type MerkleNodeRole = "value" | "proof" | "path" | "other"

export interface MerkleProofPresetData {
  leaf: number
  tampered: boolean
  /** The value the verifier is given (hex). */
  valueHex: string
  /** Leaf name, primed when tampered (C′). */
  leafName: string
  /** Proof hashes, bottom up: names and their sibling indices per level. */
  proofNames: string[]
  /** Names of the hashes the verifier computes, levels 1 to 3. */
  pathNames: string[]
  /** Computed hash per level 1 to 3, short hex. */
  computedHex: string[]
  storedRootHex: string
  matches: boolean
  /** role[level][index] for every node in the tree. */
  roles: MerkleNodeRole[][]
}

const buildPreset = (id: MerkleProofPresetId): MerkleProofPresetData => {
  const { leaf, value, tampered } = PRESETS[id]
  const roles: MerkleNodeRole[][] = LEVELS.map((row) => row.map(() => "other"))
  const proofNames: string[] = []
  const pathNames: string[] = []
  const computedHex: string[] = []
  let current = value
  let index = leaf
  roles[0][leaf] = "value"
  for (let level = 0; level < PROOF_SIZE; level++) {
    // Even index: the sibling is next; odd: the one before.
    const sibling = index % 2 ? index - 1 : index + 1
    roles[level][sibling] = "proof"
    proofNames.push(nodeName(level, sibling))
    current = pairHash(current, LEVELS[level][sibling])
    index = Math.floor(index / 2)
    roles[level + 1][index] = "path"
    pathNames.push(nodeName(level + 1, index))
    computedHex.push(shortHex(current))
  }
  return {
    leaf,
    tampered,
    valueHex: fullHex(value),
    leafName: tampered ? `${LEAF_NAMES[leaf]}′` : LEAF_NAMES[leaf],
    proofNames,
    pathNames,
    computedHex,
    storedRootHex: shortHex(STORED_ROOT),
    matches: current === STORED_ROOT,
    roles,
  }
}

export const MERKLE_PROOF_PRESETS = Object.fromEntries(
  MERKLE_PROOF_PRESET_IDS.map((id) => [id, buildPreset(id)])
) as Record<MerkleProofPresetId, MerkleProofPresetData>

export interface MerkleProofView {
  preset: MerkleProofPresetId
  step: number
  motion: MerkleProofMotion
  /** Caption and status key. */
  key: string
  litPart: MerkleProofPart | null
  /** Levels computed so far (0 to 3). */
  computed: number
  /** The latest computed hash, short hex. */
  currentHex: string | null
  /** At the compare step: whether the roots match. */
  result: "match" | "mismatch" | null
}

export const getMerkleProofView = (
  preset: MerkleProofPresetId,
  requestedStep: number
): MerkleProofView => {
  const step = Math.min(Math.max(requestedStep, 0), MERKLE_PROOF_LAST_STEP)
  const motion = STEPS[step]
  const data = MERKLE_PROOF_PRESETS[preset]
  const computed = Math.min(Math.max(step - 1, 0), PROOF_SIZE)
  const tamperedKey =
    data.tampered && (motion === "value" || motion === "compare")
  return {
    preset,
    step,
    motion,
    key: tamperedKey ? `tampered-${motion}` : motion,
    litPart: LIT[motion],
    computed,
    currentHex: computed ? data.computedHex[computed - 1] : null,
    result: motion === "compare" ? (data.matches ? "match" : "mismatch") : null,
  }
}
