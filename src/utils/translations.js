// TODO how  to move phrases into respective JSON files?
// Should we translate every language into every other language?
const languageMetadata = {
  en: {
    version: 1.2,
    language: "English",
    "language-english": "English",
  },
  ar: {
    version: 1.1,
    language: "العربية",
    "language-english": "Arabic",
  },
  bn: {
    version: 1.1,
    language: "বাংলা",
    "language-english": "Bengali",
  },
  cs: {
    version: 1.0,
    language: "čeština",
    "language-english": "Czech",
  },
  de: {
    version: 1.1,
    language: "Deutsch",
    "language-english": "German",
  },
  el: {
    version: 1.0,
    language: "Ελληνικά",
    "language-english": "Greek",
  },
  es: {
    version: 1.0,
    language: "Español",
    "language-english": "Spanish",
  },
  fa: {
    version: 1.0,
    language: "فارسی",
    "language-english": "Farsi",
  },
  fr: {
    version: 1.1,
    language: "Français",
    "language-english": "French",
  },
  id: {
    version: 1.1,
    language: "Bahasa Indonesia",
    "language-english": "Indonesian",
  },
  ig: {
    version: 1.0,
    language: "Ibo",
    "language-english": "Igbo",
  },
  it: {
    version: 1.0,
    language: "Italiano",
    "language-english": "Italian",
  },
  ja: {
    version: 1.0,
    language: "日本語",
    "language-english": "Japanese",
  },
  ko: {
    version: 1.0,
    language: "한국어",
    "language-english": "Korean",
  },
  nl: {
    version: 1.0,
    language: "Nederlands",
    "language-english": "Dutch",
  },
  pl: {
    version: 1.0,
    language: "Polski",
    "language-english": "Polish",
  },
  "pt-br": {
    version: 1.0,
    language: "Português",
    "language-english": "Portuguese (Brazilian)",
  },
  ru: {
    version: 1.0,
    language: "Pусский",
    "language-english": "Russian",
  },
  sk: {
    version: 1.1,
    language: "Slovenský",
    "language-english": "Slovak",
  },
  sl: {
    version: 1.0,
    language: "Slovenija",
    "language-english": "Slovenian",
  },
  ro: {
    version: 1.1,
    language: "Română",
    "language-english": "Romanian",
  },
  se: {
    version: 1.1,
    language: "Svenska",
    "language-english": "Swedish",
  },
  tr: {
    version: 1.1,
    language: "Türk",
    "language-english": "Turkish",
  },
  zh: {
    version: 1.1,
    language: "简体中文",
    "language-english": "Chinese Simplified",
  },
}

// Returns language content version for conditional rendering of content
export const getLangVersion = (lang) => {
  const metadata = languageMetadata[lang]
  if (!metadata) {
    console.error(`No metadata found for language: ${lang}`)
    return
  }
  const version = metadata.version
  if (!version) {
    console.error(`No version found for language: ${lang}`)
    return
  }
  return version
}
