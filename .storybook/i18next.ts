import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import { supportedLanguages } from "../src/utils/languages"

export const baseLocales = {
  en: { title: "English", left: "En" },
  zh: { title: "中国人", left: "Zh" },
  ru: { title: "Русский", left: "Ru" },
  uk: { title: "українська", left: "Uk" },
}

// Only i18 files named in this array are being exposed to Storybook. Add filenames as necessary.
const ns = ["common"]
const supportedLngs = [...Object.keys(baseLocales), ...supportedLanguages]
const resources = ns.reduce((acc, n) => {
  supportedLngs.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {}
    acc[lng] = {
      ...acc[lng],
      [n]: require(`../src/intl/${lng}/${n}.json`),
    }
  })
  return acc
}, {})

i18n.use(initReactI18next).init({
  //debug: true,
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  ns,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  supportedLngs,
  resources,
})

export default i18n
