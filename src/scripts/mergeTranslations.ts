import fs from "fs"
import path from "path"

import { supportedLanguages } from "../utils/languages"
import mergeObjects from "../utils/mergeObjects"

// Iterate over each supported language and generate /intl/${lang}.json
// by merging all /intl/${lang}/${page}.json files
const mergeTranslations = (): void => {
  for (const lang of supportedLanguages) {
    try {
      const currentTranslation = lang
      const pathToProjectSrc = path.resolve("src")
      const pathToTranslations = path.join(
        pathToProjectSrc,
        "intl",
        currentTranslation
      )

      const result = {}

      fs.readdirSync(pathToTranslations).forEach((file) => {
        const pathToFile = `${pathToTranslations}/${file}`
        const json = fs.readFileSync(pathToFile, "utf-8")
        // console.log(`Merging: ${pathToFile}`)
        const obj = JSON.parse(json)
        mergeObjects(result, obj)
      })

      const outputFilename = `src/intl/${currentTranslation}.json`

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
