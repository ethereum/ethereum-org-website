export const getLanguageCodeName = (languageCode: string, locale: string) => {
  return new Intl.DisplayNames([locale], {
    type: "language",
  }).of(languageCode) as string
}
