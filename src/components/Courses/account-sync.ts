"use client"

import { useEffect, useMemo, useState, useSyncExternalStore } from "react"

import { requestJson } from "@/components/Account/api"
import { useAccount } from "@/components/Account/use-account"

import { withTrailingSlash } from "@/lib/utils/api-path"

import {
  clearAccountHint,
  COURSE_ACCOUNT_KEY,
  COURSE_ACCOUNT_USER_KEY,
  COURSE_SYNC_PENDING_KEY,
  flagProgress,
  isProgressOutdated,
  markProgressOutdated,
  readStoredProgress,
  writeStoredProgress,
} from "./progress-storage"
import type { CourseProgress } from "./useCourseProgress"

import { lessonProgressKey } from "@/lib/courses/constants"
import {
  EMPTY_PROGRESS,
  hasAnyProgress,
  isNewerProgress,
  mergeProgress,
  type ProgressState,
  withAccountProgress,
} from "@/lib/courses/progress"
import {
  type AccountStreak,
  joiningDays,
  unconfirmedDays,
} from "@/lib/courses/streak"

/** The account's progress; its streak is worked out from every device's days */
export interface ServerProgress extends AccountStreak {
  /** The signed-in account's id */
  account: string
  /** The progress record saved from the account's devices, if any yet */
  state: ProgressState | null
  lessons: {
    courseId: string
    lessonId: string
    verified: boolean
    accuracy: number
    completedAt: string
  }[]
  masteries: {
    courseId: string
    verified: boolean
    score: number
    passedAt: string
  }[]
  attemptsLeft: Record<string, number>
  verifiedXp: number
}

/** The account's answer to an upload: its record with this one merged in */
interface SavedProgress extends AccountStreak {
  state: ProgressState
}

const IMPORT_PATH = "/api/courses/progress/import"

const writeLocal = (progress: CourseProgress | null) => {
  writeStoredProgress(progress)
  flagProgress(!!progress && hasAnyProgress(progress))
}

/** Lessons and trophies the server recorded (e.g. graded there) as progress */
const fromRecords = ({
  lessons,
  masteries,
}: ServerProgress): ProgressState => ({
  ...EMPTY_PROGRESS,
  lessons: Object.fromEntries(
    lessons.map(({ courseId, lessonId, accuracy, completedAt }) => [
      lessonProgressKey(courseId, lessonId),
      { completedAt, accuracy },
    ])
  ),
  exams: Object.fromEntries(
    masteries.map(({ courseId, score, passedAt }) => [
      courseId,
      { best: score, passedAt },
    ])
  ),
})

/**
 * Progress saved here that the account hasn't stored yet: whose it is, and
 * an id that changes with every save, so an upload only clears what it
 * carried. Kept in storage, so it outlives the tab until the upload lands.
 */
interface PendingUpload {
  account: string
  id: number
}

const readPending = (): PendingUpload | null => {
  try {
    return JSON.parse(
      window.localStorage.getItem(COURSE_SYNC_PENDING_KEY) ?? "null"
    )
  } catch {
    return null
  }
}

const markPending = (account: string) => {
  try {
    window.localStorage.setItem(
      COURSE_SYNC_PENDING_KEY,
      JSON.stringify({ account, id: Math.random() } satisfies PendingUpload)
    )
  } catch {
    // Storage blocked: the upload still runs, just not again after a reload
  }
}

/** Forgets the pending upload; with `id`, only if nothing was saved since */
export const clearPendingUpload = (id?: number) => {
  if (id === undefined || readPending()?.id === id)
    window.localStorage.removeItem(COURSE_SYNC_PENDING_KEY)
}

const signedInHere = () => !!window.localStorage.getItem(COURSE_ACCOUNT_KEY)

/** The account this page synced with; uploads only happen while it's set */
let syncedAccount: string | null = null
let syncedAt = 0
let syncing: Promise<ServerProgress | null> | null = null
let syncInFlight = false
let pushing: Promise<boolean> | null = null
let pushAgain = false

const RETRY_MS = 2_000
const MAX_RETRY_MS = 5 * 60_000
/** A tab coming back after this long pulls the account's progress again */
const STALE_MS = 60_000
/** Beacons carry 64 KiB at most */
const BEACON_MAX = 60_000

let retryTimer: ReturnType<typeof setTimeout> | undefined
let retries = 0

// Pulls and uploads take turns, so an answer the account gave before an
// upload landed can't overwrite the newer one that upload brought back
let turn: Promise<unknown> = Promise.resolve()
const exclusive = <T>(step: () => Promise<T>) => {
  const run = turn.then(step, step)
  turn = run.catch(() => undefined)
  return run
}

const stopRetrying = () => {
  clearTimeout(retryTimer)
  retryTimer = undefined
  retries = 0
}

const scheduleRetry = () => {
  if (retryTimer || !readPending() || !signedInHere()) return
  const delay = Math.min(MAX_RETRY_MS, RETRY_MS * 2 ** retries++)
  retryTimer = setTimeout(() => {
    retryTimer = undefined
    void flushProgress()
  }, delay)
}

