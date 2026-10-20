"use client"

import { useEffect, useState } from "react"

import { buildChainData, type ChainData } from "./data"

export interface ChainContext {
  data: ChainData
  now: number
  utcOffsetMinutes: number
  /** IANA name as the browser reports it, or null */
  timeZone: string | null
}

// Built once per visit so the explorer and the clock agree to the minute
let cached: ChainContext | null = null

const build = (): ChainContext => {
  if (cached) return cached
  const now = Date.now()
  const utcOffsetMinutes = -new Date(now).getTimezoneOffset()
  let timeZone: string | null = null
  try {
    // Reading the resolved zone name, not formatting
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || null
  } catch {
    timeZone = null
  }
  cached = {
    data: buildChainData(now, utcOffsetMinutes),
    now,
    utcOffsetMinutes,
    timeZone,
  }
  return cached
}

/**
 * The chapter's sample data, built in the browser from the reader's clock and
 * time zone (never sent anywhere). Null on the server and the first render.
 */
export const useChainData = () => {
  const [context, setContext] = useState<ChainContext | null>(null)
  useEffect(() => setContext(build()), [])
  return context
}
