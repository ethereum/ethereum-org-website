import i18n, { Resource } from "i18next"
import { initReactI18next } from "gatsby-plugin-react-i18next"

export const baseLocales = {
  en: { title: "English", left: "En" },
  zh: { title: "中国人", left: "Zh" },
  ru: { title: "Русский", left: "Ru" },
  uk: { title: "українська", left: "Uk" },
}

// Only i18n files named in this array are being exposed to Storybook. Add filenames as necessary.
const ns = ["common", "page-about", "page-upgrades", "page-developers-index"]
const supportedLngs = Object.keys(baseLocales)

/**
 * Taking the ns array and combining all the ids
 * under a single ns per language, set to the default of "translation"
 */
const resources: Resource = ns.reduce((acc, n) => {
  supportedLngs.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {}
    acc[lng] = {
      translation: {
        ...acc[lng].translation,
        ...require(`../src/intl/${lng}/${n}.json`),
      },
    }
  })
  return acc
}, {})

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  supportedLngs,
  resources,
})

export default i18n
