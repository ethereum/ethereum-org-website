"use client"

import { useEffect, useState } from "react"

import { requestJson } from "@/components/Account/api"
import { useAccount } from "@/components/Account/use-account"

import { lessonProgressKey } from "@/data/courses"

import { COURSE_PROGRESS_KEY, flagProgress } from "./progress-storage"
import { type CourseProgress, readStoredProgress } from "./useCourseProgress"

import { XP_EXAM_PASS, XP_LESSON } from "@/lib/courses/rules"

export interface ServerProgress {
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

const EMPTY: CourseProgress = {
  version: 1,
  xp: 0,
  streak: { count: 0, lastDay: null },
  lessons: {},
}

/**
 * Adds what the account holds and this browser doesn't (another device's
 * progress) to local progress, with its XP, and tells every
 * `useCourseProgress` on the page.
 */
const mergeIntoLocal = (server: ServerProgress) => {
  const local = readStoredProgress() ?? EMPTY
  let xp = local.xp
  const lessons = { ...local.lessons }
  for (const { courseId, lessonId, accuracy, completedAt } of server.lessons) {
    const key = lessonProgressKey(courseId, lessonId)
    if (lessons[key]) continue
    lessons[key] = { completedAt, accuracy }
    xp += XP_LESSON
  }
  const exams = { ...local.exams }
  for (const { courseId, score, passedAt } of server.masteries) {
    if (exams[courseId]?.passedAt) continue
    exams[courseId] = {
      best: Math.max(score, exams[courseId]?.best ?? 0),
      passedAt,
    }
    xp += XP_EXAM_PASS
  }
  if (xp === local.xp) return
  window.localStorage.setItem(
    COURSE_PROGRESS_KEY,
    JSON.stringify({ ...local, xp, lessons, exams })
  )
  window.dispatchEvent(new Event("local-storage"))
  flagProgress(true)
}

let syncing: Promise<ServerProgress | null> | null = null

/**
 * Browser progress up (unverified), account progress down. Once per page
 * load unless `force`d, e.g. right after signing in.
 */
export const syncProgress = (force = false) => {
  if (syncing && !force) return syncing
  syncing = (async () => {
    const local = readStoredProgress()
    if (local)
      await requestJson("/api/courses/progress/import", {
        lessons: local.lessons,
        exams: local.exams ?? {},
      })
    const { data } = await requestJson<ServerProgress>("/api/courses/progress")
    if (data) mergeIntoLocal(data)
    return data
  })()
  return syncing
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

  const refresh = async () => setProgress(await syncProgress(true))
  return { progress, refresh }
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
