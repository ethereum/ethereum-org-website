"use client"

import { useEffect } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"

import type { LocaleDisplayInfo } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import LanguagePickerFooter from "./LanguagePickerFooter"
import LanguagePickerMenu from "./LanguagePickerMenu"
import { useLanguagePicker } from "./useLanguagePicker"

type LanguagePickerProps = {
  className?: string
  languages: LocaleDisplayInfo[]
  onSelect?: (value: string) => void
  onNoResultsClose?: () => void
  onTranslationProgramClick?: () => void
}

const LanguagePicker = ({
  languages,
  className,
  onSelect,
  onNoResultsClose,
  onTranslationProgramClick,
}: LanguagePickerProps) => {
  const pathname = usePathname()
  const { push } = useRouter()
  const params = useParams()
  const { languages: sortedLanguages, intlLanguagePreference } =
    useLanguagePicker(languages)

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

  const handleTranslationProgramClick = () => {
    onTranslationProgramClick?.()

    trackCustomEvent({
      eventCategory: `Language picker`,
      eventAction: "Translation program link (menu footer)",
      eventName: "/contributing/translation-program",
    })
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <LanguagePickerMenu
        className="flex-1 gap-2 overflow-y-auto p-4"
        languages={sortedLanguages}
        onSelect={handleMenuItemSelect}
        onClose={handleNoResultsClose}
      />

      <LanguagePickerFooter
        intlLanguagePreference={intlLanguagePreference}
        onTranslationProgramClick={handleTranslationProgramClick}
      />
    </div>
  )
}

export default LanguagePicker
