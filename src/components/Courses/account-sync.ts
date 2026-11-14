"use client"

import { useEffect, useState } from "react"

import { requestJson } from "@/components/Account/api"
import { useAccount } from "@/components/Account/use-account"

import { lessonProgressKey } from "@/data/courses"

import {
  COURSE_ACCOUNT_KEY,
  COURSE_PROGRESS_KEY,
  flagProgress,
  readStoredProgress,
} from "./progress-storage"
import type { CourseProgress } from "./useCourseProgress"

import {
  EMPTY_PROGRESS,
  hasAnyProgress,
  mergeProgress,
  type ProgressState,
} from "@/lib/courses/progress"

export interface ServerProgress {
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
  showOnLeaderboard: boolean
}

const writeLocal = (progress: CourseProgress | null) => {
  if (progress)
    window.localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(progress))
  else window.localStorage.removeItem(COURSE_PROGRESS_KEY)
  window.dispatchEvent(new Event("local-storage"))
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

/** The account this page synced with; uploads only happen while it's set */
let syncedAccount: string | null = null
let syncing: Promise<ServerProgress | null> | null = null

const upload = (progress: CourseProgress) => {
  const state = { ...progress }
  delete state.account
  return requestJson("/api/courses/progress/import", state)
}

/**
 * Account progress down, browser progress up. This browser's progress joins
 * the account unless it belongs to another account, which it then replaces.
 * Once per page load unless `force`d, e.g. right after signing in.
 */
export const syncProgress = (force = false) => {
  if (syncing && !force) return syncing
  syncing = (async () => {
    const { data, status } = await requestJson<ServerProgress>(
      "/api/courses/progress"
    )
    // Signed out (the session ended) or no accounts here: forget the hint
    if (status === 401 || status === 404)
      window.localStorage.removeItem(COURSE_ACCOUNT_KEY)
    if (!data) return null
    const stored = readStoredProgress()
    // Another account's progress (its session ended here) isn't this one's
    const local =
      stored?.account && stored.account !== data.account ? null : stored
    const merged: CourseProgress = {
      ...mergeProgress(
        mergeProgress(local ?? EMPTY_PROGRESS, data.state ?? EMPTY_PROGRESS),
        fromRecords(data)
      ),
      account: data.account,
    }
    writeLocal(merged)
    window.localStorage.setItem(COURSE_ACCOUNT_KEY, "1")
    syncedAccount = data.account
    await upload(merged)
    return data
  })()
  return syncing
}

/**
 * After a lesson or exam while signed in: save the new progress to the
 * account right away, so closing the tab can't lose a streak day
 */
export const queueProgressUpload = () => {
  // A page that hasn't synced yet (a lesson) does it now, upload included
  if (!syncedAccount) {
    if (window.localStorage.getItem(COURSE_ACCOUNT_KEY)) void syncProgress(true)
    return
  }
  const progress = readStoredProgress()
  if (progress?.account === syncedAccount) void upload(progress)
}

/**
 * Signing out: the progress here is the account's, so it leaves with it.
 * Deleting the account keeps it as this browser's own progress instead.
 */
export const releaseAccountProgress = (keep: boolean) => {
  syncedAccount = null
  syncing = null
  window.localStorage.removeItem(COURSE_ACCOUNT_KEY)
  const progress = readStoredProgress()
  if (!keep || !progress) return writeLocal(null)
  delete progress.account
  writeLocal(progress)
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
 * `complete` at the end. Signed out, both do nothing.
 */
export const useLessonSession = (
  courseId: string,
  lessonId: string,
  enabled = true
) => {
  const { status } = useAccount()
  const [token, setToken] = useState<string | null>(null)
  const active = enabled && status === "signed-in"

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
