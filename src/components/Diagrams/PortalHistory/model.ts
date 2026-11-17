/**
 * Plain model for `PortalHistoryDiagram`, the replacement for
 * networking-layer/portal-network/portal-network-devp2p-libp2p.png: fetching
 * expired history from the Portal Network's History network.
 *
 * An execution client keeps every block header but has dropped old block
 * bodies and receipts. To serve an old block's receipts it looks them up in
 * the History network, a distributed hash table in which each node stores
 * the content whose ID is close to its own node ID, and checks what it gets
 * against the header it already holds.
 *
 * Sources (checked November 2026):
 * - History network spec (bodies and receipts by block number; content id
 *   from the block number; XOR distance; `data_radius`; participants are
 *   execution clients holding every header):
 *   https://github.com/ethereum/portal-network-specs/blob/master/history/history-network.md
 * - Portal wire protocol (discv5 TALKREQ; FindContent answered by Content,
 *   which carries the content, a uTP connection id for large content, or
 *   the records of nodes closer to the content id; Kademlia lookup):
 *   https://github.com/ethereum/portal-network-specs/blob/master/portal-wire-protocol.md
 * - Receipts are checked against the header's receiptsRoot, bodies against
 *   its transactionsRoot, ommersHash and withdrawalsRoot (Nimbus Portal
 *   client, history_validation.nim).
 * - Pre-Merge history expiry shipped in July 2025 (EIP-7927); the example
 *   block is pre-Merge, so clients that prune don't store it.
 */

import type { DiagramText } from "@/lib/types"

/** viewBox of the drawing. */
export const PORTAL_HISTORY_SIZE = { width: 490, height: 250 }

/** Every drawn part; ids match the rig's `data-part` and the label spots. */
export const PORTAL_HISTORY_PARTS = [
  "client",
  "headers",
  "network",
  "content",
  "peer",
  "holder",
] as const
export type PortalHistoryPart = (typeof PORTAL_HISTORY_PARTS)[number]

/** The client's two requests; forward is away from the client. */
export const PORTAL_HISTORY_LINKS = ["peer", "holder"] as const
export type PortalHistoryLink = (typeof PORTAL_HISTORY_LINKS)[number]
/** "both": a request out, then its answer back. */
export type LinkFlow = "forward" | "back" | "both"

export const PORTAL_HISTORY_STEPS = [
  "idle",
  "locate",
  "ask",
  "fetch",
  "verify",
] as const
export type PortalHistoryStep = (typeof PORTAL_HISTORY_STEPS)[number]
export const PORTAL_HISTORY_LAST_STEP = PORTAL_HISTORY_STEPS.length - 1

/** The example: receipts of a pre-Merge block. */
export const EXAMPLE_BLOCK = 14_000_000

/** Wire messages and the header field checked, shown as code. */
export const PORTAL_HISTORY_MESSAGE: Partial<
  Record<PortalHistoryStep, string>
> = {
  ask: "FindContent",
  fetch: "Content",
}
export const RECEIPTS_ROOT = "receiptsRoot"

export interface PortalHistoryView {
  step: number
  motion: PortalHistoryStep
  flows: Partial<Record<PortalHistoryLink, LinkFlow>>
  litPart: PortalHistoryPart | null
  message: string | null
  /** The content id is placed on the ring. */
  located: boolean
  /** The client holds the receipts. */
  received: boolean
  verified: boolean
}

const FLOWS: Record<PortalHistoryStep, PortalHistoryView["flows"]> = {
  idle: {},
  locate: {},
  // The peer doesn't store it and answers with closer nodes.
  ask: { peer: "both" },
  // The closest node sends the content back.
  fetch: { holder: "back" },
  verify: {},
}

const LIT: Record<PortalHistoryStep, PortalHistoryPart | null> = {
  idle: null,
  locate: "content",
  ask: "peer",
  fetch: "holder",
  verify: "headers",
}

const at = (step: PortalHistoryStep) => PORTAL_HISTORY_STEPS.indexOf(step)

export const getPortalHistoryView = (
  requestedStep: number
): PortalHistoryView => {
  const step = Math.min(Math.max(requestedStep, 0), PORTAL_HISTORY_LAST_STEP)
  const motion = PORTAL_HISTORY_STEPS[step]
  return {
    step,
    motion,
    flows: FLOWS[motion],
    litPart: LIT[motion],
    message: PORTAL_HISTORY_MESSAGE[motion] ?? null,
    located: step >= at("locate"),
    received: step >= at("fetch"),
    verified: step >= at("verify"),
  }
}

/** Values the figure's strings quote. */
export const getPortalHistoryValues = ({ number, steps }: DiagramText) => ({
  block: number(EXAMPLE_BLOCK),
  ...steps(PORTAL_HISTORY_LAST_STEP),
})
