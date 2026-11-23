import { createChallenge, verifySolution } from "altcha-lib"
import { deriveKey } from "altcha-lib/algorithms/pbkdf2"
import type { Payload } from "altcha-lib/types"
import { createHmac } from "node:crypto"

import { getDb } from "@/lib/db"
import { verification } from "@/lib/db/schema"

/**
 * Proof-of-work challenge (ALTCHA, self-hosted) in front of account creation:
 * the browser spends under a second of compute, which costs a person nothing
 * and a bot farm a lot. Per-address limits stay generous, since a whole school
 * or office can share one address.
 */

export const CHALLENGE_HEADER = "x-altcha"

// PBKDF2 runs natively in the browser too (WebCrypto), so a bot gains little
// over a person; per-hash SHA-256 in browser JS is several times slower
const ALGORITHM = "PBKDF2/SHA-256"
const EXPIRES_MS = 5 * 60_000

const hmacSecret = () =>
  createHmac("sha256", process.env.LEARNER_AUTH_SECRET ?? "")
    .update("altcha")
    .digest("hex")

export const issueChallenge = () =>
  createChallenge({
    algorithm: ALGORITHM,
    // About 256 tries of 5,000 rounds: under a second on a laptop
    keyPrefix: "00",
    cost: 5_000,
    deriveKey,
    expiresAt: new Date(Date.now() + EXPIRES_MS),
    hmacSignatureSecret: hmacSecret(),
  })

/** True once per solved challenge; a replayed solution fails */
export const redeemChallenge = async (header: string | null) => {
  if (!header) return false
  let payload: Payload
  try {
    payload = JSON.parse(Buffer.from(header, "base64").toString("utf8"))
  } catch {
    return false
  }
  if (payload.challenge?.parameters?.algorithm !== ALGORITHM) return false
  const result = await verifySolution({
    challenge: payload.challenge,
    solution: payload.solution,
    deriveKey,
    hmacSignatureSecret: hmacSecret(),
  }).catch(() => null)
  if (!result?.verified || !payload.challenge.signature) return false

  // The row's id comes from the challenge, so a second use conflicts, even
  // when both arrive at once. It outlives the challenge's own expiry
  const id = `altcha:${payload.challenge.signature}`
  const inserted = await getDb()
    .insert(verification)
    .values({
      id,
      identifier: id,
      value: "used",
      expiresAt: new Date(Date.now() + EXPIRES_MS),
    })
    .onConflictDoNothing({ target: verification.id })
    .returning({ id: verification.id })
  return inserted.length > 0
}
