"use client"

import { useEffect } from "react"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useWalletFilters } from "./WalletFilterProvider"

// The wallet rows are pure server-rendered HTML (zero hydration). This
// controller is the only client logic touching them: it syncs row visibility
// with the filter state and delegates analytics for expand/link events.
const WalletListController = () => {
  const { visibleIds } = useWalletFilters()

  useEffect(() => {
    document
      .querySelectorAll<HTMLElement>(
        '[data-testid="wallet-list"] > [data-wallet-id]'
      )
      .forEach((row) => {
        row.classList.toggle("hidden", !visibleIds.has(row.dataset.walletId!))
      })
  }, [visibleIds])

  useEffect(() => {
    const list = document.querySelector('[data-testid="wallet-list"]')
    if (!list) return

    // Delegate analytics for the wallet links (main "visit website" button and
    // the row-covering detail link both carry data-matomo)
    const onClick = (e: Event) => {
      const link = (e.target as Element).closest<HTMLElement>("[data-matomo]")
      if (!link) return
      try {
        trackCustomEvent(JSON.parse(link.dataset.matomo!))
      } catch {
        // malformed data attribute — skip tracking
      }
    }

    list.addEventListener("click", onClick)
    return () => {
      list.removeEventListener("click", onClick)
    }
  }, [])

  return null
}

export default WalletListController
