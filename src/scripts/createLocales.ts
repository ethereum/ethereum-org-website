import fs from "fs"
import path from "path"
import walkdir from "walkdir"
import _ from "lodash"
import rimraf from "rimraf"

import { defaultLanguage, supportedLanguages } from "../utils/languages"

const input = "src/intl"
const output = "i18n/locales"

/**
 * Main script function
 */
async function createLocales() {
  // cleanup any previous generated locales
  await rimraf(output)

  const defaultLangLocales: Record<string, Record<string, string>> = {}
  walkdir.sync(`${input}/${defaultLanguage}/`, (filepath) => {
    const namespace = path.basename(filepath)

    // load english content per ns in memory in order to compare it with the
    // other languages
    const data = fs.readFileSync(filepath, { encoding: "utf8" })
    const translations = JSON.parse(data)

    defaultLangLocales[namespace] = translations
  })

  supportedLanguages.forEach((language) => {
    //create language folder in `output`
    fs.mkdirSync(path.join(output, language), { recursive: true })

    const nsInLanguage: Array<string> = []
    walkdir.sync(path.join(input, language), (filepath) => {
      const ns = path.basename(filepath)

      nsInLanguage.push(ns)

      const data = fs.readFileSync(filepath, { encoding: "utf8" })
      const translations = JSON.parse(data)

      // check differences and fill the missing translations strings in english
      const defaultLangContent = defaultLangLocales[ns]
      const completeSet = { ...defaultLangContent, ...translations }

      fs.writeFileSync(
        path.join(output, language, ns),
        JSON.stringify(completeSet, null, 2)
      )
    })

    const missingNs = _.difference(
      Object.keys(defaultLangLocales),
      nsInLanguage
    )
    missingNs.forEach((ns) => {
      // fill the content with english content
      const defaultLangContent = defaultLangLocales[ns]

      fs.writeFileSync(
        path.join(output, language, ns),
        JSON.stringify(defaultLangContent, null, 2)
      )
    })
  })
}

export default createLocales
