/**
 * Quarantine for file+locale pairs that fail deterministically.
 *
 * Some failures do not go away by retrying the same input: a provider that
 * refuses a passage (RECITATION), a validation floor a translation legitimately
 * sits under, a plan the per-file budget refuses. The daily cron retried five
 * such pairs, byte-identical, every morning from 2026-07-30 to 2026-08-12, and
 * when they were the only stale pairs the run had "all tasks failed" and went
 * red -- ten red runs for zero new information.
 *
 * An entry is keyed by file+locale and pinned to the English content hash it
 * failed against, so any English edit clears it automatically. Entries expire
 * (14 days, doubling per repeat, capped) so nothing is abandoned silently, and
 * `mode: full` bypasses the list because a human asked for exactly that pair.
 *
 * The list lives at QUARANTINE_PATH and travels with the manifests through
 * intl/pending-{base}, so a run can read what the previous run learned.
 */

import * as fs from "fs"
import * as path from "path"

import {
  QUARANTINE_MAX_TTL_DAYS,
  QUARANTINE_PATH,
  QUARANTINE_TTL_DAYS,
} from "../constants"

/**
 * Why a pair is quarantined. `refusal`, `validation` and `budget` quarantine on
 * the first failure; `parse` and `gate` are model-output quality and get a
 * second chance before they do.
 */
export type QuarantineClass =
  | "refusal"
  | "validation"
  | "budget"
  | "parse"
  | "gate"

const STRIKES: Record<QuarantineClass, number> = {
  refusal: 1,
  validation: 1,
  budget: 1,
  parse: 2,
  gate: 2,
}

export interface QuarantineEntry {
  file: string
  locale: string
  /** English rootHash the failures happened against */
  englishHash: string
  class: QuarantineClass
  reason: string
  attempts: number
  firstSeen: string
  lastSeen: string
  expiresAt: string
}

export interface QuarantineFile {
  version: 1
  entries: QuarantineEntry[]
}

const DAY_MS = 86_400_000

export const quarantineKey = (file: string, locale: string) =>
  `${file}|${locale}`

/**
 * Classify a task failure. Returns null for anything that may succeed on a
 * plain retry (timeouts, 5xx, rate limits, GitHub API hiccups) and for the run
 * fuse, which says nothing about the pair itself.
 */
export function classifyFailure(message: string): QuarantineClass | null {
  if (/\[cost-guard\] aborting run/.test(message)) return null
  if (
    /finishReason=(RECITATION|PROHIBITED_CONTENT|SAFETY|BLOCKLIST|SPII)/.test(
      message
    )
  )
    return "refusal"
  if (/(Gemini|Mid-content) refusal/.test(message)) return "refusal"
  if (/Output validation failed after \d+ attempts/.test(message))
    return "validation"
  if (
    /\[cost-guard\].*(over the .*budget|over the .*cap|cannot fit batches)/.test(
      message
    )
  )
    return "budget"
  if (/^\[gate\]/.test(message)) return "gate"
  if (/Failed to parse incremental translation response/.test(message))
    return "parse"
  if (/jsx-attr leaf\(s\) failed to translate/.test(message)) return "parse"
  return null
}

export class Quarantine {
  private entries = new Map<string, QuarantineEntry>()
  private dirty = false

  constructor(private readonly now: () => Date = () => new Date()) {}

  static load(root: string, now?: () => Date): Quarantine {
    const q = new Quarantine(now)
    const file = path.join(root, QUARANTINE_PATH)
    if (!fs.existsSync(file)) return q
    const parsed = JSON.parse(fs.readFileSync(file, "utf-8")) as QuarantineFile
    for (const e of parsed.entries ?? []) {
      q.entries.set(quarantineKey(e.file, e.locale), e)
    }
    return q
  }

  static fromJson(json: string, now?: () => Date): Quarantine {
    const q = new Quarantine(now)
    const parsed = JSON.parse(json) as QuarantineFile
    for (const e of parsed.entries ?? []) {
      q.entries.set(quarantineKey(e.file, e.locale), e)
    }
    return q
  }

  get size(): number {
    return this.entries.size
  }

  get changed(): boolean {
    return this.dirty
  }

  /** The entry that currently blocks this pair, if any. */
  active(
    file: string,
    locale: string,
    englishHash: string
  ): QuarantineEntry | null {
    const e = this.entries.get(quarantineKey(file, locale))
    if (!e) return null
    if (e.englishHash !== englishHash) return null
    if (e.attempts < STRIKES[e.class]) return null
    if (new Date(e.expiresAt).getTime() <= this.now().getTime()) return null
    return e
  }

  /**
   * Record a deterministic failure. Returns the entry and whether it is now
   * active (enough strikes to skip the pair on the next run).
   */
  record(input: {
    file: string
    locale: string
    englishHash: string
    class: QuarantineClass
    reason: string
  }): { entry: QuarantineEntry; active: boolean } {
    const key = quarantineKey(input.file, input.locale)
    const nowIso = this.now().toISOString()
    const prev = this.entries.get(key)
    // A different English hash means the content moved since the last failure;
    // the count starts over because this is a new input.
    const attempts =
      prev && prev.englishHash === input.englishHash ? prev.attempts + 1 : 1
    const ttlDays = Math.min(
      QUARANTINE_TTL_DAYS * 2 ** Math.max(0, attempts - STRIKES[input.class]),
      QUARANTINE_MAX_TTL_DAYS
    )
    const entry: QuarantineEntry = {
      file: input.file,
      locale: input.locale,
      englishHash: input.englishHash,
      class: input.class,
      reason: input.reason.slice(0, 300),
      attempts,
      firstSeen:
        prev && prev.englishHash === input.englishHash
          ? prev.firstSeen
          : nowIso,
      lastSeen: nowIso,
      expiresAt: new Date(
        this.now().getTime() + ttlDays * DAY_MS
      ).toISOString(),
    }
    this.entries.set(key, entry)
    this.dirty = true
    return { entry, active: attempts >= STRIKES[input.class] }
  }

  /** Drop the entry for a pair that succeeded, so a later failure counts fresh. */
  clear(file: string, locale: string): void {
    if (this.entries.delete(quarantineKey(file, locale))) this.dirty = true
  }

  /** Every entry, active or not, for reporting. */
  list(): QuarantineEntry[] {
    return [...this.entries.values()].sort((a, b) =>
      `${a.file}|${a.locale}`.localeCompare(`${b.file}|${b.locale}`)
    )
  }

  toJson(): string {
    const out: QuarantineFile = { version: 1, entries: this.list() }
    return JSON.stringify(out, null, 2) + "\n"
  }
}
