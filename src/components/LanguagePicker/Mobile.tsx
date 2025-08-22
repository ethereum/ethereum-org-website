"use client"

import { useParams } from "next/navigation"

import type { LocaleDisplayInfo } from "@/lib/types"

import { useMobileMenu } from "../Nav/Mobile/MenuSwitcher"

import LanguagePickerFooter from "./LanguagePickerFooter"
import LanguagePickerMenu from "./LanguagePickerMenu"
import { useLanguagePicker } from "./useLanguagePicker"

import { usePathname, useRouter } from "@/i18n/routing"

type MobileLanguagePickerProps = {
  languages: LocaleDisplayInfo[]
}

const MobileLanguagePicker = ({ languages }: MobileLanguagePickerProps) => {
  const { setCurrentView } = useMobileMenu()
  const pathname = usePathname()
  const { push } = useRouter()
  const params = useParams()
  const { languages: sortedLanguages, intlLanguagePreference } =
    useLanguagePicker(languages)

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
    // Close the sheet by going back to menu view
    setCurrentView("menu")
  }

  const handleNoResultsClose = () => {
    // Navigate to translation program or handle as needed
  }

  const handleTranslationProgramClick = () => {
    // Navigate to translation program
  }

  return (
    <div className="flex h-full flex-col">
      {/* Language picker menu */}
      <div className="flex-1 overflow-auto">
        <LanguagePickerMenu
          languages={sortedLanguages}
          onSelect={handleMenuItemSelect}
          onClose={handleNoResultsClose}
        />
      </div>

      {/* Footer */}
      <LanguagePickerFooter
        intlLanguagePreference={intlLanguagePreference}
        onTranslationProgramClick={handleTranslationProgramClick}
      />
    </div>
  )
}

MobileLanguagePicker.displayName = "MobileLanguagePicker"

export default MobileLanguagePicker
