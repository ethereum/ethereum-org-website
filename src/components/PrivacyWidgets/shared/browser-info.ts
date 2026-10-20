"use client"

import { useEffect, useState } from "react"

import { fnv1a } from "./random"

/**
 * What any website can read about the visitor's browser without asking.
 * Read locally for the privacy lesson and widgets and shown only to the
 * visitor: none of these values may be sent anywhere (no fetch, no beacon,
 * no analytics event).
 */
export type DeviceKind =
  | "iphone"
  | "ipad"
  | "android"
  | "mac"
  | "windows"
  | "chromebook"
  | "linux"
  | "unknown"

export interface BrowserInfo {
  /** IANA time zone name, e.g. "Europe/Lisbon"; null if unavailable */
  timeZone: string | null
  /** Minutes east of UTC (Lisbon summer = 60) */
  utcOffsetMinutes: number
  /** Last segment of the time zone, e.g. "Lisbon"; a rough location */
  city: string | null
  languages: string[]
  device: DeviceKind
  cores: number | null
  /** GB, as reported by navigator.deviceMemory (Chromium only) */
  memory: number | null
  screen: { width: number; height: number; pixelRatio: number } | null
  touch: boolean
  darkMode: boolean
  /** WebGL renderer string, or null when the browser hides it */
  gpu: string | null
  /** Number of browser wallets that answered (EIP-6963 + legacy injection) */
  walletCount: number
  /** Short display code from all of the above plus a canvas drawing */
  fingerprint: string
  userAgent: string
}

const detectDevice = (): DeviceKind => {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string; mobile?: boolean }
  }
  const ua = nav.userAgent
  const platform = nav.userAgentData?.platform ?? nav.platform ?? ""
  if (/iPhone/.test(ua)) return "iphone"
  // iPadOS reports as a Mac but has touch points
  if (/iPad/.test(ua) || (/Mac/.test(platform) && nav.maxTouchPoints > 1))
    return "ipad"
  if (/Android/i.test(ua) || /Android/i.test(platform)) return "android"
  if (/CrOS/.test(ua) || /Chrome OS/i.test(platform)) return "chromebook"
  if (/Mac/.test(platform) || /Macintosh/.test(ua)) return "mac"
  if (/Win/.test(platform) || /Windows/.test(ua)) return "windows"
  if (/Linux/.test(platform) || /Linux/.test(ua)) return "linux"
  return "unknown"
}

const readGpu = (): string | null => {
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null
    const ext = gl?.getExtension("WEBGL_debug_renderer_info")
    if (!gl || !ext) return null
    const raw = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? "")
    // "ANGLE (Apple, ANGLE Metal Renderer: Apple M2, Unspecified Version)"
    const angle = raw.match(/ANGLE \([^,]+, (?:ANGLE [^:]+: )?([^,]+)/)
    return (angle?.[1] ?? raw).trim() || null
  } catch {
    return null
  }
}

const canvasSignature = (): string => {
  try {
    const canvas = document.createElement("canvas")
    canvas.width = 220
    canvas.height = 40
    const ctx = canvas.getContext("2d")
    if (!ctx) return ""
    ctx.textBaseline = "top"
    ctx.font = "16px Arial"
    ctx.fillStyle = "#f60"
    ctx.fillRect(110, 1, 62, 20)
    ctx.fillStyle = "#069"
    ctx.fillText("Public by default 0x7a3f", 2, 15)
    ctx.arc(50, 20, 15, 0, Math.PI * 1.5)
    ctx.stroke()
    return canvas.toDataURL()
  } catch {
    return ""
  }
}

/** Counts wallets that announce themselves. Never reads their names. */
const countWallets = (waitMs = 450): Promise<number> =>
  new Promise((resolve) => {
    const ids = new Set<string>()
    const onAnnounce = (event: Event) => {
      const detail = (event as CustomEvent<{ info?: { uuid?: string } }>).detail
      ids.add(detail?.info?.uuid ?? `anon-${ids.size}`)
    }
    window.addEventListener("eip6963:announceProvider", onAnnounce)
    window.dispatchEvent(new Event("eip6963:requestProvider"))
    setTimeout(() => {
      window.removeEventListener("eip6963:announceProvider", onAnnounce)
      // Older wallets only inject window.ethereum; count it as one
      const legacy = "ethereum" in window && Boolean(window.ethereum) ? 1 : 0
      resolve(ids.size || legacy)
    }, waitMs)
  })

let cached: Promise<BrowserInfo> | null = null

export const collectBrowserInfo = (): Promise<BrowserInfo> => {
  if (cached) return cached
  cached = (async () => {
    // Reading the resolved zone (not formatting), so Intl is used directly
    const timeZone = (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || null
      } catch {
        return null
      }
    })()
    const city = timeZone?.includes("/")
      ? timeZone.split("/").pop()!.replace(/_/g, " ")
      : null
    const nav = navigator as Navigator & { deviceMemory?: number }
    const screenInfo =
      typeof screen !== "undefined"
        ? {
            width: screen.width,
            height: screen.height,
            pixelRatio: window.devicePixelRatio || 1,
          }
        : null
    const base = {
      timeZone,
      utcOffsetMinutes: -new Date().getTimezoneOffset(),
      city,
      languages: (nav.languages?.length ? [...nav.languages] : [nav.language])
        .filter(Boolean)
        .slice(0, 4),
      device: detectDevice(),
      cores: nav.hardwareConcurrency || null,
      memory: nav.deviceMemory ?? null,
      screen: screenInfo,
      touch: nav.maxTouchPoints > 0,
      darkMode: window.matchMedia?.("(prefers-color-scheme: dark)").matches,
      gpu: readGpu(),
      userAgent: nav.userAgent,
    }
    const walletCount = await countWallets()
    const hash = fnv1a(
      JSON.stringify({ ...base, walletCount }) + canvasSignature()
    )
      .toString(16)
      .padStart(8, "0")
    const fingerprint = `${hash.slice(0, 4)}-${hash.slice(4, 8)}-${fnv1a(hash)
      .toString(16)
      .padStart(8, "0")
      .slice(0, 4)}`
    return { ...base, walletCount, fingerprint }
  })()
  return cached
}

/** Browser details for client components; null until read (and on the server). */
export const useBrowserInfo = (enabled = true) => {
  const [info, setInfo] = useState<BrowserInfo | null>(null)
  useEffect(() => {
    if (!enabled) return
    let active = true
    collectBrowserInfo().then(
      (value) => active && setInfo(value),
      () => undefined
    )
    return () => {
      active = false
    }
  }, [enabled])
  return info
}
