/*
 * Home-screen install for the courses app. Chromium fires `beforeinstallprompt`
 * once per page load, possibly before the hub notice mounts, so the layout-level
 * registration captures it here and the notice reads it back. iOS has no
 * prompt API; the notice shows Share > Add to Home Screen instead.
 */

/** Not in lib.dom yet */
export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export type InstallPlatform = "ios" | "android"

const DISMISSED_KEY = "ethereum-org-course-install-dismissed"

export const isInstallDismissed = () => {
  try {
    return window.localStorage.getItem(DISMISSED_KEY) !== null
  } catch {
    return false
  }
}

export const dismissInstall = () => {
  try {
    window.localStorage.setItem(DISMISSED_KEY, "1")
  } catch {
    // Private mode or storage off: the notice just comes back next visit
  }
}

/** Mobile platform worth offering the install to; null on desktop or inside the installed app */
export const installPlatform = (): InstallPlatform | null => {
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  if (standalone) return null
  const ua = navigator.userAgent
  // iPadOS Safari reports itself as a Mac; touch points give it away
  if (
    /iPhone|iPad|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  )
    return "ios"
  if (/Android/.test(ua)) return "android"
  return null
}

let deferred: BeforeInstallPromptEvent | null = null
const listeners = new Set<() => void>()
const setDeferred = (event: BeforeInstallPromptEvent | null) => {
  deferred = event
  listeners.forEach((listener) => listener())
}

/** For `useSyncExternalStore` */
export const subscribeInstallPrompt = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
export const getInstallPrompt = () => deferred
export const getServerInstallPrompt = () => null

/** Single use: the browser rejects a second `prompt()` on the same event */
export const takeInstallPrompt = () => {
  const event = deferred
  setDeferred(null)
  return event
}

/**
 * Holds the prompt for the hub notice. Only suppresses Chrome's own mini-infobar
 * when the notice will offer it instead (Android, not dismissed).
 */
export const listenForInstallPrompt = () => {
  const onPrompt = (event: Event) => {
    if (installPlatform() !== "android" || isInstallDismissed()) return
    event.preventDefault()
    setDeferred(event as BeforeInstallPromptEvent)
  }
  const onInstalled = () => setDeferred(null)
  window.addEventListener("beforeinstallprompt", onPrompt)
  window.addEventListener("appinstalled", onInstalled)
  return () => {
    window.removeEventListener("beforeinstallprompt", onPrompt)
    window.removeEventListener("appinstalled", onInstalled)
  }
}
