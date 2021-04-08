const fs = require("fs")
const path = require("path")
const languageMetadata = require("../data/translations.json")

// Wrapper on `Object.assign` to throw error if keys clash
const mergeObjects = (target, newObject) => {
  const targetKeys = Object.keys(target)
  for (const key of Object.keys(newObject)) {
    if (targetKeys.includes(key)) {
      throw new Error(`target object already has key: ${key}`)
    }
  }
  return Object.assign(target, newObject)
}

const supportedLanguages = Object.keys(languageMetadata)

// Iterate over each supported language and generate /intl/${lang}.json
// by merging all /intl/${lang}/${page}.json files
for (const lang of supportedLanguages) {
  try {
    const currentTranslation = lang
    const pathToProjectSrc = __dirname
      .split(process.platform === "win32" ? "\\" : "/")
      .slice(0, -1)
      .join("/")
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
    // console.log(`Merged translations saved: ${outputFilename}`)
  } catch (e) {
    console.error(e)
  }
}

module.exports.mergeObjects = mergeObjects
