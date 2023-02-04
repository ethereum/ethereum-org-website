import fs from "fs"
import path from "path"
import walkdir from "walkdir"
import _ from "lodash"

import { defaultLanguage, supportedLanguages } from "../utils/languages"

const sourcePath = "src/intl"

async function reorgIntl() {
  const intl: Record<string, Record<string, string>> = {}

  supportedLanguages.forEach((language) => {
    intl[language] = {}

    walkdir.sync(path.join(sourcePath, language), (filepath) => {
      const namespace = path.basename(filepath)

      // load english content per ns in memory in order to compare it with the
      // other languages
      const data = fs.readFileSync(filepath, { encoding: "utf8" })
      const translations = JSON.parse(data)

      intl[language][namespace] = translations
    })
  })

  supportedLanguages.forEach((language) => {
    walkdir.sync(path.join(sourcePath, language), (filepath) => {
      const ns = path.basename(filepath)

      console.log(`Analyzing ${ns}`)

      const data = fs.readFileSync(filepath, { encoding: "utf8" })
      const translations = JSON.parse(data)

      // check differences and fill the missing translations strings in english
      const defaultLangContent = intl[defaultLanguage][ns]

      const langKeys = Object.keys(translations)
      const defaultLangKeys = Object.keys(defaultLangContent)

      // translations keys that the defaultLang has but the lang not
      const missingKeys = _.difference(defaultLangKeys, langKeys)

      // search for the missing translation in the lang
      const missingTranslations = missingKeys.reduce<Record<string, string>>(
        (translations, key) => {
          // look for string in lang
          const namespace = findNamespace(intl[language], key)

          if (namespace) {
            return {
              ...translations,
              [key]: namespace[key],
            }
          }

          return translations
        },
        {}
      )

      // add the missing translations on the lang file
      const completeSet = { ...translations, ...missingTranslations }

      const leftoverKeys = _.difference(
        Object.keys(completeSet),
        defaultLangKeys
      )

      const final = _.omit(completeSet, leftoverKeys)

      fs.writeFileSync(
        path.join(sourcePath, language, ns),
        JSON.stringify(final, null, 2)
      )
    })
  })
}

function findNamespace(
  data: Record<string, string>,
  key: string
): string | undefined {
  return _.find(data, (ns) => {
    return ns.hasOwnProperty(key)
  })
}

reorgIntl()
