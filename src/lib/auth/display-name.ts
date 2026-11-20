/**
 * Display names: what a learner is called in the header, on their profile and
 * on the leaderboard. Shared by the browser (instant feedback) and the server
 * (which enforces them, plus a word filter: `server.ts`).
 */

export const DISPLAY_NAME_MIN = 2
export const DISPLAY_NAME_MAX = 24

/** Why a display name is refused; each has a `component-account` message.
 * `language` comes from the server's word filter only */
export type DisplayNameProblem =
  | "length"
  | "characters"
  | "link"
  | "reserved"
  | "language"

/** `0x1234…abcd`: enough to recognise a wallet, not to read it out */
export const truncateAddress = (address: string) =>
  `${address.slice(0, 6)}…${address.slice(-4)}`

const ADDRESS = /^0x[0-9a-f]{40}$/i

/** Default for an account started with a passkey: a random short tag */
export const passkeyDisplayName = () => {
  const hex = crypto.randomUUID().replaceAll("-", "")
  return `${hex.slice(0, 6)}…${hex.slice(-4)}`
}

/** A stored name as shown: wallet-address names are truncated */
export const displayName = (name: string) =>
  ADDRESS.test(name) ? truncateAddress(name) : name

/**
 * Tidied before checking or saving: one form of each character, no invisible
 * or direction-changing characters, single spaces
 */
export const normalizeDisplayName = (raw: string) =>
  raw.normalize("NFKC").replace(/\p{C}/gu, "").replace(/\s+/g, " ").trim()

// Letters, marks and numbers in any script, plus a little punctuation
const ALLOWED = /^[\p{L}\p{M}\p{N} ._'-]+$/u
// Anything that reads as a site: a leaderboard is a scammer's billboard
const LINK = /(https?:|www\.|\.[a-z]{2,}(\s|$)|@)/i
// Names that would pass for the site or its team: whole words, so
// "badminton" is fine
const RESERVED =
  /ethereum\s*\.?\s*org|ethereum\s*foundation|\b(admin|moderator|official|support|staff)\b/i

/** The first problem with an already-normalized name, or null */
export const displayNameProblem = (name: string): DisplayNameProblem | null => {
  const length = [...name].length
  if (length < DISPLAY_NAME_MIN || length > DISPLAY_NAME_MAX) return "length"
  if (LINK.test(name)) return "link"
  if (!ALLOWED.test(name)) return "characters"
  if (RESERVED.test(name)) return "reserved"
  return null
}

/**
 * Seed for an account's avatar: a hash of its id, so the picture is stable
 * and unique per account (whatever the name) without showing the id itself
 */
export const avatarSeed = async (accountId: string) => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`avatar:${accountId}`)
  )
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}
