import fs from "fs"
import path from "path"

import matter from "gray-matter"
import minimist from "minimist"

import type { Lang } from "../lib/types"

type Summary = Record<string, string[]>

const argv = minimist(process.argv.slice(2))

const LANG_ARG: string | null = argv.lang || null
const PATH_TO_INTL_MARKDOWN = "./public/content/translations/"
const PATH_TO_ALL_CONTENT = "./public/content/"
const TUTORIAL_DATE_REGEX = new RegExp("\\d{4}-\\d{2}-\\d{2}")
// Original
const WHITE_SPACE_IN_LINK_TEXT = new RegExp(
  "\\[\\s.+\\]\\( | \\[.+\\s\\]\\(",
  "g"
)
// Modified
// const WHITE_SPACE_IN_LINK_TEXT = new RegExp(
//   "\\[\\s.+?\\]\\(|\\[.+?\\s\\]\\(",
//   "g"
// )
const BROKEN_LINK_REGEX = new RegExp(
  "\\[[^\\]]+\\]\\([^\\)\\s]+\\s[^\\)]+\\)",
  "g"
)
// This RegEx checks for invalid links in markdown content.
// The criteria for invalid links are:
// 1. Exclude images: The link shouldn't be preceded by an exclamation mark
// 2. Exclude internal links: The URL part of the link shouldn't start with a forward slash
// 3. Exclude fragment identifiers: The URL part of the link shouldn't start with a hash
// 4. Exclude typical external links: The URL part of the link shouldn't start with http or https
// 5. Exclude email links: The URL part of the link shouldn't start with mailto:
// 6. Exclude PDF links: The URL part of the link shouldn't end with .pdf
// 7. Exclude links wrapped in angled brackets: The URL part of the link shouldn't start with a <
const INVALID_LINK_REGEX = new RegExp(
  "(?<!\\!)\\[[^\\]]+\\]\\((?!<|/|#|http|mailto:)[^\\)]*(?<!\\.pdf)\\)",
  "g"
)
const INCORRECT_PATH_IN_TRANSLATED_MARKDOWN = new RegExp(
  "image: ../../(assets/|../assets/)",
  "g"
)

const LINK_TEXT_MISSING_REGEX = new RegExp("(?<![\\S])\\[\\]\\(([^)]+)\\)", "g")

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

// ! Current usage of this const is commented out
// eslint-disable-next-line unused-imports/no-unused-vars
const CASE_SENSITIVE_SPELLING_MISTAKES = ["Thereum", "Metamask", "Github"]
// Ideas:
// Regex for explicit lang path (e.g. /en/) && for glossary links (trailing slash breaks links e.g. /glossary/#pos/ doesn't work)
// We should have case sensitive spelling mistakes && check they are not in links.

interface Languages {
  lang?: Array<Lang>
}

const langsArray = fs.readdirSync(PATH_TO_INTL_MARKDOWN) as Array<Lang>
langsArray.push("en")

