const defaultStrings = require("../intl/en.json")
const languageMetadata = require("../data/translations.json")

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

const translateMessageId = (id, intl) => {
  if (!id) {
    console.error(`No id provided for translation.`)
    return ""
  }
  if (!intl || !intl.formatMessage) {
    console.error(`Invalid/no intl provided for translation id ${id}`)
    return ""
  }
  const translation = intl.formatMessage({
    id,
    defaultMessage: getDefaultMessage(id),
  })
  if (translation === id) {
    console.error(
      `Intl ID string "${id}" has no match. Default message of "" returned.`
    )
    return ""
  }
  return translation
}

// Must export using ES5 to import in gatsby-node.js
module.exports.languageMetadata = languageMetadata
module.exports.supportedLanguages = supportedLanguages
module.exports.getLangContentVersion = getLangContentVersion
module.exports.getLangPages = getLangPages
module.exports.getDefaultMessage = getDefaultMessage
module.exports.isLangRightToLeft = isLangRightToLeft
module.exports.translateMessageId = translateMessageId
