"use client"

import { useEffect, useRef } from "react"

import type { LocaleDisplayInfo } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import LanguagePickerMenu from "./LanguagePickerMenu"
import { useLanguagePicker } from "./useLanguagePicker"

import { getPathname, usePathname } from "@/i18n/navigation"

type LanguagePickerProps = {
  className?: string
  languages: LocaleDisplayInfo[]
  onSelect?: (value: string) => void
}

const LanguagePicker = ({
  languages,
  className,
  onSelect,
}: LanguagePickerProps) => {
  const pathname = usePathname()
  const { languages: sortedLanguages } = useLanguagePicker(languages)
  const noResultsQuery = useRef("")

  useEffect(() => {
    trackCustomEvent({
      eventCategory: `Language picker`,
      eventAction: "Open or close language picker",
      eventName: "Opened",
    })

    return () => {
      trackCustomEvent({
        eventCategory: `Language picker`,
        eventAction: "Open or close language picker",
        eventName: "Closed",
      })

      // One event per session: the last filter query that matched nothing
      const query = noResultsQuery.current.trim().toLowerCase().slice(0, 32)
      if (query) {
        trackCustomEvent({
          eventCategory: `Language picker`,
          eventAction: "No results query",
          eventName: query,
        })
      }
    }
  }, [])

  const handleMenuItemSelect = (currentValue: string) => {
    onSelect?.(currentValue)

    trackCustomEvent({
      eventCategory: `Language picker`,
      eventAction: "Locale chosen",
      eventName: currentValue,
    })

    // Hard navigation, not a soft push: a soft nav to an intercepting `@modal`
    // route (e.g. the tool-detail page) would re-open the modal instead of
    // switching locale — a known Next.js intercepting-routes limitation.
    const href = getPathname({ href: pathname, locale: currentValue })
    window.location.href = `${href}${window.location.search}${window.location.hash}`
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <LanguagePickerMenu
        className="min-h-0 flex-1 gap-2 overflow-y-auto p-4"
        languages={sortedLanguages}
        onSelect={handleMenuItemSelect}
        onNoResults={(query) => {
          noResultsQuery.current = query
        }}
      />
    </div>
  )
}

export default LanguagePicker
