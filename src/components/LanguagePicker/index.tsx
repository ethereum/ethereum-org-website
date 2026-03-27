"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"

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
  const params = useParams()
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

    push(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      {
        locale: currentValue,
      }
    )

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
