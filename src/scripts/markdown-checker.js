const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

const PATH_TO_INTL_MARKDOWN = "./src/content/translations/"
const PATH_TO_ALL_CONTENT = "./src/content/"
const TUTORIAL_DATE_REGEX = new RegExp("\\d{4}-\\d{2}-\\d{2}")
const BROKEN_LINK_REGEX = new RegExp(
  "\\[[^\\]]+\\]\\([^\\)\\s]+\\s[^\\)]+\\)",
  "g"
)
// Ideas:
// Regex for explicit lang path (e.g. /en/) && for glossary links (trailing slash breaks links e.g. /glossary/#pos/ doesn't work)

const langsArray = fs.readdirSync(PATH_TO_INTL_MARKDOWN)
langsArray.push("en")

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

function processFrontmatterAndLogErrors(path, lang) {
  const file = fs.readFileSync(path, "utf-8")
  const frontmatter = matter(file).data

  if (!frontmatter.title) {
    console.warn(`Missing 'title' frontmatter at ${path}.`)
  }
  // Description commented out as there are a lot of them missing :-)!
  // if (!frontmatter.description) {
  //   console.warn(`Missing 'description' frontmatter at ${path}.`)
  // }
  if (!frontmatter.lang) {
    console.log(`Missing 'lang' frontmatter at ${path}. Expected: ${lang}.'`)
  } else if (!(frontmatter.lang === lang)) {
    console.warn(
      `Invalid 'lang' frontmatter at ${path}. Expected: ${lang}'. Received: ${frontmatter.lang}.`
    )
  }

  if (path.includes("/tutorials/")) {
    if (!frontmatter.published) {
      console.warn(`Missing 'published' frontmatter at ${path}.`)
    } else {
      try {
        let stringDate = frontmatter.published.toISOString().slice(0, 10)
        const dateIsFormattedCorrectly = TUTORIAL_DATE_REGEX.test(stringDate)

        if (!dateIsFormattedCorrectly) {
          console.log(
            `Invalid 'published' frontmatter at ${path}. Expected: 'YYYY-MM-DD' Received: ${frontmatter.published}`
          )
        }
      } catch (e) {
        console.log(
          `Invalid 'published' frontmatter at ${path}. Expected: 'YYYY-MM-DD' Received: ${frontmatter.published}`
        )
      }
    }
  }
}

function processMarkdown(path) {
  const markdownFile = fs.readFileSync(path, "utf-8")
  let brokenLinkMatch

  while ((brokenLinkMatch = BROKEN_LINK_REGEX.exec(markdownFile))) {
    const lineNumber = getLineNumber(markdownFile, brokenLinkMatch.index)
    console.warn(`Broken link found: ${path}:${lineNumber}`)

    if (!BROKEN_LINK_REGEX.global) break
  }
}

function getLineNumber(file, index) {
  const fileSubstring = file.substring(0, index)
  const lines = fileSubstring.split("\n")
  const linePosition = lines.length
  const charPosition = lines[lines.length - 1].length + 1
  const lineNumber = `${linePosition}:${charPosition}`

  return lineNumber
}

function checkMarkdown() {
  const markdownPaths = getAllMarkdownPaths(PATH_TO_ALL_CONTENT)
  const markdownPathsByLang = sortMarkdownPathsIntoLanguages(markdownPaths)

  for (const lang in markdownPathsByLang) {
    markdownPathsByLang[lang].forEach((path) => {
      processFrontmatterAndLogErrors(path, lang)
      processMarkdown(path)
    })
  }
}

checkMarkdown()
