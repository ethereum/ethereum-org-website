import type { CourseProgress } from "./useCourseProgress"

import { isNewerProgress } from "@/lib/courses/progress"

/**
 * Where course progress is saved, shared by the client hook and server pages
 * (a "use client" module can't hand a plain value to a server component).
 */
export const COURSE_PROGRESS_KEY = "ethereum-org-course-progress"

/** Set while this browser is signed in to an account, for the pre-paint check */
export const COURSE_ACCOUNT_KEY = "ethereum-org-course-account"

/** The signed-in learner's id and display name, so the hub hero can show
 * who's signed in before the session check answers */
export const COURSE_ACCOUNT_USER_KEY = "ethereum-org-course-account-user"

/** Set while this browser has progress its account hasn't saved yet */
export const COURSE_SYNC_PENDING_KEY = "ethereum-org-course-sync-pending"

/** Set on <html> before first paint while this browser is signed in */
export const HAS_ACCOUNT_ATTR = "data-course-account"

/** Set on <html> before first paint when there's a profile to show: saved
 * progress, or an account (which has a profile even before any lesson) */
export const HAS_PROGRESS_ATTR = "data-has-course-progress"

/**
 * Keeps the flag in step with saves during a visit; the inline script only
 * runs on a full page load, not on client-side navigation.
 */
export const flagProgress = (hasProgress: boolean) =>
  document.documentElement.toggleAttribute(HAS_PROGRESS_ATTR, hasProgress)

/** Forgets the signed-in hints, when the session ends or turns out gone */
export const clearAccountHint = () => {
  window.localStorage.removeItem(COURSE_ACCOUNT_KEY)
  window.localStorage.removeItem(COURSE_ACCOUNT_USER_KEY)
  document.documentElement.removeAttribute(HAS_ACCOUNT_ATTR)
}

/**
 * Inline, render-blocking check so server HTML can hide "no progress"
 * content before it paints. Mirrors `hasAnyProgress`, plus the account flag,
 * which also sets the signed-in flag.
 */
export const HAS_PROGRESS_SCRIPT = `try{var d=document.documentElement,a=localStorage.getItem(${JSON.stringify(COURSE_ACCOUNT_KEY)}),p=JSON.parse(localStorage.getItem(${JSON.stringify(COURSE_PROGRESS_KEY)})||"null");if(a)d.setAttribute(${JSON.stringify(HAS_ACCOUNT_ATTR)},"");if(a||p&&(Object.keys(p.lessons||{}).length||Object.keys(p.exams||{}).length))d.setAttribute(${JSON.stringify(HAS_PROGRESS_ATTR)},"")}catch(e){}`

// Parsed once and shared: every progress hook on a page reads this copy,
// replaced on each save here and on each change from another tab
let stored: CourseProgress | null | undefined
let storedJson: string | null = null
// Progress in a newer format (a later release, in another tab or on the
// account) was found: this page stops saving until it's reloaded
let outdated = false
const listeners = new Set<() => void>()

const notify = () => listeners.forEach((listener) => listener())

if (typeof window !== "undefined")
  window.addEventListener("storage", ({ key }) => {
    if (key !== null && key !== COURSE_PROGRESS_KEY) return
    stored = undefined
    notify()
  })

/** Saved progress (the same object until it changes: never mutate it) */
export const readStoredProgress = (): CourseProgress | null => {
  if (stored !== undefined) return stored
  try {
    storedJson = window.localStorage.getItem(COURSE_PROGRESS_KEY)
    const parsed: unknown = storedJson ? JSON.parse(storedJson) : null
    if (isNewerProgress(parsed)) {
      outdated = true
      stored = null
    } else stored = parsed as CourseProgress | null
  } catch {
    stored = null
  }
  return stored
}

/** True once newer progress turned up: nothing here saves any more */
export const isProgressOutdated = () => {
  readStoredProgress()
  return outdated
}

/** The account holds progress in a newer format than this page knows */
export const markProgressOutdated = () => {
  if (outdated) return
  outdated = true
  notify()
}

/**
 * Saves progress (`null` clears it) and tells every reader on the page. The
 * same progress again (a sync that brought nothing new) re-renders nothing.
 */
export const writeStoredProgress = (progress: CourseProgress | null) => {
  const json = progress && JSON.stringify(progress)
  if (isProgressOutdated() || (stored !== undefined && json === storedJson))
    return
  try {
    if (json) window.localStorage.setItem(COURSE_PROGRESS_KEY, json)
    else window.localStorage.removeItem(COURSE_PROGRESS_KEY)
  } catch {
    // Storage full or blocked: this visit still shows it, and a signed-in
    // learner's account still gets it
  }
  stored = progress
  storedJson = json
  notify()
}

export const subscribeStoredProgress = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
