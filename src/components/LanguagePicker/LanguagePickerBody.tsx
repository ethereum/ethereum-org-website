import type { LocaleDisplayInfo } from "@/lib/types"

import LanguagePickerFooter from "./LanguagePickerFooter"
import LanguagePickerMenu from "./LanguagePickerMenu"

type LanguagePickerBodyProps = {
  languages: LocaleDisplayInfo[]
  onSelect: (value: string) => void
  onNoResultsClose: () => void
  intlLanguagePreference?: LocaleDisplayInfo
  onTranslationProgramClick: () => void
}

const LanguagePickerBody = ({
  languages,
  onSelect,
  onNoResultsClose,
  intlLanguagePreference,
  onTranslationProgramClick,
}: LanguagePickerBodyProps) => {
  return (
    <>
      <LanguagePickerMenu
        languages={languages}
        onSelect={onSelect}
        onClose={onNoResultsClose}
      />

      <LanguagePickerFooter
        intlLanguagePreference={intlLanguagePreference}
        onTranslationProgramClick={onTranslationProgramClick}
      />
    </>
  )
}

export default LanguagePickerBody
