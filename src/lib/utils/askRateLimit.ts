/**
 * A courtesy limit on how often one browser may ask.
 *
 * Not a defence: clearing storage or opening a private window resets it, and anyone
 * trying to exceed it will. What it stops is the accident -- a held key, an impatient
 * reader re-asking the same question -- and it answers instantly instead of spending a
 * model call to come back with a rate-limit message. The server's own key limit is what
 * caps the bill.
 *
 * Per-IP limiting was considered and rejected: carrier-grade NAT puts whole regions
 * behind one address, so a limit low enough to matter would lock out the readers least
 * able to work around it.
 */

const WINDOW_MS = 60_000
const LIMIT = 5
const KEY = "ethereum-org.ask-rate"

/**
 * Used when `localStorage` throws, which happens in some private-browsing and
 * enterprise-policy configurations. Falling back keeps the limit working for the whole
 * page session rather than blocking a reader who did not opt out of anything -- failing
 * closed would cost real people the feature to enforce a limit that is bypassable anyway.
 */
let memory: number[] = []

const read = (): number[] => {
  try {
    const stored = localStorage.getItem(KEY)
    return stored ? (JSON.parse(stored) as number[]) : []
  } catch {
    return memory
  }
}

const write = (asks: number[]) => {
  memory = asks
  try {
    localStorage.setItem(KEY, JSON.stringify(asks))
  } catch {
    // Already held in memory.
  }
}

export interface AskAllowance {
  allowed: boolean
  /** Seconds until the oldest ask in the window falls out of it. */
  retryAfter: number
}

/** Records the ask when it is allowed, so callers must not call this speculatively. */
export const takeAskAllowance = (now = Date.now()): AskAllowance => {
  const recent = read().filter(
    (at) => typeof at === "number" && now - at < WINDOW_MS
  )
  if (recent.length >= LIMIT) {
    const oldest = Math.min(...recent)
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000)),
    }
  }
  write([...recent, now])
  return { allowed: true, retryAfter: 0 }
}
