"use client"

import { solveChallenge } from "altcha-lib"
import { deriveKey } from "altcha-lib/algorithms/web/pbkdf2"

import { withTrailingSlash } from "@/lib/utils/api-path"

import { authClient } from "@/lib/auth/client"

/** Must match `CHALLENGE_HEADER` in `src/lib/auth/challenge.ts` */
export const CHALLENGE_HEADER = "x-altcha"

/** Must match `TIME_ZONE_HEADER` in `src/lib/courses/server/api.ts` */
const TIME_ZONE_HEADER = "x-time-zone"

/**
 * Solves the server's proof-of-work challenge (about a second of compute)
 * for a sign-in that may create an account. Returns the header value.
 */
export const solveAccountChallenge = async () => {
  const challenge = await (await fetch("/api/account/challenge/")).json()
  const solution = await solveChallenge({ challenge, deriveKey })
  if (!solution) throw new Error("Challenge not solved")
  return btoa(JSON.stringify({ challenge, solution }))
}

export interface ApiResult<T> {
  ok: boolean
  status: number
  data: T | null
}

/** JSON request to a same-origin API; never throws on HTTP errors */
export const requestJson = async <T>(
  path: string,
  body?: unknown,
  headers: Record<string, string> = {}
): Promise<ApiResult<T>> => {
  try {
    const response = await fetch(withTrailingSlash(path), {
      method: body === undefined ? "GET" : "POST",
      headers: {
        "content-type": "application/json",
        // Daily limits follow the learner's own calendar day
        [TIME_ZONE_HEADER]: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    // The session ended (expired, or revoked elsewhere): have the page
    // re-read it, so account UI shows signed out instead of failing quietly
    if (response.status === 401) authClient.$store.notify("$sessionSignal")
    const data = (await response.json().catch(() => null)) as T | null
    return { ok: response.ok, status: response.status, data }
  } catch {
    return { ok: false, status: 0, data: null }
  }
}

/**
 * A refusal because the session is too old for a sensitive change (Better
 * Auth's `freshAge`): confirming it's you, then trying again, gets through.
 * Takes a Better Auth client result or an `ApiResult`.
 */
export const needsFreshSession = (result: unknown) => {
  const { error, data } = (result ?? {}) as {
    error?: { code?: unknown } | null
    data?: { code?: unknown } | null
  }
  const code = error?.code ?? data?.code
  return code === "SESSION_NOT_FRESH" || code === "SESSION_EXPIRED"
}

/** A passkey prompt the person closed or let time out: not an error to show */
export const isCancelled = (error: unknown) =>
  error instanceof DOMException &&
  (error.name === "NotAllowedError" || error.name === "AbortError")
