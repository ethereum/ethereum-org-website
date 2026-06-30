"use client"

import { useEffect } from "react"

import type { LocaleDisplayInfo } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import LanguagePickerMenu from "./LanguagePickerMenu"
import { useLanguagePicker } from "./useLanguagePicker"

import { usePathname, useRouter } from "@/i18n/navigation"

type LanguagePickerProps = {
  className?: string
  languages: LocaleDisplayInfo[]
  onSelect?: (value: string) => void
  onNoResultsClose?: () => void
}

const LanguagePicker = ({
  languages,
  className,
  onSelect,
  onNoResultsClose,
}: LanguagePickerProps) => {
  const pathname = usePathname()
  const { push } = useRouter()
  const { languages: sortedLanguages } = useLanguagePicker(languages)

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
    }
  }, [])

  const handleMenuItemSelect = (currentValue: string) => {
    onSelect?.(currentValue)

    push(pathname, {
      locale: currentValue,
    })

    trackCustomEvent({
      eventCategory: `Language picker`,
      eventAction: "Locale chosen",
      eventName: currentValue,
    })
  }

  const handleNoResultsClose = () => {
    onNoResultsClose?.()

    trackCustomEvent({
      eventCategory: `Language picker`,
      eventAction: "Translation program link (no results)",
      eventName: "/contributing/translation-program",
    })
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <LanguagePickerMenu
        className="min-h-0 flex-1 gap-2 overflow-y-auto p-4"
        languages={sortedLanguages}
        onSelect={handleMenuItemSelect}
        onClose={handleNoResultsClose}
      />
    </div>
  )
}

export default LanguagePicker