import { useTranslation } from "next-i18next"

import { TranslationKey } from "@/lib/types"

import { languages } from "@/lib/utils/translations"

// Get a list of lang codes with their translated names as values
export const useLanguagesList = () => {
  const { t } = useTranslation("page-languages")
  const languagesList: {}[] = []

  for (const lang in languages) {
    const langMetadata = {
      ...languages[lang],
      name: t(`language-${lang}` as TranslationKey),
    }

    const nativeLangTitle = langMetadata.name
    languagesList.push({ [lang]: nativeLangTitle })
  }

  return languagesList
}
