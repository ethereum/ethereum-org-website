import { createChallenge, verifySolution } from "altcha-lib"
import { deriveKey } from "altcha-lib/algorithms/sha"
import type { Payload } from "altcha-lib/types"
import { createHmac } from "node:crypto"

import { getDb } from "@/lib/db"
import { verification } from "@/lib/db/schema"

/**
 * Proof-of-work challenge (ALTCHA, self-hosted) in front of account creation:
 * the browser spends about a second of compute, which costs a person nothing
 * and a bot farm a lot. Used instead of per-IP limits, which would also catch
 * everyone behind a shared school or office address.
 */

export const CHALLENGE_HEADER = "x-altcha"

const ALGORITHM = "SHA-256"
const EXPIRES_MS = 5 * 60_000

const hmacSecret = () =>
  createHmac("sha256", process.env.LEARNER_AUTH_SECRET ?? "")
    .update("altcha")
    .digest("hex")

export const issueChallenge = () =>
  createChallenge({
    algorithm: ALGORITHM,
    // Four hex zeros: about 65,000 hashes on average
    keyPrefix: "0000",
    cost: 1,
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
