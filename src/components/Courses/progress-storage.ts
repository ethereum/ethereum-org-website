/**
 * Where course progress is saved, shared by the client hook and server pages
 * (a "use client" module can't hand a plain value to a server component).
 */
export const COURSE_PROGRESS_KEY = "ethereum-org-course-progress"

/** Set on <html> before first paint when any progress is saved */
export const HAS_PROGRESS_ATTR = "data-has-course-progress"

/**
 * Keeps the flag in step with saves during a visit; the inline script only
 * runs on a full page load, not on client-side navigation.
 */
export const flagProgress = (hasProgress: boolean) =>
  document.documentElement.toggleAttribute(HAS_PROGRESS_ATTR, hasProgress)

/**
 * Inline, render-blocking check so server HTML can hide "no progress"
 * content before it paints. Mirrors `hasAnyProgress`.
 */
export const HAS_PROGRESS_SCRIPT = `try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(COURSE_PROGRESS_KEY)})||"null");if(p&&(Object.keys(p.lessons||{}).length||Object.keys(p.exams||{}).length))document.documentElement.setAttribute(${JSON.stringify(HAS_PROGRESS_ATTR)},"")}catch(e){}`
