/**
 * Plain model for `ZkProofGameDiagram` on /zero-knowledge-proofs/: the
 * page's Ali Baba cave story (Quisquater et al., "How to explain
 * zero-knowledge protocols to your children", 1989). Each round the prover
 * enters by a random side, the verifier calls a side, and someone without the
 * secret word passes only if they guessed that side: 1 in 2 per round, so
 * 1 in 2^n for n rounds in a row.
 */

/** viewBox of the drawing. */
export const ZK_PROOF_GAME_SIZE = { width: 480, height: 312 }

export const ZK_PROOF_GAME_PARTS = [
  "prover",
  "verifier",
  "door",
  "meter",
  "rounds",
] as const
export type ZkProofGamePart = (typeof ZK_PROOF_GAME_PARTS)[number]

export type Side = "a" | "b"
export const SIDES: Side[] = ["a", "b"]

export const PRESET_IDS = ["knows", "faking"] as const
export type ZkProofGamePresetId = (typeof PRESET_IDS)[number]

interface Round {
  /** The side the prover walks in by, out of the verifier's sight. */
  start: Side
  /** The side the verifier calls out. */
  call: Side
}

/** Fixed example sequences: the faker guesses right twice, then wrong. */
export const ROUNDS: Record<ZkProofGamePresetId, Round[]> = {
  knows: [
    { start: "a", call: "b" },
    { start: "b", call: "b" },
    { start: "b", call: "a" },
    { start: "a", call: "a" },
    { start: "a", call: "b" },
  ],
  faking: [
    { start: "b", call: "b" },
    { start: "a", call: "a" },
    { start: "a", call: "b" },
  ],
}

export const MAX_ROUNDS = Math.max(...PRESET_IDS.map((id) => ROUNDS[id].length))

/** Sides a faker can guess from: one right answer in two. */
export const CHOICES = SIDES.length
/** For the description: how quickly the odds fall with more rounds. */
export const MANY_ROUNDS = 20

/** A faker's odds of passing `rounds` rounds in a row: 1 in this. */
export const fakerOdds = (rounds: number) => CHOICES ** rounds

export const lastStep = (presetId: ZkProofGamePresetId) =>
  ROUNDS[presetId].length

export type Outcome = "pass-same" | "pass-door" | "lucky" | "caught"
export type PipState = "pending" | "pass" | "caught" | "skipped"

export interface ZkProofGameView {
  step: number
  /** Caption key. */
  key: "idle" | Outcome
  /** Status key. */
  status: "idle" | "pass" | "lucky" | "caught" | "convinced"
  litPart: ZkProofGamePart | null
  round: Round | null
  outcome: Outcome | null
  /** Rounds passed so far. */
  passed: number
  /** 1 in `odds`: a faker's chance of passing that many rounds. */
  odds: number
  chance: number
  pips: PipState[]
  verdict: "convinced" | "caught" | null
}

export const getZkProofGameView = (
  presetId: ZkProofGamePresetId,
  requestedStep: number
): ZkProofGameView => {
  const rounds = ROUNDS[presetId]
  const step = Math.min(Math.max(requestedStep, 0), rounds.length)
  const knows = presetId === "knows"
  const outcomeOf = ({ start, call }: Round): Outcome =>
    knows
      ? start === call
        ? "pass-same"
        : "pass-door"
      : start === call
        ? "lucky"
        : "caught"

  const round = step > 0 ? rounds[step - 1] : null
  const outcome = round ? outcomeOf(round) : null
  const played = rounds.slice(0, step).map(outcomeOf)
  const passed = played.filter((o) => o !== "caught").length
  const caught = outcome === "caught"
  const convinced = knows && step === rounds.length
  const odds = fakerOdds(passed)

  const pips: PipState[] = Array.from({ length: MAX_ROUNDS }, (_, i) =>
    i < played.length
      ? played[i] === "caught"
        ? "caught"
        : "pass"
      : i >= rounds.length
        ? "skipped"
        : "pending"
  )

  return {
    step,
    key: outcome ?? "idle",
    status: !outcome
      ? "idle"
      : caught
        ? "caught"
        : convinced
          ? "convinced"
          : outcome === "lucky"
            ? "lucky"
            : "pass",
    litPart:
      outcome === "pass-door" || outcome === "caught"
        ? "door"
        : outcome
          ? "prover"
          : null,
    round,
    outcome,
    passed,
    odds,
    chance: 1 / odds,
    pips,
    verdict: caught ? "caught" : convinced ? "convinced" : null,
  }
}
