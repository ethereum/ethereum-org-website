import { capitalize } from "./string"

export const getLanguageCodeName = (languageCode: string, locale: string) => {
  return capitalize(
    new Intl.DisplayNames([locale], {
      type: "language",
    }).of(languageCode) as string
  )
}

export const getCountryCodeName = (countryCode: string, locale: string) => {
  return new Intl.DisplayNames([locale], {
    type: "region",
  }).of(countryCode) as string
}
