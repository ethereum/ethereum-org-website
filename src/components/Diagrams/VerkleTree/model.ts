/**
 * Plain model for `VerkleTreeDiagram`, the replacement for
 * roadmap/verkle-trees/verkle.png: looking up one key in a Verkle tree, and
 * the same lookup in today's hexary Merkle Patricia trie, to compare what a
 * proof of the value has to carry.
 *
 * Sources (checked November 2026):
 * - EIP-6800 (status: Stagnant), https://eips.ethereum.org/EIPS/eip-6800:
 *   node width 256 (a Bandersnatch Pedersen basis of length 256); a key is a
 *   31-byte stem plus a 1-byte suffix; the extension commitment is over
 *   (1, stem, C1, C2); each 32-byte value is two 16-byte sub-leaves,
 *   sub_leaves[2 * suffix] (value_lower, plus 2**128 to tell zero from empty)
 *   and sub_leaves[2 * suffix + 1]; C1 commits to sub_leaves[:256]
 *   (suffixes 0-127), C2 to sub_leaves[256:] (128-255); each inner level
 *   takes one byte of the stem. Witness per account access: "close to 3 kB"
 *   in the hexary Patricia tree, "~200 bytes" with Verkle (average case).
 * - Why a value is split: https://blog.ethereum.org/2021/12/02/verkle-tree-structure
 *   ("we can only store 252 bits safely in one field element"; the
 *   commitments are Pedersen commitments over Bandersnatch).
 * - Proof shape: a Verkle proof carries the commitments on the path below
 *   the root (the verifier has the root) and one multiproof whose size does
 *   not depend on the number of openings
 *   (https://ihagopian.com/posts/anatomy-of-a-verkle-proof); a Merkle proof
 *   needs the `width - 1` sibling nodes per level
 *   (https://vitalik.eth.limo/general/2021/06/18/verkle.html).
 * - Depths follow the page's own example: 7 levels for the Merkle trie,
 *   4 for the Verkle tree.
 */

import type { DiagramText } from "@/lib/types"

/** viewBox of the drawing. */
export const VERKLE_TREE_SIZE = { width: 440, height: 350 }

export const VERKLE_WIDTH = 256
export const MERKLE_WIDTH = 16
/** A hexary trie takes one nibble of the key's hash per level. */
export const NIBBLE_BITS = 4
/** The first entry of an extension node's commitment. */
export const EXTENSION_MARKER = 1
export const STEM_BYTES = 31
export const VALUE_BYTES = 32
export const HALF_BYTES = 16
export const VALUE_BITS = VALUE_BYTES * 8
/** Bits one field element holds safely (the scalar field is ~253 bits). */
export const SAFE_BITS = 252

/** The example key's suffix: under C1 (EIP-6800 keeps an account's code hash at suffix 1). */
export const EXAMPLE_SUFFIX = 1
export const C1_RANGE = [0, VERKLE_WIDTH / 2 - 1] as const
export const C2_RANGE = [VERKLE_WIDTH / 2, VERKLE_WIDTH - 1] as const

/** Root, inner node, extension node, C1. */
export const VERKLE_LEVELS = 4
export const MERKLE_LEVELS = 7
/** One commitment per level below the root, which the verifier already has. */
export const VERKLE_COMMITMENTS = VERKLE_LEVELS - 1
/** One opening proof for the whole witness, however many keys it covers. */
export const VERKLE_OPENING_PROOFS = 1
export const MERKLE_SIBLINGS_PER_LEVEL = MERKLE_WIDTH - 1
export const MERKLE_SIBLINGS = MERKLE_SIBLINGS_PER_LEVEL * MERKLE_LEVELS

/** EIP-6800's average witness per account access. */
export const WITNESS_BYTES = { verkle: 200, merkle: 3 } as const

/** The example key's hash, one nibble per Merkle level: the child taken. */
export const MERKLE_NIBBLES = [10, 3, 15, 6, 1, 12, 8] as const

export const VERKLE_TREE_PRESET_IDS = ["verkle", "merkle"] as const
export type VerkleTreePresetId = (typeof VERKLE_TREE_PRESET_IDS)[number]

