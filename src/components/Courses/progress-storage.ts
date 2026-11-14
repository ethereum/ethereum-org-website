import type { CourseProgress } from "./useCourseProgress"

/**
 * Where course progress is saved, shared by the client hook and server pages
 * (a "use client" module can't hand a plain value to a server component).
 */
export const COURSE_PROGRESS_KEY = "ethereum-org-course-progress"

/** Set while this browser is signed in to an account, for the pre-paint check */
export const COURSE_ACCOUNT_KEY = "ethereum-org-course-account"

/** Set on <html> before first paint when there's a profile to show: saved
 * progress, or an account (which has a profile even before any lesson) */
export const HAS_PROGRESS_ATTR = "data-has-course-progress"

/**
 * Keeps the flag in step with saves during a visit; the inline script only
 * runs on a full page load, not on client-side navigation.
 */
export const flagProgress = (hasProgress: boolean) =>
  document.documentElement.toggleAttribute(HAS_PROGRESS_ATTR, hasProgress)

/**
 * Inline, render-blocking check so server HTML can hide "no progress"
 * content before it paints. Mirrors `hasAnyProgress`, plus the account flag.
 */
export const HAS_PROGRESS_SCRIPT = `try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(COURSE_PROGRESS_KEY)})||"null");if(localStorage.getItem(${JSON.stringify(COURSE_ACCOUNT_KEY)})||p&&(Object.keys(p.lessons||{}).length||Object.keys(p.exams||{}).length))document.documentElement.setAttribute(${JSON.stringify(HAS_PROGRESS_ATTR)},"")}catch(e){}`

/**
 * Saved progress, read straight from storage. `useCourseProgress` only has
 * it after its first effect, so a decision made on mount reads this instead.
 */
export const readStoredProgress = (): CourseProgress | null => {
  try {
    const item = window.localStorage.getItem(COURSE_PROGRESS_KEY)
    return item ? (JSON.parse(item) as CourseProgress) : null
  } catch {
    return null
  }
}
