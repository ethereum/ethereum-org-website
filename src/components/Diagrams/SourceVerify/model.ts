/**
 * Plain model for `SourceVerifyDiagram`, the replacement for
 * smart-contracts/verifying/source-code-verification.png: checking that
 * published source code compiles to the code deployed at an address.
 *
 * A verifier recompiles the sources with the given settings, reads the
 * deployed code with eth_getCode, and compares the two. Solidity appends a
 * CBOR-encoded hash of the contract's metadata file (which holds every source
 * file's keccak256 hash and the settings) to the end of the code, so
 * changing a single byte of any source, comments included, changes that
 * hash but not the executable code before it.
 *
 * Sources (checked November 2026):
 * - Solidity metadata and its appended hash:
 *   https://docs.soliditylang.org/en/latest/metadata.html
 * - Match types: https://docs.sourcify.dev/docs/exact-match-vs-match/ (an
 *   exact match also matches the metadata hash; a match ignores it; formerly
 *   "full" and "partial"). Etherscan's tiers differ (exact, similar, runtime).
 * - Immutables and library addresses are filled in at deployment, so
 *   verifiers mask those bytes before comparing. Verifiers also compare the
 *   creation code (the deploy transaction's input, with the constructor
 *   arguments); the figure shows the runtime comparison only.
 */

/** viewBox of the drawing. */
export const SOURCE_VERIFY_SIZE = { width: 490, height: 250 }

/** Every drawn part; ids match the rig's `data-part` and the label spots. */
export const SOURCE_VERIFY_PARTS = [
  "sources",
  "settings",
  "compiler",
  "recompiled",
  "chain",
  "deployed",
  "metadata",
  "verifier",
] as const
export type SourceVerifyPart = (typeof SOURCE_VERIFY_PARTS)[number]

/** Paths that carry something; each runs forward, toward the verifier. */
export const SOURCE_VERIFY_LINKS = [
  "sources",
  "settings",
  "compiled",
  "get-code",
  "compare-recompiled",
  "compare-deployed",
] as const
export type SourceVerifyLink = (typeof SOURCE_VERIFY_LINKS)[number]

export const SOURCE_VERIFY_STEPS = [
  "idle",
  "compile",
  "fetch",
  "compare",
  "metadata",
] as const
export type SourceVerifyStep = (typeof SOURCE_VERIFY_STEPS)[number]
export const SOURCE_VERIFY_LAST_STEP = SOURCE_VERIFY_STEPS.length - 1

/**
 * Scenarios: the published sources are exactly the ones deployed, differ
 * only in a comment, or differ in code.
 */
export const SOURCE_VERIFY_PRESET_IDS = ["exact", "comment", "code"] as const
export type SourceVerifyPresetId = (typeof SOURCE_VERIFY_PRESET_IDS)[number]

interface SourceVerifyPreset {
  /** The executable code (everything before the metadata hash) matches. */
  codeMatches: boolean
  /** The appended metadata hashes match. */
  metadataMatches: boolean
}

export const SOURCE_VERIFY_PRESETS: Record<
  SourceVerifyPresetId,
  SourceVerifyPreset
> = {
  exact: { codeMatches: true, metadataMatches: true },
  // A comment is in the source file, so in its hash and in the metadata,
  // but compiles to nothing.
  comment: { codeMatches: true, metadataMatches: false },
  code: { codeMatches: false, metadataMatches: false },
}

/** The JSON-RPC method the verifier calls; shown as code. */
export const GET_CODE = "eth_getCode"

export type Comparison = "match" | "differs"
export type VerifyResult = "exact" | "match" | "none"

export interface SourceVerifyView {
  step: number
  motion: SourceVerifyStep
  /** Caption and status key: the step, with the scenario where it matters. */
  key: string
  flows: Partial<Record<SourceVerifyLink, true>>
  litPart: SourceVerifyPart | null
  /** The recompiled code exists. */
  compiled: boolean
  /** The deployed code has been read. */
  fetched: boolean
  code: Comparison | null
  metadata: Comparison | null
  result: VerifyResult | null
}

const FLOWS: Record<SourceVerifyStep, SourceVerifyView["flows"]> = {
  idle: {},
  compile: { sources: true, settings: true, compiled: true },
  fetch: { "get-code": true },
  compare: { "compare-recompiled": true, "compare-deployed": true },
  metadata: {},
}

const LIT: Record<SourceVerifyStep, SourceVerifyPart | null> = {
  idle: null,
  compile: "compiler",
  fetch: "deployed",
  compare: "verifier",
  metadata: "metadata",
}

const at = (step: SourceVerifyStep) => SOURCE_VERIFY_STEPS.indexOf(step)

export const getSourceVerifyView = (
  presetId: SourceVerifyPresetId,
  requestedStep: number
): SourceVerifyView => {
  const step = Math.min(Math.max(requestedStep, 0), SOURCE_VERIFY_LAST_STEP)
  const motion = SOURCE_VERIFY_STEPS[step]
  const preset = SOURCE_VERIFY_PRESETS[presetId]
  const compared = step >= at("compare")
  const metadataChecked = step >= at("metadata")
  const code = compared ? (preset.codeMatches ? "match" : "differs") : null
  const metadata = metadataChecked
    ? preset.metadataMatches
      ? "match"
      : "differs"
    : null
  const result: VerifyResult | null = !compared
    ? null
    : !preset.codeMatches
      ? "none"
      : metadataChecked && preset.metadataMatches
        ? "exact"
        : "match"
  const key =
    motion === "compare" || motion === "metadata"
      ? `${motion}-${presetId}`
      : motion
  return {
    step,
    motion,
    key,
    flows: FLOWS[motion],
    litPart: LIT[motion],
    compiled: step >= at("compile"),
    fetched: step >= at("fetch"),
    code,
    metadata,
    result,
  }
}
