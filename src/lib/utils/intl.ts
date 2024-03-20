import { capitalize } from "./string"

export const getLanguageCodeName = (languageCode: string, locale: string) => {
  return capitalize(
    new Intl.DisplayNames([locale], {
      type: "language",
    }).of(languageCode) as string
  )
}
