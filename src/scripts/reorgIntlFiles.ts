import fs from "fs"
import os from "os"
import path from "path"
import walkdir from "walkdir"
import _ from "lodash"

import { defaultLanguage, supportedLanguages } from "../utils/languages"

const sourcePath = "src/intl"

async function reorgIntl() {
  const defaultLangTranslations: Record<string, Record<string, string>> = {}
  const allTranslationsPerLang: Record<string, Record<string, string>> = {}

  supportedLanguages.forEach((language) => {
    allTranslationsPerLang[language] = {}

    // load translations per language in memory
    walkdir.sync(path.join(sourcePath, language), (filepath) => {
      const data = fs.readFileSync(filepath, { encoding: "utf8" })
      const translations = JSON.parse(data) as Record<string, string>

      if (language === defaultLanguage) {
        const namespace = path.basename(filepath)
        defaultLangTranslations[namespace] = translations
      } else {
        allTranslationsPerLang[language] = {
          ...allTranslationsPerLang[language],
          ...translations,
        }
      }
    })
  })

  supportedLanguages.forEach((language) => {
    const allTranslations = allTranslationsPerLang[language]
    Object.keys(defaultLangTranslations).forEach((ns) => {
      const defaultLangContent = defaultLangTranslations[ns]

      const defaultLangKeys = Object.keys(defaultLangContent)

      const translations = _.pick(allTranslations, defaultLangKeys)

      if (!_.isEmpty(translations)) {
        fs.writeFileSync(
          path.join(sourcePath, language, ns),
          JSON.stringify(translations, null, 2) + os.EOL
        )
      }
    })
  })
}

reorgIntl()
