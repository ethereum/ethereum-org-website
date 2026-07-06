"use client"

import { useEffect, useRef } from "react"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useWalletFilters } from "./WalletFilterProvider"

// The wallet rows are pure server-rendered HTML (zero hydration). This
// controller is the only client logic touching them: it syncs row visibility
// with the filter state and delegates analytics for expand/link events.
const WalletListController = () => {
  const { visibleIds } = useWalletFilters()
  const expandedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    document
      .querySelectorAll<HTMLElement>('[data-testid="wallet-list"] > details')
      .forEach((row) => {
        row.classList.toggle("hidden", !visibleIds.has(row.dataset.walletId!))
      })
  }, [visibleIds])

  useEffect(() => {
    const list = document.querySelector('[data-testid="wallet-list"]')
    if (!list) return

    // `toggle` doesn't bubble; capture phase still passes through ancestors
    const onToggle = (e: Event) => {
      const details = e.target as HTMLDetailsElement
      const id = details.dataset?.walletId
      if (!details.open || !id || expandedRef.current.has(id)) return
      expandedRef.current.add(id)
      trackCustomEvent({
        eventCategory: "find-wallet",
        eventAction: "expanded",
        eventName: id,
      })
    }

    const onClick = (e: Event) => {
      const link = (e.target as Element).closest<HTMLElement>("[data-matomo]")
      if (!link) return
      try {
        trackCustomEvent(JSON.parse(link.dataset.matomo!))
      } catch {
        // malformed data attribute — skip tracking
      }
    }

    list.addEventListener("toggle", onToggle, true)
    list.addEventListener("click", onClick)
    return () => {
      list.removeEventListener("toggle", onToggle, true)
      list.removeEventListener("click", onClick)
    }
  }, [])

  return null
}

export default WalletListController
