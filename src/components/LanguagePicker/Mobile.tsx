"use client"

import { useParams } from "next/navigation"

import type { LocaleDisplayInfo } from "@/lib/types"

import LanguagePickerBody from "./LanguagePickerBody"
import { useLanguagePicker } from "./useLanguagePicker"

import { usePathname, useRouter } from "@/i18n/routing"

type MobileLanguagePickerProps = {
  languages: LocaleDisplayInfo[]
}

const MobileLanguagePicker = ({ languages }: MobileLanguagePickerProps) => {
  const pathname = usePathname()
  const { push } = useRouter()
  const params = useParams()
  const {
    disclosure,
    languages: sortedLanguages,
    intlLanguagePreference,
  } = useLanguagePicker(languages)
  const { onClose } = disclosure

  const handleMenuItemSelect = (currentValue: string) => {
    push(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      {
        locale: currentValue,
      }
    )
  }

  const handleNoResultsClose = () =>
    onClose({
      eventAction: "Translation program link (no results)",
      eventName: "/contributing/translation-program",
    })

  const handleTranslationProgramClick = () =>
    onClose({
      eventAction: "Translation program link (menu footer)",
      eventName: "/contributing/translation-program",
    })

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto">
        <LanguagePickerBody
          languages={sortedLanguages}
          onSelect={handleMenuItemSelect}
          onNoResultsClose={handleNoResultsClose}
          intlLanguagePreference={intlLanguagePreference}
          onTranslationProgramClick={handleTranslationProgramClick}
        />
      </div>
    </div>
  )
}

MobileLanguagePicker.displayName = "MobileLanguagePicker"

export default MobileLanguagePicker
