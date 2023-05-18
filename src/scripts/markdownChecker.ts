import { Lang } from "../utils/languages"

const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")
const argv = require("minimist")(process.argv.slice(2))

const LANG_ARG: string | null = argv.lang || null
const PATH_TO_INTL_MARKDOWN = "./src/content/translations/"
const PATH_TO_ALL_CONTENT = "./src/content/"
const TUTORIAL_DATE_REGEX = new RegExp("\\d{4}-\\d{2}-\\d{2}")
const WHITE_SPACE_IN_LINK_TEXT = new RegExp(
  "\\[\\s.+\\]\\( | \\[.+\\s\\]\\(",
  "g"
)
const BROKEN_LINK_REGEX = new RegExp(
  "\\[[^\\]]+\\]\\([^\\)\\s]+\\s[^\\)]+\\)",
  "g"
)

// add <emoji
// add /developers/docs/scaling/#layer-2-scaling
// add ../../assets/ethereum-learn.png
// ../../assets/eth-gif-cat.png

const HTML_TAGS: Array<string> = ["</code", "</p>", "</ul>"]
const SPELLING_MISTAKES: Array<string> = [
  "Ethreum",
  "Etherum",
  "Etherium",
  "Etheruem",
  "Etereum",
  "Eterium",
  "Etherem",
  "Etheerum",
  "Ehtereum",
  "Eferum",
]
const CASE_SENSITVE_SPELLING_MISTAKES = ["Thereum", "Metamask", "Github"]
// Ideas:
// Regex for explicit lang path (e.g. /en/) && for glossary links (trailing slash breaks links e.g. /glossary/#pos/ doesn't work)
// We should have case sensitive spelling mistakes && check they are not in links.

interface Languages {
  lang?: Array<Lang>
}

const langsArray: Array<Lang> = fs.readdirSync(PATH_TO_INTL_MARKDOWN)
langsArray.push("en")

function getAllMarkdownPaths(
  dirPath: string,
  arrayOfMarkdownPaths: Array<string> = []
): Array<string> {
  let files: Array<string> = fs.readdirSync(dirPath)

  arrayOfMarkdownPaths = arrayOfMarkdownPaths || []

  for (const file of files) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfMarkdownPaths = getAllMarkdownPaths(
        dirPath + "/" + file,
        arrayOfMarkdownPaths
      )
    } else {
      const filePath: string = path.join(dirPath, "/", file)

      if (filePath.includes(".md")) {
        arrayOfMarkdownPaths.push(filePath)
      }
    }
  }

  return arrayOfMarkdownPaths
}

function sortMarkdownPathsIntoLanguages(paths: Array<string>): Languages {
  const languages: Languages = langsArray.reduce((accumulator, value) => {
    return { ...accumulator, [value]: [] }
  }, {})

  for (const path of paths) {
    const translationDir = "/translations/"
    const isTranslation = path.includes(translationDir)
    const langIndex = path.indexOf(translationDir) + translationDir.length

    // RegEx to grab the root of the path (e.g. the lang code for translated files)
    const regex = /^([^\/]+)\//
    const match = path.substring(langIndex).match(regex)
    const lang = isTranslation && match && match.length > 1 ? match[1] : "en"

    if (LANG_ARG) {
      if (LANG_ARG === lang) {
        languages[lang].push(path)
      }
    } else {
      languages[lang].push(path)
    }
  }

  return languages
}

interface MatterData {
  title: string
  description: string
  lang: Lang
  published: Date
  sidebar: string
  skill: string
}

function processFrontmatter(path: string, lang: string): void {
  const file: Buffer = fs.readFileSync(path, "utf-8")
  const frontmatter: MatterData = matter(file).data

  if (!frontmatter.title) {
    console.warn(`Missing 'title' frontmatter at ${path}:`)
  }
  // Description commented out as there are a lot of them missing :-)!
  // if (!frontmatter.description) {
  //   console.warn(`Missing 'description' frontmatter at ${path}:`)
  // }
  if (!frontmatter.lang) {
    console.error(`Missing 'lang' frontmatter at ${path}: Expected: ${lang}:'`)
  } else if (!(frontmatter.lang === lang)) {
    console.error(
      `Invalid 'lang' frontmatter at ${path}: Expected: ${lang}'. Received: ${frontmatter.lang}.`
    )
  }

  if (frontmatter.sidebar) {
    console.error(`Unexpected 'sidebar' frontmatter at ${path}`)
  }

  if (path.includes("/tutorials/")) {
    if (!frontmatter.published) {
      console.warn(`Missing 'published' frontmatter at ${path}:`)
    } else {
      try {
        let stringDate = frontmatter.published.toISOString().slice(0, 10)
        const dateIsFormattedCorrectly = TUTORIAL_DATE_REGEX.test(stringDate)

        if (!dateIsFormattedCorrectly) {
          console.warn(
            `Invalid 'published' frontmatter at ${path}: Expected: 'YYYY-MM-DD' Received: ${frontmatter.published}`
          )
        }
      } catch (e) {
        console.warn(
          `Invalid 'published' frontmatter at ${path}: Expected: 'YYYY-MM-DD' Received: ${frontmatter.published}`
        )
      }
    }

    if (!["beginner", "intermediate", "advanced"].includes(frontmatter.skill)) {
      console.log(
        `Skill frontmatter '${frontmatter.skill}' must be: beginner, intermediate, or advanced at: ${path}:`
      )
    }
  }
}

