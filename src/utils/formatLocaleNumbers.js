// Overwrites the default Persian numbering of the Farsi language to use Hindu-Arabic numerals (0-9)
// Context: https://github.com/ethereum/ethereum-org-website/pull/5490#pullrequestreview-892596553
export const formatLocaleNumbers = (locale) => {
  if (locale === "fa") {
    return "en"
  }

  return intl.locale
}
