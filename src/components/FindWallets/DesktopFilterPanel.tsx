"use client"

import { useEffect, useState } from "react"

import { screens } from "@/lib/utils/screen"

import FilterPanel from "./FilterPanel"
import type {
  FindWalletsStrings,
  WalletFilterGroupConfig,
  WalletLanguageOption,
  WalletNetworkOption,
} from "./types"

// The desktop sidebar is display:none below `lg`, yet React would still hydrate
// its ~30 switches + two comboboxes there — the single largest client island on
// this page. Gate its mount on a matched `lg` viewport so it never hydrates on
// mobile (which uses MobileFilterSheet instead), keeping the initial hydration
// task small so early taps stay responsive. Rendering starts as null on the
// server and the first client render (no hydration mismatch), then mounts after
// the viewport is measured. The wrapping `lg:w-80` div in index.tsx reserves the
// sidebar width so this deferred mount causes no layout shift.
const DesktopFilterPanel = (props: {
  groups: WalletFilterGroupConfig[]
  languages: WalletLanguageOption[]
  networks: WalletNetworkOption[]
  strings: FindWalletsStrings
}) => {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${screens.lg})`)
    const update = () => setIsDesktop(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  if (!isDesktop) return null

  return <FilterPanel {...props} />
}

export default DesktopFilterPanel