function getAllMarkdownPaths(
  dirPath: string,
  arrayOfMarkdownPaths: Array<string> = []
): Array<string> {
  const files: Array<string> = fs.readdirSync(dirPath)

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

function sortMarkdownPathsIntoLanguages(
  paths: Array<string>,
  excludeDefaultLang: boolean = false
): Languages {
  const languages: Languages = langsArray.reduce((accumulator, value) => {
    return { ...accumulator, [value]: [] }
  }, {})

  for (const path of paths) {
    const translationDir = "/translations/"
    const isTranslation = path.includes(translationDir)
    const langIndex = path.indexOf(translationDir) + translationDir.length

    // RegEx to grab the root of the path (e.g. the lang code for translated files)
    const regex = /^([^/]+)\//
    const match = path.substring(langIndex).match(regex)
    const lang = isTranslation && match && match.length > 1 ? match[1] : "en"

    if (LANG_ARG) {
      if (LANG_ARG === lang && (lang !== "en" || !excludeDefaultLang)) {
        languages[lang].push(path)
      }
    } else {
      if (lang !== "en" || !excludeDefaultLang) {
        languages[lang].push(path)
      }
    }
  }

  return languages
}

export async function getTranslatedMarkdownPaths() {
  const markdownPaths: Array<string> = getAllMarkdownPaths(PATH_TO_ALL_CONTENT)
  const excludeDefaultLang = true
  const languages = sortMarkdownPathsIntoLanguages(
    markdownPaths,
    excludeDefaultLang
  )
  return languages
}

function log(
  message: string,
  level: "warn" | "error" | "log",
  summary: string[]
) {
  summary.push(message)
  console[level](message)
}

function processFrontmatter(
  path: string,
  lang: string,
  summary: string[]
): string[] {
  const file = fs.readFileSync(path, "utf-8")
  const frontmatter = matter(file).data

  if (!frontmatter.title) {
    log(`Missing 'title' frontmatter at: ${path}`, "warn", summary)
  }
  // Description commented out as there are a lot of them missing :-)!
  // if (!frontmatter.description) {
  //   summary.push(`Missing 'description' frontmatter at: ${path}`)
  // }
  if (!frontmatter.lang) {
    log(
      `Missing 'lang' frontmatter at: ${path}, Expected: ${lang}'`,
      "error",
      summary
    )
  } else if (!(frontmatter.lang === lang)) {
    log(
      `Invalid 'lang' frontmatter at ${path}: Expected: ${lang}'. Received: ${frontmatter.lang}.`,
      "error",
      summary
    )
  }

  if (frontmatter.emoji) {
    if (!/^:\S+:$/.test(frontmatter.emoji)) {
      log(`Frontmatter for 'emoji' is invalid at ${path}`, "error", summary)
    }
  }

  if (frontmatter.sidebar) {
    log(`Unexpected 'sidebar' frontmatter at ${path}`, "error", summary)
  }

  if (path.includes("/tutorials/")) {
    if (!frontmatter.published) {
      log(`Missing 'published' frontmatter at ${path}:`, "warn", summary)
    } else {
      try {
        const stringDate = frontmatter.published.toISOString().slice(0, 10)
        const dateIsFormattedCorrectly = TUTORIAL_DATE_REGEX.test(stringDate)

        if (!dateIsFormattedCorrectly) {
          log(
            `Invalid 'published' frontmatter at ${path}: Expected: 'YYYY-MM-DD' Received: ${frontmatter.published}`,
            "warn",
            summary
          )
        }
      } catch (e) {
        log(
          `Invalid 'published' frontmatter at ${path}: Expected: 'YYYY-MM-DD' Received: ${frontmatter.published}`,
          "warn",
          summary
        )
      }
    }

    if (!["beginner", "intermediate", "advanced"].includes(frontmatter.skill)) {
      log(
        `Skill frontmatter '${frontmatter.skill}' must be: beginner, intermediate, or advanced at: ${path}:`,
        "log",
        summary
      )
    }
  }

  return summary
}

function processMarkdown(path: string, summary: string[]) {
  const markdownFile: string = fs.readFileSync(path, "utf-8")
  let brokenLinkMatch: RegExpExecArray | null

  while ((brokenLinkMatch = BROKEN_LINK_REGEX.exec(markdownFile))) {
    const lineNumber = getLineNumber(markdownFile, brokenLinkMatch.index)
    log(`Broken link found: ${path}:${lineNumber}`, "warn", summary)

    // if (!BROKEN_LINK_REGEX.global) break
  }

  let invalidLinkMatch: RegExpExecArray | null

  // Check for invalid links
  while ((invalidLinkMatch = INVALID_LINK_REGEX.exec(markdownFile))) {
    const lineNumber = getLineNumber(markdownFile, invalidLinkMatch.index)
    log(`Invalid link found: ${path}:${lineNumber}`, "warn", summary)
  }

  let linkTextMissingMatch: RegExpExecArray | null

  // Check for links missing text
  while ((linkTextMissingMatch = LINK_TEXT_MISSING_REGEX.exec(markdownFile))) {
    const lineNumber = getLineNumber(markdownFile, linkTextMissingMatch.index)
    log(`Link text missing: ${path}:${lineNumber}`, "warn", summary)
  }

  let incorrectImagePathMatch: RegExpExecArray | null

  // Todo: refactor to simply check if the image exists relative to the path
  if (path.includes("/translations/")) {
    while (
      (incorrectImagePathMatch =
        INCORRECT_PATH_IN_TRANSLATED_MARKDOWN.exec(markdownFile))
    ) {
      const lineNumber = getLineNumber(
        markdownFile,
        incorrectImagePathMatch.index
      )
      log(`Incorrect image path: ${path}:${lineNumber}`, "warn", summary)
    }
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
    !path.includes("/energy-consumption/") &&
    !markdownFile.includes("```javascript") &&
    !markdownFile.includes("ExpandableCard")
  ) {
    for (const tag of HTML_TAGS) {
      const htmlTagRegex = new RegExp(tag, "g")
      let htmlTagMatch: RegExpExecArray | null

      while ((htmlTagMatch = htmlTagRegex.exec(markdownFile))) {
        const lineNumber = getLineNumber(markdownFile, htmlTagMatch.index)
        log(
          `Warning: ${tag} tag in markdown at ${path}:${lineNumber}`,
          "warn",
          summary
        )

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
    log(
      `Warning: White space in link found: ${path}:${lineNumber}`,
      "warn",
      summary
    )
  }

  checkMarkdownSpellingMistakes(path, markdownFile, SPELLING_MISTAKES, summary)
  // Turned this off for testing as there are lots of Github (instead of GitHub) and Metamask (instead of MetaMask).
  // checkMarkdownSpellingMistakes(path, markdownFile, CASE_SENSITIVE_SPELLING_MISTAKES, true)
}

function checkMarkdownSpellingMistakes(
  path: string,
  file: string,
  spellingMistakes: Array<string>,
  summary: string[],
  caseSensitive = false
): void {
  for (const mistake of spellingMistakes) {
    const mistakeRegex = caseSensitive
      ? new RegExp(mistake, "g")
      : new RegExp(mistake, "gi")
    let spellingMistakeMatch: RegExpExecArray | null

    while ((spellingMistakeMatch = mistakeRegex.exec(file))) {
      const lineNumber = getLineNumber(file, spellingMistakeMatch.index)
      log(
        `Spelling mistake "${mistake}" found at ${path}:${lineNumber}`,
        "warn",
        summary
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

const writeSummary = (summary: Summary, summaryWritePath: string) => {
  fs.writeFileSync(summaryWritePath, JSON.stringify(summary, null, 2))
}

export function checkMarkdown(summaryWritePath?: string) {
  console.log("Checking markdown for common issues...")
  const summary = {} as Summary
  const markdownPaths: Array<string> = getAllMarkdownPaths(PATH_TO_ALL_CONTENT)
  const markdownPathsByLang: Languages =
    sortMarkdownPathsIntoLanguages(markdownPaths)

  for (const lang in markdownPathsByLang) {
    summary[lang] = []

    for (const path of markdownPathsByLang[lang]) {
      processFrontmatter(path, lang, summary[lang])
      processMarkdown(path, summary[lang])
    }

    if (!summary[lang].length) delete summary[lang]
  }
  if (!summaryWritePath) return

  writeSummary(summary, summaryWritePath)
  console.log("Writing markdown checker summary to:", summaryWritePath)
}

checkMarkdown()
