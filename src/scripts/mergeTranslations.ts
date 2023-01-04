import fs from "fs"
import path from "path"

import { supportedLanguages, defaultLanguage } from "../utils/languages"
import mergeObjects from "../utils/mergeObjects"

// Iterate over each supported language and generate /intl/${lang}.json
// by merging all /intl/${lang}/${namespace}.json files
const mergeTranslations = (): void => {
  // make sure `defaultLang` is the first item in order to populate `defaultLangObj`
  const rest = supportedLanguages.filter((lng) => lng !== defaultLanguage)
  const languages = [defaultLanguage, ...rest]

  let defaultLangObj = {}
  for (const lang of languages) {
    try {
      const pathToProjectSrc = path.resolve("src")
      const pathToTranslations = path.join(pathToProjectSrc, "intl", lang)

      let result = {}
      fs.readdirSync(pathToTranslations).forEach((file) => {
        const pathToFile = `${pathToTranslations}/${file}`
        const json = fs.readFileSync(pathToFile, "utf-8")
        // console.log(`Merging: ${pathToFile}`)
        const obj = JSON.parse(json)
        mergeObjects(result, obj)
      })

      if (lang === defaultLanguage) {
        defaultLangObj = result
      } else {
        // keep the untranslated strings with the `defaultLang` value
        // this will help on the `locales` creation in the `createLocales`
        // script as we want to fallback to the `defaultLang` in case the key
        // isn't translated
        result = { ...defaultLangObj, ...result }
      }

      const dir = `./i18n/merged/${lang}`
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      const outputFilename = `${dir}/index.json`
      fs.writeFileSync(
        outputFilename,
        JSON.stringify(result, null, 2).concat("\n")
      )
    } catch (e) {
      console.error(e)
    }
  }
}

export default mergeTranslations
