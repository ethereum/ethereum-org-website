import i18n, { Resource } from "i18next"
import { initReactI18next } from "react-i18next"

export const baseLocales = {
  en: { title: "English", left: "En" },
  zh: { title: "中国人", left: "Zh" },
  ru: { title: "Русский", left: "Ru" },
  uk: { title: "українська", left: "Uk" },
  fa: { title: "فارسی", left: "Fa" },
}

// Only i18n files named in this array are being exposed to Storybook. Add filenames as necessary.
export const ns = [
  "common",
  "glossary",
  "glossary-tooltip",
  "learn-quizzes",
  "page-about",
  "page-index",
  "page-learn",
  "page-upgrades",
  "page-developers-index",
  "page-what-is-ethereum",
] as const
const supportedLngs = Object.keys(baseLocales)

/**
 * Taking the ns array and generating those files for each language available.
 */
const resources: Resource = ns.reduce((acc, n) => {
  supportedLngs.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {}

    try {
      acc[lng] = {
        ...acc[lng],
        [n]: {
          ...acc[lng][n],
          ...require(`../../src/intl/${lng}/${n}.json`),
        },
      }
    } catch {
      acc[lng] = {
        ...acc[lng],
        [n]: {
          ...acc[lng][n],
          ...require(`../../src/intl/en/${n}.json`),
        },
      }
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
  defaultNS: "common",
})

export default i18n
