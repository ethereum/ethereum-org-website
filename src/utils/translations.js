const defaultStrings = require("../intl/en.json")

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
  fi: {
    version: 1.1,
    language: "Suomalainen",
    "language-english": "Finnish",
  },
  fr: {
    version: 1.1,
    language: "Français",
    "language-english": "French",
  },
  hu: {
    version: 1.1,
    language: "Magyar",
    "language-english": "Hungarian",
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
    version: 1.1,
    language: "Italiano",
    "language-english": "Italian",
  },
  ja: {
    version: 1.1,
    language: "日本語",
    "language-english": "Japanese",
  },
  ko: {
    version: 1.1,
    language: "한국어",
    "language-english": "Korean",
  },
  lt: {
    version: 1.0,
    language: "Lietuvis",
    "language-english": "Lithuanian",
  },
  ml: {
    version: 1.1,
    language: "മലയാളം",
    "language-english": "Malayalam",
  },
  nl: {
    version: 1.0,
    language: "Nederlands",
    "language-english": "Dutch",
  },
  nb: {
    version: 1.1,
    language: "norsk",
    "language-english": "Norwegian",
  },
  pl: {
    version: 1.0,
    language: "Polski",
    "language-english": "Polish",
  },
  pt: {
    version: 1.0,
    language: "Português",
    "language-english": "Portuguese",
  },
  "pt-br": {
    version: 1.0,
    language: "Português",
    "language-english": "Portuguese (Brazilian)",
  },
  ro: {
    version: 1.1,
    language: "Română",
    "language-english": "Romanian",
  },
  ru: {
    version: 1.0,
    language: "Pусский",
    "language-english": "Russian",
  },
  se: {
    version: 1.1,
    language: "Svenska",
    "language-english": "Swedish",
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
  tr: {
    version: 1.1,
    language: "Türk",
    "language-english": "Turkish",
  },
  uk: {
    version: 1.1,
    language: "Українська",
    "language-english": "Ukranian",
  },
  vi: {
    version: 1.1,
    language: "Tiếng Việt",
    "language-english": "Vietnamese",
  },
  zh: {
    version: 1.1,
    language: "简体中文",
    "language-english": "Chinese Simplified",
  },
  "zh-tw": {
    version: 1.1,
    language: "繁體中文",
    "language-english": "Chinese Traditional",
  },
}

const supportedLanguages = Object.keys(languageMetadata)

// Determines which page components get built for each language
// during `onCreatePage` in gatsby-node.js
const pagesByLangVersion = {
  1.0: [`index.js`],
  1.1: [`index.js`, `build.js`],
  // 1.2: [`index.js`, `build.js`, `languages.js`, `what-is-ethereum.js`, `eth.js`],
}

// Returns language's content version
// Used for conditional rendering of content
const getLangContentVersion = (lang) => {
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

// Returns page components for language
const getLangPages = (lang) => {
  const version = getLangContentVersion(lang)
  const pages = pagesByLangVersion[version]
  if (!pages) {
    console.error(`No pages found for language version: ${version}`)
    return []
  }
  return pages
}

// Returns the en.json value
const getDefaultMessage = (key) => {
  const defaultMessage = defaultStrings[key]
  if (defaultMessage === undefined) {
    console.error(
      `No key "${key}" in en.json. Cannot provide a default message.`
    )
  }
  return defaultMessage || ""
}

const isLangRightToLeft = (lang) => {
  return lang === "ar" || lang === "fa"
}

// Must export using ES5 to import in gatsby-node.js
module.exports.languageMetadata = languageMetadata
module.exports.supportedLanguages = supportedLanguages
module.exports.getLangContentVersion = getLangContentVersion
module.exports.getLangPages = getLangPages
module.exports.getDefaultMessage = getDefaultMessage
module.exports.isLangRightToLeft = isLangRightToLeft