const STEPS = {
  verkle: ["idle", "stem", "extension", "suffix", "value", "proof"],
  merkle: ["idle", "path", "value", "proof"],
} as const satisfies Record<VerkleTreePresetId, readonly string[]>

export type VerkleTreeMotion = (typeof STEPS)[VerkleTreePresetId][number]

export const verkleTreeLastStep = (preset: VerkleTreePresetId) =>
  STEPS[preset].length - 1

/** Every drawn part per tree; ids match `data-part` and the label spots. */
export const VERKLE_TREE_PARTS = {
  verkle: ["stem", "extension", "suffix", "data", "proof"],
  merkle: ["trie", "siblings", "data"],
} as const satisfies Record<VerkleTreePresetId, readonly string[]>
export type VerkleTreePart =
  (typeof VERKLE_TREE_PARTS)[VerkleTreePresetId][number]

export interface VerkleTreeView {
  tree: VerkleTreePresetId
  step: number
  motion: VerkleTreeMotion
  /** Caption and status key: the tree, then the step. */
  key: string
  litPart: VerkleTreePart | null
  /** The value has been read. */
  valueRead: boolean
  /** The proof is shown. */
  proof: boolean
  /** Levels on the path reached so far (0 at idle). */
  levels: number
  /** Items the proof carries, once shown. */
  proofItems: number | null
}

const VERKLE_LIT: Record<string, VerkleTreePart | null> = {
  idle: null,
  stem: "stem",
  extension: "extension",
  suffix: "suffix",
  value: "data",
  proof: "proof",
}
const MERKLE_LIT: Record<string, VerkleTreePart | null> = {
  idle: null,
  path: "trie",
  value: "data",
  proof: "siblings",
}

export const getVerkleTreeView = (
  tree: VerkleTreePresetId,
  requestedStep: number
): VerkleTreeView => {
  const last = verkleTreeLastStep(tree)
  const step = Math.min(Math.max(requestedStep, 0), last)
  const motion = STEPS[tree][step]
  const proof = motion === "proof"
  if (tree === "verkle") {
    // Root and inner node, then the extension node, then C1.
    const levels = Math.min(step + 1, VERKLE_LEVELS)
    return {
      tree,
      step,
      motion,
      key: `${tree}-${motion}`,
      litPart: VERKLE_LIT[motion],
      valueRead: step >= 4,
      proof,
      levels: step === 0 ? 0 : levels,
      proofItems: proof ? VERKLE_COMMITMENTS + VERKLE_OPENING_PROOFS : null,
    }
  }
  return {
    tree,
    step,
    motion,
    key: `${tree}-${motion}`,
    litPart: MERKLE_LIT[motion],
    valueRead: step >= 2,
    proof,
    levels: step === 0 ? 0 : MERKLE_LEVELS,
    proofItems: proof ? MERKLE_SIBLINGS : null,
  }
}

/** Values the figure's description quotes; its steps are the Verkle lookup's. */
export const getVerkleTreeValues = ({ number, steps }: DiagramText) => ({
  width: number(VERKLE_WIDTH),
  merkleWidth: number(MERKLE_WIDTH),
  nibbleBits: number(NIBBLE_BITS),
  marker: number(EXTENSION_MARKER),
  stemBytes: number(STEM_BYTES),
  suffix: number(EXAMPLE_SUFFIX),
  c1From: number(C1_RANGE[0]),
  c1To: number(C1_RANGE[1]),
  c2From: number(C2_RANGE[0]),
  c2To: number(C2_RANGE[1]),
  valueBytes: number(VALUE_BYTES),
  halfBytes: number(HALF_BYTES),
  valueBits: number(VALUE_BITS),
  safeBits: number(SAFE_BITS),
  levels: number(VERKLE_LEVELS),
  merkleLevels: number(MERKLE_LEVELS),
  commitments: number(VERKLE_COMMITMENTS),
  siblings: number(MERKLE_SIBLINGS_PER_LEVEL),
  total: number(MERKLE_SIBLINGS),
  verkleBytes: number(WITNESS_BYTES.verkle),
  merkleKb: number(WITNESS_BYTES.merkle),
  ...steps(verkleTreeLastStep("verkle")),
})
