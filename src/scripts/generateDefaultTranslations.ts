import fs from "fs"
import path from "path"

import { defaultLanguage } from "../utils/languages"
import mergeObjects from "../utils/mergeObjects"

// Generate src/intl/{defaultLanguage}.json file by merging all
// src/intl/${defaultLanguage}/${page}.json files
// It will later be used by the Translation component to display default
// messages
const generateDefaultTranslations = (): void => {
  try {
    const pathToProjectSrc = path.resolve("src")
    const pathToTranslations = path.join(
      pathToProjectSrc,
      "intl",
      defaultLanguage
    )

    const result = {}

    fs.readdirSync(pathToTranslations).forEach((file) => {
      const pathToFile = `${pathToTranslations}/${file}`
      const json = fs.readFileSync(pathToFile, "utf-8")
      // console.log(`Merging: ${pathToFile}`)
      const obj = JSON.parse(json)
      mergeObjects(result, obj)
    })

    const outputFilename = `src/intl/${defaultLanguage}.json`

    fs.writeFileSync(
      outputFilename,
      JSON.stringify(result, null, 2).concat("\n")
    )
  } catch (e) {
    console.error(e)
  }
}

export default generateDefaultTranslations