function processMarkdown(path: string) {
  const markdownFile: string = fs.readFileSync(path, "utf-8")
  let brokenLinkMatch: RegExpExecArray | null

  while ((brokenLinkMatch = BROKEN_LINK_REGEX.exec(markdownFile))) {
    const lineNumber = getLineNumber(markdownFile, brokenLinkMatch.index)
    console.warn(`Broken link found: ${path}:${lineNumber}`)

    // if (!BROKEN_LINK_REGEX.global) break
  }

  // TODO: refactor history pages to use a component for network upgrade summaries
  // TODO: create .env commit warning component for tutorials
  // Ignore tutorials with Javascript and ExpandableCards
  if (
    !path.includes("/history/") &&
    !path.includes("/whitepaper/") &&
    !path.includes("/roadmap/") &&
    !path.includes("alchemy") &&
    !path.includes("nft") &&
    !path.includes("hello-world-smart-contract") &&
    !path.includes("opcodes") &&
    !path.includes("translation-program") &&
    !path.includes("/deprecated-software/") &&
    !path.includes("/energy-consumption/") &&
    !markdownFile.includes("```javascript") &&
    !markdownFile.includes("ExpandableCard")
  ) {
    for (const tag of HTML_TAGS) {
      const htmlTagRegex = new RegExp(tag, "g")
      let htmlTagMatch: RegExpExecArray | null

      while ((htmlTagMatch = htmlTagRegex.exec(markdownFile))) {
        const lineNumber = getLineNumber(markdownFile, htmlTagMatch.index)
        console.warn(`Warning: ${tag} tag in markdown at ${path}:${lineNumber}`)

        if (!htmlTagRegex.global) break
      }
    }
  }

  // Commented out as 296 instances of whitespace in link texts
  let whiteSpaceInLinkTextMatch: RegExpExecArray | null

  while (
    (whiteSpaceInLinkTextMatch = WHITE_SPACE_IN_LINK_TEXT.exec(markdownFile))
  ) {
    const lineNumber = getLineNumber(
      markdownFile,
      whiteSpaceInLinkTextMatch.index
    )
    console.warn(`Warning: White space in link found: ${path}:${lineNumber}`)
  }

  checkMarkdownSpellingMistakes(path, markdownFile, SPELLING_MISTAKES)
  // Turned this off for testing as there are lots of Github (instead of GitHub) and Metamask (instead of MetaMask).
  // checkMarkdownSpellingMistakes(path, markdownFile, CASE_SENSITVE_SPELLING_MISTAKES, true)
}

function checkMarkdownSpellingMistakes(
  path: string,
  file: string,
  spellingMistakes: Array<string>,
  caseSensitive = false
): void {
  for (const mistake of spellingMistakes) {
    const mistakeRegex = caseSensitive
      ? new RegExp(mistake, "g")
      : new RegExp(mistake, "gi")
    let spellingMistakeMatch: RegExpExecArray | null

    while ((spellingMistakeMatch = mistakeRegex.exec(file))) {
      const lineNumber = getLineNumber(file, spellingMistakeMatch.index)
      console.warn(
        `Spelling mistake "${mistake}" found at ${path}:${lineNumber}`
      )
    }

    if (!mistakeRegex.global) break
  }
}

function getLineNumber(file: string, index: number): string {
  const fileSubstring = file.substring(0, index)
  const lines = fileSubstring.split("\n")
  const linePosition = lines.length
  const charPosition = lines[lines.length - 1].length + 1
  const lineNumber = `${linePosition}:${charPosition}`

  return lineNumber
}

function checkMarkdown(): void {
  const markdownPaths: Array<string> = getAllMarkdownPaths(PATH_TO_ALL_CONTENT)
  const markdownPathsByLang: Languages =
    sortMarkdownPathsIntoLanguages(markdownPaths)

  for (const lang in markdownPathsByLang) {
    for (const path of markdownPathsByLang[lang]) {
      processFrontmatter(path, lang)
      processMarkdown(path)
    }
  }
}

checkMarkdown()
