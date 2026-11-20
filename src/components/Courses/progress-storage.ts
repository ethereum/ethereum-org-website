import type { CourseProgress } from "./useCourseProgress"

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
