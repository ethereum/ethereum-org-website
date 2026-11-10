"use client"

import { useEffect } from "react"

import { IS_PROD } from "@/lib/utils/env"

/** Service worker for offline lessons; skipped in dev so it can't cache HMR */
const CourseAppRegistration = ({ scope }: { scope: string }) => {
  useEffect(() => {
    if (!IS_PROD || !("serviceWorker" in navigator)) return
    navigator.serviceWorker.register("/courses-sw.js", { scope }).catch(() => {
      // Offline support is a bonus; the lessons work without it
    })
  }, [scope])

  return null
}

export default CourseAppRegistration
