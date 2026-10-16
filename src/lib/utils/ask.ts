// Client side of Ask AI. Prompt, retrieval and citation numbering live with the route,
// in app/api/ask/grounding.ts, so none of it reaches the browser bundle.

import { redactSeedPhrase } from "./seedPhrase"

// Production origin on purpose: the index stores ethereum.org URLs on every deploy.
export const SITE_ORIGIN = "https://ethereum.org"

export interface Source {
  n: number
  url: string
  title: string
}

/** Error codes the route streams; each has a `docsearch-ask-error-*` message. */
export type AskErrorCode = "address" | "empty" | "truncated"

/**
 * A link the model wrote renders only if it is on this site or is the referral this
 * answer was given; anything else is likely injected. Resolved, not prefix-matched,
 * since `//evil.example` looks relative.
 */
export const isAllowedAnswerLink = (
  href: string | undefined,
  referral?: string
): boolean => {
  if (!href) return false
  if (referral && href === referral) return true
  try {
    return new URL(href, SITE_ORIGIN).origin === SITE_ORIGIN
  } catch {
    return false
  }
}

/**
 * Drop a citation the next one on the same line repeats, keeping the last of the run.
 * A different citation in between, or a line break, ends the run.
 */
export const collapseRepeatedCitations = (text: string) =>
  text
    .split("\n")
    .map((line) => {
      const runs = [...line.matchAll(/[ \t]*(?:\[\d{1,2}\])+/g)]
      const key = (run: string) =>
        [...run.matchAll(/\d{1,2}/g)]
          .map(Number)
          .sort((a, b) => a - b)
          .join(",")
      // Right to left, so a removal does not shift the offsets still to check.
      return runs.reduceRight(
        (acc, run, index) =>
          index < runs.length - 1 && key(run[0]) === key(runs[index + 1][0])
            ? acc.slice(0, run.index) + acc.slice(run.index + run[0].length)
            : acc,
        line
      )
    })
    .join("\n")

const CITATION_RUN = /[ \t]*(\[\d{1,2}\])+/g

/** Move a citation that landed before closing punctuation to after it. */
export const citationsAfterPunctuation = (text: string) =>
  text.replace(/[ \t]*((?:\[\d{1,2}\])+)([.,;:!?]+)/g, "$2$1")

/**
 * Link each `[n]` to its source once sources are known. `[[1]](url)` keeps the brackets
 * in the link text, the site's citation form (see the design-system skill).
 */
export const withCitationLinks = (text: string, sources: Source[]) => {
  if (!sources.length) return text
  return citationsAfterPunctuation(collapseRepeatedCitations(text)).replace(
    CITATION_RUN,
    (run) => {
      const numbers = [...run.matchAll(/\[(\d{1,2})\]/g)].map((m) =>
        Number(m[1])
      )
      const links = numbers
        .map((n) => {
          const source = sources.find((candidate) => candidate.n === n)
          // The word joiner keeps the marker on the line of the sentence it marks.
          return source ? `⁠[[${n}]](${source.url})` : null
        })
        .filter(Boolean)
      return links.length === numbers.length ? links.join("") : run
    }
  )
}

// Replaced in place, so the question around a secret survives into analytics.
const REDACTIONS: [RegExp, string][] = [
  [/0x[a-fA-F0-9]{20,}/g, "[redacted address]"],
  [/\b[a-fA-F0-9]{40,}\b/g, "[redacted hash]"],
  [/\S+@\S+\.\S+/g, "[redacted email]"],
]

/** The question as safe to send to analytics: no addresses, hashes, emails or phrases. */
export const scrubQuery = (query: string): string | null => {
  const trimmed = query.trim()
  if (!trimmed) return null
  const safe = REDACTIONS.reduce(
    (text, [shape, label]) => text.replace(shape, label),
    redactSeedPhrase(trimmed)
  )
  return safe.slice(0, 120)
}

const ASK_WINDOW_MS = 60_000
const ASK_LIMIT = 5
const ASK_RATE_KEY = "ethereum-org.ask-rate"

// Fallback when localStorage throws (some private modes), so the limit still holds.
let askMemory: number[] = []

const readAsks = (): number[] => {
  try {
    const stored = localStorage.getItem(ASK_RATE_KEY)
    return stored ? (JSON.parse(stored) as number[]) : []
  } catch {
    return askMemory
  }
}

const writeAsks = (asks: number[]) => {
  askMemory = asks
  try {
    localStorage.setItem(ASK_RATE_KEY, JSON.stringify(asks))
  } catch {
    // Already held in memory.
  }
}

export interface AskAllowance {
  allowed: boolean
  /** Seconds until the oldest ask in the window falls out of it. */
  retryAfter: number
}

/**
 * A per-browser courtesy limit against accidental repeats. Not a defence: clearing
 * storage resets it. Records the ask when allowed, so do not call it speculatively.
 */
export const takeAskAllowance = (now = Date.now()): AskAllowance => {
  const recent = readAsks().filter(
    (at) => typeof at === "number" && now - at < ASK_WINDOW_MS
  )
  if (recent.length >= ASK_LIMIT) {
    const oldest = Math.min(...recent)
    return {
      allowed: false,
      retryAfter: Math.max(
        1,
        Math.ceil((ASK_WINDOW_MS - (now - oldest)) / 1000)
      ),
    }
  }
  writeAsks([...recent, now])
  return { allowed: true, retryAfter: 0 }
}
