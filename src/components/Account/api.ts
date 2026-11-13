"use client"

import { solveChallenge } from "altcha-lib"
import { deriveKey } from "altcha-lib/algorithms/web/sha"

import { withTrailingSlash } from "@/lib/utils/api-path"

/** Must match `CHALLENGE_HEADER` in `src/lib/auth/challenge.ts` */
export const CHALLENGE_HEADER = "x-altcha"

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
      headers: { "content-type": "application/json", ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    const data = (await response.json().catch(() => null)) as T | null
    return { ok: response.ok, status: response.status, data }
  } catch {
    return { ok: false, status: 0, data: null }
  }
}

/** A passkey prompt the person closed or let time out: not an error to show */
export const isCancelled = (error: unknown) =>
  error instanceof DOMException &&
  (error.name === "NotAllowedError" || error.name === "AbortError")
