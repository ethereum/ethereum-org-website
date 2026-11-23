"use client"

import { authClient } from "@/lib/auth/client"

export type AccountUser = NonNullable<
  ReturnType<typeof authClient.useSession>["data"]
>["user"]

type AccountStatus = "loading" | "unavailable" | "signed-out" | "signed-in"

// Last settled answer for the page. The session refetches whenever the
// window regains focus, and its pending state then would hide account UI
let settled: AccountStatus | null = null
let settledUser: AccountUser | null = null
// Signed in at some point on this page: signed out later, the session ended
let wasSignedIn = false

/**
 * The visitor's account. `unavailable` where the deploy has no learner
 * database (the auth API answers 404), so callers hide account UI entirely.
 * `ended`: signed out after being signed in on this page (the session
 * expired, was revoked, or was signed out in another tab), so callers can
 * say so instead of showing a first visit's sign-in offer.
 */
export const useAccount = () => {
  const { data, isPending, error, refetch } = authClient.useSession()
  const live: AccountStatus = isPending
    ? "loading"
    : error
      ? error.status === 401
        ? "signed-out"
        : // A failed refetch (offline for a moment) keeps the last answer
          error.status === 404 || !settled
          ? "unavailable"
          : settled
      : data
        ? "signed-in"
        : "signed-out"
  if (live !== "loading") {
    settled = live
    settledUser = live === "signed-in" ? (data?.user ?? null) : null
  }
  if (live === "signed-in") wasSignedIn = true
  const status = live === "loading" && settled ? settled : live
  const user = live === "loading" ? settledUser : (data?.user ?? null)
  const ended = wasSignedIn && status === "signed-out"
  return { status, user, ended, refetch } as const
}
