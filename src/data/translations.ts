export type Lang =
  | "en"
  | "ar"
  | "az"
  | "bg"
  | "bn"
  | "ca"
  | "cs"
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
  | "ko"
  | "lt"
  | "ml"
  | "mr"
  | "ms"
  | "nl"
  | "nb"
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

export type Translations = {
  [lang in Lang]: { language: string }
}

const translations: Translations = {
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

export default translations
