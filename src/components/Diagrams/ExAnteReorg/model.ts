/**
 * Plain model for the reorg-schematic.png replacement on
 * /developers/docs/consensus-mechanisms/pos/attack-and-defense/: the
 * one-block ex-ante reorg the page describes (Neuder et al. 2020). The
 * attacker withholds block B for slot n+1 with its attestations, releases
 * them as honest block C (slot n+2) appears, and honest block D (slot n+3)
 * builds on B, orphaning C. The proposer boost scenario shows the defense
 * the page describes further down.
 *
 * Toy weights: every slot's committee is 100 equal votes, the attacker
 * holds 30 of them (the 30% stake the page cites for Neuder et al.), so
 * every number is an integer.
 *
 * Sources (checked November 2026):
 * - Proposer boost: a block that arrives on time in its slot gets weight
 *   equal to PROPOSER_SCORE_BOOST = 40% of one slot's committee weight,
 *   until the slot ends (consensus-specs phase0/fork-choice.md,
 *   `get_proposer_score`; lowered from 70 in consensus-specs PR 3034).
 * - Fork choice counts an attestation only from the slot after it was made
 *   (`validate_on_attestation`), so in slot n+2 honest attesters weigh B by
 *   the attacker's slot n+1 votes alone. With the boost (attacker share b
 *   below 40%) they vote for C, but B still collects the attacker's votes
 *   from both slots (2b) against C's honest ones (1 - b), and the boost has
 *   ended by slot n+3. So boost defeats the attack only while b < 1/3: at
 *   b = 35, B leads 70 to 65 and D builds on B. The 30-vote toy attacker
 *   loses, 60 to 70.
 * - Honest slot n+1 attesters see an empty slot and vote for A, which both
 *   branches share, so their votes favour neither.
 * - Teaching order: step 4 shows the slot n+2 votes as cast; fork choice
 *   counts them from slot n+3 (step 5), when D's proposer picks the head.
 */

/** viewBox of the drawing. */
export const EX_ANTE_REORG_SIZE = { width: 480, height: 300 }

/** Votes in one slot's committee (toy scale). */
export const COMMITTEE_VOTES = 100
/** The attacker's share of every committee. */
export const ATTACKER_VOTES = 30
export const HONEST_VOTES = COMMITTEE_VOTES - ATTACKER_VOTES
/** Most a branch can hold here: the attacker's slot n+1 votes plus a whole
 * slot n+2 committee. Scales the vote tanks. */
export const MAX_BRANCH_VOTES = ATTACKER_VOTES + COMMITTEE_VOTES
/** PROPOSER_SCORE_BOOST, as votes of one committee. */
export const PROPOSER_BOOST_VOTES = 40

/** Slot names, as the page writes them (`n+1`). Notation, never translated. */
export const SLOT_NAMES = { n: "n", n1: "n+1", n2: "n+2", n3: "n+3" } as const

export const EX_ANTE_REORG_PRESET_IDS = ["no-boost", "boost"] as const
export type ExAnteReorgPresetId = (typeof EX_ANTE_REORG_PRESET_IDS)[number]

export const EX_ANTE_REORG_STEPS = [
  "idle",
  "withhold",
  "propose",
  "release",
  "vote",
  "build",
] as const
export type ExAnteReorgStep = (typeof EX_ANTE_REORG_STEPS)[number]
export const EX_ANTE_REORG_LAST_STEP = EX_ANTE_REORG_STEPS.length - 1

/** Labelled parts of the drawing. */
export const EX_ANTE_REORG_PARTS = [
  "a",
  "empty",
  "b",
  "c",
  "d",
  "attacker",
  "votes-c",
  "votes-b",
  "committee",
  "boost",
] as const
export type ExAnteReorgPart = (typeof EX_ANTE_REORG_PARTS)[number]

/** Block names, as the page uses them. Never translated. */
export type BlockName = "A" | "B" | "C" | "D"

export interface ExAnteReorgView {
  preset: ExAnteReorgPresetId
  step: number
  motion: ExAnteReorgStep
  /** B exists but only the attacker has it. */
  bWithheld: boolean
  bShown: boolean
  cShown: boolean
  /** Proposer boost sits on C. */
  boostShown: boolean
  /** The branch D builds on, once proposed. */
  dParent: "b" | "c" | null
  /** The block left off the chain at the end. */
  orphaned: "b" | "c" | null
  /** The release flow from the attacker to B. */
  releasing: boolean
  /** The committee's slot n+2 votes flow into the tanks. */
  voting: boolean
  /** The attacker's slot n+1 votes for B, held back (a ghost level in B's
   * tank). */
  withheldVotes: number
  votesB: number
  votesC: number
  boost: number
  /** Head of the chain as honest validators see it. */
  head: BlockName
  litPart: ExAnteReorgPart | null
  /** The step's caption and status keys, minus the `-step-`/`-status-` part. */
  key: string
}

export const getExAnteReorgView = (
  preset: ExAnteReorgPresetId,
  requestedStep: number
): ExAnteReorgView => {
  const step = Math.min(Math.max(requestedStep, 0), EX_ANTE_REORG_LAST_STEP)
  const motion = EX_ANTE_REORG_STEPS[step]
  const boosted = preset === "boost"
  const boostLive = boosted && step >= 2 && step <= 4

  // B's weight: the attacker's slot n+1 votes once released, then the slot
  // n+2 votes that go its way.
  const bReleased = step >= 3 ? ATTACKER_VOTES : 0
  const honestToB = !boosted
  const votesB =
    step >= 4
      ? bReleased + ATTACKER_VOTES + (honestToB ? HONEST_VOTES : 0)
      : bReleased
  const votesC = step >= 4 && !honestToB ? HONEST_VOTES : 0
  const boost = boostLive ? PROPOSER_BOOST_VOTES : 0

  const winner = votesB > votesC + boost ? "b" : "c"
  const head: BlockName =
    step === 5 ? "D" : step <= 1 ? "A" : winner === "b" ? "B" : "C"

  return {
    preset,
    step,
    motion,
    bWithheld: step >= 1 && step <= 2,
    bShown: step >= 1,
    cShown: step >= 2,
    boostShown: boostLive,
    dParent: step === 5 ? winner : null,
    orphaned: step === 5 ? (winner === "b" ? "c" : "b") : null,
    releasing: motion === "release",
    voting: motion === "vote",
    withheldVotes: step >= 1 && step <= 2 ? ATTACKER_VOTES : 0,
    votesB,
    votesC,
    boost,
    head,
    litPart: (
      {
        idle: null,
        withhold: "b",
        propose: "c",
        release: "attacker",
        // The tank of the branch the honest votes fill.
        vote: boosted ? "votes-c" : "votes-b",
        build: "d",
      } as const
    )[motion],
    key: step >= 2 ? `${motion}-${preset}` : motion,
  }
}