const upload = (progress: CourseProgress) => {
  const { account: _, ...state } = progress
  return requestJson<SavedProgress>(IMPORT_PATH, state)
}

/**
 * The account's answer to an upload, onto whatever was saved here since:
 * records merge, the days it confirmed leave, and the streak is the
 * account's, extended by any days still waiting
 */
const applySaved = (
  account: string,
  saved: SavedProgress,
  sent: CourseProgress
) => {
  const current = readStoredProgress()
  if (current?.account !== account) return
  writeLocal(
    withAccountProgress(
      current,
      saved,
      unconfirmedDays(current.days, sent.days)
    )
  )
}

/** One upload of this browser's progress, if the account lacks some of it */
const pushOnce = () =>
  exclusive(async () => {
    const account = syncedAccount
    const pending = readPending()
    if (isProgressOutdated()) return true
    if (!account || !pending) return !pending
    const progress = readStoredProgress()
    // Left by another account, or replaced since: nothing of this one's to save
    if (pending.account !== account || progress?.account !== account) {
      clearPendingUpload()
      return true
    }
    const { ok, status, data } = await upload(progress)
    if (!ok || !data) {
      // The session ended: what's here stays for the next sign-in to it
      if (status === 401) {
        syncedAccount = null
        clearAccountHint()
      }
      return false
    }
    applySaved(account, data, progress)
    clearPendingUpload(pending.id)
    return true
  })

/** Uploads one at a time, so an older answer can't land after a newer one */
const push = (): Promise<boolean> => {
  if (pushing) {
    pushAgain = true
    return pushing
  }
  pushing = (async () => {
    try {
      let ok = true
      do {
        pushAgain = false
        ok = await pushOnce()
      } while (ok && pushAgain)
      if (ok) retries = 0
      else scheduleRetry()
      return ok
    } finally {
      pushing = null
    }
  })()
  return pushing
}

/**
 * Leaving the page with an upload still owed: sends it on its way. Nothing
 * answers, so the pending mark stays and the next visit sends it again.
 */
const beaconPending = () => {
  const account = syncedAccount
  const progress = readStoredProgress()
  if (isProgressOutdated()) return
  if (!account || readPending()?.account !== account) return
  if (progress?.account !== account || !navigator.sendBeacon) return
  const { account: _, ...state } = progress
  const body = JSON.stringify(state)
  if (body.length < BEACON_MAX)
    navigator.sendBeacon(withTrailingSlash(IMPORT_PATH), body)
}

const onVisibility = () => {
  if (document.visibilityState === "hidden") return beaconPending()
  if (!signedInHere()) return
  // Back after a while: other devices may have moved on
  if (Date.now() - syncedAt > STALE_MS) void syncProgress(true)
  else if (readPending()) {
    stopRetrying()
    void flushProgress()
  }
}

const onOnline = () => {
  if (!readPending()) return
  stopRetrying()
  void flushProgress()
}

let listening = false
const listen = () => {
  if (listening) return
  listening = true
  window.addEventListener("online", onOnline)
  document.addEventListener("visibilitychange", onVisibility)
}

/**
 * Account progress down, browser progress up. This browser's progress joins
 * the account unless it belongs to another account, which it then replaces.
 * The streak shown is the account's, worked out from every device's days,
 * plus this browser's days still on their way. Reuses a sync from the last
 * minute unless `force`d, e.g. right after signing in.
 */
export const syncProgress = (force = false) => {
  const fresh = syncInFlight || Date.now() - syncedAt < STALE_MS
  if (syncing && fresh && !force) return syncing
  listen()
  syncInFlight = true
  const run = pull().finally(() => {
    if (syncing === run) syncInFlight = false
  })
  syncing = run
  return run
}

/** The account's progress in, merged with this browser's, and what it lacks up */
const pull = async () => {
  const { data, owed } = await exclusive(merge)
  if (!data) scheduleRetry()
  else if (owed) {
    markPending(data.account)
    await push()
  }
  return data
}

const merge = async () => {
  const { data, status } = await requestJson<ServerProgress>(
    "/api/courses/progress"
  )
  // Signed out (the session ended) or no accounts here: forget the hint
  if (status === 401 || status === 404) {
    syncedAccount = null
    clearAccountHint()
  }
  if (!data) return { data, owed: false }
  // Saved by a later release: leave it be, and this page asks for a reload
  if (isNewerProgress(data.state) || isProgressOutdated()) {
    markProgressOutdated()
    return { data: null, owed: false }
  }
  const stored = readStoredProgress()
  // Another account's progress (its session ended here) isn't this one's
  const local =
    stored?.account && stored.account !== data.account ? null : stored
  // Joining the account (or saved before days were kept): every day of
  // its streak goes up, not only the ones it kept
  const days =
    local && (!local.account || !local.days)
      ? joiningDays(local)
      : (local?.days ?? [])
  writeLocal({
    ...mergeProgress(
      withAccountProgress(local ?? EMPTY_PROGRESS, data, days),
      fromRecords(data)
    ),
    account: data.account,
  })
  window.localStorage.setItem(COURSE_ACCOUNT_KEY, "1")
  syncedAccount = data.account
  syncedAt = Date.now()
  // Up only what the account lacks: progress joining it, days on their
  // way, or saves an earlier upload didn't get through
  const owed =
    (!!local && !local.account && hasAnyProgress(local)) ||
    days.length > 0 ||
    readPending()?.account === data.account
  return { data, owed }
}

