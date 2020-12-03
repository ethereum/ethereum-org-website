const fs = require("fs")
const path = require("path")

try {
  // TODO import supported languages as array to loop through
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
    const obj = JSON.parse(json)
    Object.assign(result, obj)
  })

  // TODO save to /intl/ directory
  const outputFilename = `${currentTranslation}.json`

  fs.writeFileSync(outputFilename, JSON.stringify(result, null, 2))
  console.log("JSON saved to " + outputFilename)
} catch (e) {
  console.error(e)
}
