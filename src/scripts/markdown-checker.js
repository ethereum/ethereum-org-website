const fs = require("fs")
const path = require("path")

const PATH_TO_INTL_MARKDOWN = "./src/content/translations/"
const PATH_TO_ALL_CONTENT = "./src/content/"

const langsArray = fs.readdirSync(PATH_TO_INTL_MARKDOWN)
langsArray.push("en")

function sortMarkdownFilesIntoLanguages(files) {
  const languages = langsArray.reduce((accumulator, value) => {
    return { ...accumulator, [value]: [] }
  }, {})

  files.forEach((file) => {
    const isTranslation = file.includes("/translations/")
    const langIndex = file.indexOf("/translations/") + 14
    const isFourCharLang = file.includes("pt-br") || file.includes("zh-tw")
    const charactersToSlice = isFourCharLang ? 5 : 2

    const lang = isTranslation
      ? file.slice(langIndex, langIndex + charactersToSlice)
      : "en"

    languages[lang].push(file)
  })

  return languages
}

function getAllMarkdownFiles(dirPath, arrayOfFiles = []) {
  let files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      const fileToPush = path.join(dirPath, "/", file)

      if (fileToPush.includes(".md")) {
        arrayOfFiles.push(fileToPush)
      }
    }
  })

  return arrayOfFiles
}

const markdownPaths = getAllMarkdownFiles(PATH_TO_ALL_CONTENT)
console.log(sortMarkdownFilesIntoLanguages(markdownPaths))
