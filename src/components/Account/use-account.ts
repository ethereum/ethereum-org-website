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

/**
 * The visitor's account. `unavailable` where the deploy has no learner
 * database (the auth API answers 404), so callers hide account UI entirely.
 */
export const useAccount = () => {
  const { data, isPending, error, refetch } = authClient.useSession()
  const live: AccountStatus = isPending
    ? "loading"
    : error
      ? // A failed refetch (offline for a moment) keeps the last answer
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
  const status = live === "loading" && settled ? settled : live
  const user = live === "loading" ? settledUser : (data?.user ?? null)
  return { status, user, refetch } as const
}