/**
 * Saves this browser's progress to the account now, if the account lacks
 * some of it. False when that failed (offline, say); it's retried with
 * backoff, when the browser comes back online or the tab back into view,
 * and on the next page load.
 */
export const flushProgress = async (): Promise<boolean> => {
  if (!readPending()) return true
  if (syncedAccount) return push()
  if (!signedInHere()) return false
  return !!(await syncProgress(true)) && !readPending()
}

/**
 * After a lesson or exam while signed in: save the new progress to the
 * account right away, and keep trying until it gets there
 */
export const queueProgressUpload = () => {
  if (!signedInHere()) return
  const account = syncedAccount ?? readStoredProgress()?.account
  // Not synced with an account yet: the sync takes this progress along
  if (!account) return void syncProgress(true)
  markPending(account)
  void flushProgress()
}

/**
 * Signing out: the progress here is the account's, so it leaves with it,
 * unless some of it never reached the account, which then stays here (still
 * the account's) until the next sign-in to it. Deleting the account keeps it
 * as this browser's own progress instead.
 */
export const releaseAccountProgress = (keep: boolean) => {
  const progress = readStoredProgress()
  const unsaved =
    !!progress?.account && readPending()?.account === progress.account
  syncedAccount = null
  syncedAt = 0
  syncing = null
  stopRetrying()
  clearAccountHint()
  if (!keep && unsaved) return
  clearPendingUpload()
  if (!keep || !progress) return writeLocal(null)
  const { account: _, ...own } = progress
  writeLocal(own)
}

/** Account progress for a signed-in visitor, synced on first use */
export const useServerProgress = () => {
  const { status } = useAccount()
  const [progress, setProgress] = useState<ServerProgress | null>(null)

  useEffect(() => {
    if (status !== "signed-in") {
      setProgress(null)
      return
    }
    let live = true
    void syncProgress().then((data) => live && setProgress(data))
    return () => {
      live = false
    }
  }, [status])

  return { progress }
}

/**
 * Server record of a lesson played while signed in: `start` when it opens,
 * `complete` at the end. Signed out, both do nothing. Opening a lesson or
 * Course Mastery signed in also syncs, so what it awards builds on the
 * account's latest progress, the streak from other devices included.
 */
export const useLessonSession = (
  courseId: string,
  lessonId: string,
  enabled = true
) => {
  const { status } = useAccount()
  const [token, setToken] = useState<string | null>(null)
  const signedIn = status === "signed-in"
  const active = enabled && signedIn

  useEffect(() => {
    if (signedIn) void syncProgress()
  }, [signedIn])

  useEffect(() => {
    if (!active) return
    let live = true
    void requestJson<{ token: string }>("/api/courses/lessons/start", {
      courseId,
      lessonId,
    }).then(({ data }) => live && setToken(data?.token ?? null))
    return () => {
      live = false
    }
  }, [active, courseId, lessonId])

  const complete = (accuracy: number) => {
    if (!token) return
    void requestJson("/api/courses/lessons/complete", { token, accuracy })
    setToken(null)
  }

  /** A replay gets a fresh token */
  const restart = async () => {
    if (!active) return
    const { data } = await requestJson<{ token: string }>(
      "/api/courses/lessons/start",
      { courseId, lessonId }
    )
    setToken(data?.token ?? null)
  }

  return { complete, restart }
}

interface AccountHint {
  id: string
  name: string
}

const readAccountHint = () => {
  try {
    return window.localStorage.getItem(COURSE_ACCOUNT_USER_KEY)
  } catch {
    return null
  }
}
const noSubscribe = () => () => {}

/**
 * The account, plus who was signed in here last while the session check is
 * still out, so account UI shows the learner at once instead of a stand-in
 */
export const useCourseAccount = () => {
  const { status, user } = useAccount()
  const raw = useSyncExternalStore(noSubscribe, readAccountHint, () => null)
  const hint = useMemo(() => {
    try {
      return raw ? (JSON.parse(raw) as AccountHint) : null
    } catch {
      return null
    }
  }, [raw])

  useEffect(() => {
    if (status === "signed-in" && user)
      window.localStorage.setItem(
        COURSE_ACCOUNT_USER_KEY,
        JSON.stringify({ id: user.id, name: user.name } satisfies AccountHint)
      )
    // A session that ended drops the whole hint, so later loads don't show a stand-in chip
    else if (status === "signed-out") clearAccountHint()
    else if (status === "unavailable")
      window.localStorage.removeItem(COURSE_ACCOUNT_USER_KEY)
  }, [status, user])

  const shown: AccountHint | null =
    status === "signed-in" && user
      ? { id: user.id, name: user.name }
      : status === "loading"
        ? hint
        : null
  return { status, user: shown }
}
