const fs = require("fs")
const path = require("path")

/*
TODO
- Add /intl/${lang}.json files to gitignore (since they will now be generated)
- Decide if translation json files should also split files (only need English source files?)
*/

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

try {
  // TODO import supported languages as array to loop through?
  // OR should we just import each translated file into the primary JSON file?
  const currentTranslation = "en"
  const pathToProjectSrc = __dirname.split("/").slice(0, -1).join("/")
  const pathToTranslations = path.join(
    pathToProjectSrc,
    "intl",
    currentTranslation
  )

  const result = {}

  fs.readdirSync(pathToTranslations).forEach((file) => {
    const pathToFile = `${pathToTranslations}/${file}`
    const json = fs.readFileSync(pathToFile, "utf-8")
    console.log(`Merging: ${pathToFile}`)
    const obj = JSON.parse(json)
    mergeObjects(result, obj)
  })

  const outputFilename = `src/intl/${currentTranslation}.json`

  fs.writeFileSync(outputFilename, JSON.stringify(result, null, 2).concat("\n"))
  console.log(`Merged translations saved: ${outputFilename}`)
} catch (e) {
  console.error(e)
}

module.exports.mergeObjects = mergeObjects
