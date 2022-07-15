const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

const PATH_TO_INTL_MARKDOWN = "./src/content/translations/"
const PATH_TO_ALL_CONTENT = "./src/content/"

const langsArray = fs.readdirSync(PATH_TO_INTL_MARKDOWN)
langsArray.push("en")

function sortMarkdownPathsIntoLanguages(files) {
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

function getAllMarkdownPaths(dirPath, arrayOfFiles = []) {
  let files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllMarkdownPaths(dirPath + "/" + file, arrayOfFiles)
    } else {
      const fileToPush = path.join(dirPath, "/", file)

      if (fileToPush.includes(".md")) {
        arrayOfFiles.push(fileToPush)
      }
    }
  })

  return arrayOfFiles
}

function processFrontmatter(md, lang) {
  const file = fs.readFileSync(md, "utf-8")
  const frontmatter = matter(file).data

  // console.log(frontmatter)
  // if (lang === "fr") console.log(frontmatter.title)

  if (frontmatter.lang !== lang) {
    console.log(md)
  }
}

const markdownPaths = getAllMarkdownPaths(PATH_TO_ALL_CONTENT)
const markdownPathsByLang = sortMarkdownPathsIntoLanguages(markdownPaths)

for (const lang in markdownPathsByLang) {
  markdownPathsByLang[lang].forEach((file) => {
    processFrontmatter(file, lang)
  })
}

// Would it be useful to Luca to quickly get all page titles for a lang?
