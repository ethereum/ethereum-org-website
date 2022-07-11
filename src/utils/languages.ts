export type Lang =
  | "en"
  | "ar"
  | "az"
  | "bg"
  | "bn"
  | "ca"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "es"
  | "fa"
  | "fi"
  | "fr"
  | "gl"
  | "hi"
  | "hr"
  | "hu"
  | "id"
  | "ig"
  | "it"
  | "ja"
  | "ka"
  | "kk"
  | "ko"
  | "lt"
  | "ml"
  | "mr"
  | "ms"
  | "nl"
  | "nb"
  | "ph"
  | "pl"
  | "pt"
  | "pt-br"
  | "ro"
  | "ru"
  | "se"
  | "sk"
  | "sl"
  | "sr"
  | "sw"
  | "th"
  | "tr"
  | "uk"
  | "vi"
  | "zh"
  | "zh-tw"

export type Languages = {
  [lang in Lang]: { language: string }
}

export const defaultLanguage: Lang = "en"

const languages: Languages = {
  en: {
    language: "English",
  },
  ar: {
    language: "العربية",
  },
  az: {
    language: "Azərbaycan",
  },
  bg: {
    language: "български",
  },
  bn: {
    language: "বাংলা",
  },
  ca: {
    language: "Català",
  },
  cs: {
    language: "Čeština",
  },
  da: {
    language: "Dansk",
  },
  de: {
    language: "Deutsch",
  },
  el: {
    language: "Ελληνικά",
  },
  es: {
    language: "Español",
  },
  fa: {
    language: "فارسی",
  },
  fi: {
    language: "Suomi",
  },
  fr: {
    language: "Français",
  },
  gl: {
    language: "Galego",
  },
  hi: {
    language: "हिन्दी",
  },
  hr: {
    language: "Hrvatski",
  },
  hu: {
    language: "Magyar",
  },
  id: {
    language: "Bahasa Indonesia",
  },
  ig: {
    language: "Ibo",
  },
  it: {
    language: "Italiano",
  },
  ja: {
    language: "日本語",
  },
  ka: {
    language: "ქართული",
  },
  kk: {
    language: "қазақ",
  },
  ko: {
    language: "한국어",
  },
  lt: {
    language: "Lietuvis",
  },
  ml: {
    language: "മലയാളം",
  },
  mr: {
    language: "मराठी",
  },
  ms: {
    language: "Melayu",
  },
  nl: {
    language: "Nederlands",
  },
  nb: {
    language: "Norsk",
  },
  ph: {
    language: "Filipino",
  },
  pl: {
    language: "Polski",
  },
  pt: {
    language: "Português",
  },
  "pt-br": {
    language: "Português",
  },
  ro: {
    language: "Română",
  },
  ru: {
    language: "Pусский",
  },
  se: {
    language: "Svenska",
  },
  sk: {
    language: "Slovenský",
  },
  sl: {
    language: "Slovenščina",
  },
  sr: {
    language: "Српски",
  },
  sw: {
    language: "Kiswahili",
  },
  th: {
    language: "ภาษาไทย",
  },
  tr: {
    language: "Türkçe",
  },
  uk: {
    language: "Українська",
  },
  vi: {
    language: "Tiếng Việt",
  },
  zh: {
    language: "简体中文",
  },
  "zh-tw": {
    language: "繁體中文",
  },
}

const buildLangs = (process.env.GATSBY_BUILD_LANGS || "")
  .split(",")
  .filter(Boolean)

// will take the same shape as `languages`. Only thing we are doing
// here is filtering the desired langs to be built
export const languageMetadata = Object.fromEntries(
  Object.entries(languages).filter(([lang]) => {
    // BUILD_LANGS === empty means to build all the langs
    if (!buildLangs.length) {
      return true
    }

    return buildLangs.includes(lang)
  })
)

export const supportedLanguages = Object.keys(languageMetadata) as Array<Lang>

export const ignoreLanguages = (Object.keys(languages) as Array<Lang>).filter(
  (lang) => !supportedLanguages.includes(lang)
)

export const isLang = (lang: string): lang is Lang =>
  Object.keys(languages).includes(lang as Lang)

export default languages
