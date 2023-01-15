import fs from "fs"
import path from "path"
import walkdir from "walkdir"
import _ from "lodash"

import { defaultLanguage } from "../utils/languages"

const input = "src/intl"
const output = "i18n/locales"

/**
 * Main script function
 */
async function createLocales() {
  // cleanup any previous generated locales
  const localesPath = output
  if (fs.existsSync(localesPath)) {
    fs.rmSync(localesPath, { recursive: true })
  }

  const defaultLangLocales: Record<string, Record<string, string>> = {}
  walkdir.sync(`${input}/${defaultLanguage}/`, (filepath) => {
    const namespace = path.basename(filepath)

    // load english content per ns in memory in order to compare it with the
    // other languages
    const data = fs.readFileSync(filepath, { encoding: "utf8" })
    const translations = JSON.parse(data)

    defaultLangLocales[namespace] = translations
  })

  walkdir.sync(input, { no_recurse: true }, function (folderpath) {
    const languageFolder = path.basename(folderpath)

    if (languageFolder === defaultLanguage) {
      this.ignore(folderpath)
    }

    //create language folder in `output`
    fs.mkdirSync(path.join(output, languageFolder), { recursive: true })

    const nsInLanguage: Array<string> = []
    walkdir.sync(folderpath, (filepath) => {
      const ns = path.basename(filepath)

      nsInLanguage.push(ns)

      const data = fs.readFileSync(filepath, { encoding: "utf8" })
      const translations = JSON.parse(data)

      // check differences and fill the missing translations strings in english
      const defaultLangContent = defaultLangLocales[ns]
      const completeSet = { ...defaultLangContent, ...translations }

      fs.writeFileSync(
        path.join(output, languageFolder, ns),
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
        path.join(output, languageFolder, ns),
        JSON.stringify(defaultLangContent, null, 2)
      )
    })
  })
}

export default createLocales
