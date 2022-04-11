const allLanguages = require("../data/translations.json")

const buildLangs = (process.env.GATSBY_BUILD_LANGS || "")
  .split(",")
  .filter(Boolean)

// will take the same shape as `allLanguages`. Only thing we are doing
// here is filtering the desired langs to be built
const languageMetadata = Object.fromEntries(
  Object.entries(allLanguages).filter(([lang]) => {
    // BUILD_LANGS === empty means to build all the langs
    if (!buildLangs.length) {
      return true
    }

    return buildLangs.includes(lang)
  })
)

const supportedLanguages = Object.keys(languageMetadata)
const legacyHomepageLanguages = supportedLanguages.filter(
  (lang) => languageMetadata[lang].useLegacyHomepage
)

const consoleError = (message) => {
  const { NODE_ENV } = process.env
  if (NODE_ENV === "development") {
    console.error(message)
  }
}

// Returns the en.json value
const getDefaultMessage = (key) => {
  const defaultStrings = require("../intl/en.json")
  const defaultMessage = defaultStrings[key]
  if (defaultMessage === undefined) {
    consoleError(
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
    consoleError(`No id provided for translation.`)
    return ""
  }
  if (!intl || !intl.formatMessage) {
    consoleError(`Invalid/no intl provided for translation id ${id}`)
    return ""
  }
  const translation = intl.formatMessage({
    id,
    defaultMessage: getDefaultMessage(id),
  })
  if (translation === id) {
    consoleError(
      `Intl ID string "${id}" has no match. Default message of "" returned.`
    )
    return ""
  }
  return translation
}

// Must export using ES5 to import in gatsby-node.js
module.exports.allLanguages = allLanguages
module.exports.languageMetadata = languageMetadata
module.exports.supportedLanguages = supportedLanguages
module.exports.getDefaultMessage = getDefaultMessage
module.exports.isLangRightToLeft = isLangRightToLeft
module.exports.translateMessageId = translateMessageId
module.exports.legacyHomepageLanguages = legacyHomepageLanguages
