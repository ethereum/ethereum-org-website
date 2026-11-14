"use client"

import { useEffect } from "react"

import { IS_PROD } from "@/lib/utils/env"

import { listenForInstallPrompt } from "./install-prompt"

/**
 * Service worker for offline lessons (skipped in dev so it can't cache HMR),
 * plus the install-prompt capture for `InstallAppNotice`
 */
const CourseAppRegistration = ({ scope }: { scope: string }) => {
  useEffect(() => {
    if (!IS_PROD || !("serviceWorker" in navigator)) return
    navigator.serviceWorker.register("/courses-sw.js", { scope }).catch(() => {
      // Offline support is a bonus; the lessons work without it
    })
  }, [scope])

  // Lives in the layout so a prompt fired on any course page reaches the hub notice
  useEffect(() => listenForInstallPrompt(), [])

  return null
}

export default CourseAppRegistration
