import fs from "fs"
import BananaSlug from "github-slugger"

// Given a directory (e.g. `pt`), this script adds custom heading IDs
// within all markdown files of the directory (only if one does not exist).
// e.g.
// ## What makes Ethereum dapps different?
// becomes:
// ## What makes Ethereum dapps different? {#what-makes-ethereum-dapps-different}

// This keeps anchor links for headers (e.g. used in <TableOfContents/>) consistent across translations
// Learn more: https://github.com/ethereum/ethereum-org-website/issues/272

// TODO we should auto-run this script when new markdown files are added to the project

const headersToChange: Record<
  string,
  {
    text: string
    slug: string
  }
> = {}

let curLevel = [0, 0, 0]
let curMaxLevel = 1

//TODO: Figure out what `doc` is and rename it to something better
const walk = (directoryPath: string, doc: string | null) => {
  let results: Array<string> = []
  const directoryContents: Array<string> = fs.readdirSync(directoryPath)
  directoryContents.forEach(function (file) {
    file = directoryPath + "/" + file
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      // Recurse into a subdirectory
      results = results.concat(walk(file, doc))
    } else {
      // Is a file
      if (
        !doc ||
        doc.length == 0 ||
        (file.indexOf(doc) != -1 && !file.startsWith(`src/content/${doc}`))
      ) {
        results.push(file)
      }
    }
  })
  return results
}

const stripLinks = (line: string): string => {
  return line.replace(/\[([^\]]+)\]\([^)]+\)/, (match, p1: string) => p1)
}

const addHeaderID = (
  line: string,
  slugger: BananaSlug,
  write = false
): string | undefined => {
  // check if we're a header at all
  if (!line.startsWith("#")) {
    return line
  }
  // check if it already has an id
  if (/\{#[^}]+\}/.test(line)) {
    return line
  }
  const headingText = line
    .slice(line.indexOf(" "))
    .replace(/\{#[^}]+\}/, "")
    .trim()
  const headingLevel = line.slice(0, line.indexOf(" "))

  curMaxLevel =
    headingLevel.length > curMaxLevel ? headingLevel.length : curMaxLevel

  const headingLevelArrayIndex = headingLevel.length - 1
  if (!curLevel[headingLevelArrayIndex]) {
    curLevel[headingLevelArrayIndex] = 0
  }
  curLevel[headingLevelArrayIndex]++
  for (let l = headingLevel.length; l < curMaxLevel; l++) {
    curLevel[l] = 0
  }
  curMaxLevel = 1
  const headerNumber = curLevel.join(".")
  let slug = ""
  if (!write) {
    // const match = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/.exec(line);
    // slug = match ? match[2].toLowerCase() : slugger.slug(stripLinks(headingText));
    slug = slugger.slug(stripLinks(headingText))
    headersToChange[headerNumber] = {
      text: headingText,
      slug,
    }
    // The below code is for printing the anchor link reference
    // const title = headingText.replace(/^\d\.\s+/, '').trim()
    // if (curLevel[1] > 0)
    // console.log(`  ${curLevel[1]}. [${title}](#${slug})`);
  } else {
    if (headerNumber in headersToChange) {
      slug = headersToChange[headerNumber].slug
      console.log("\twrite heading ID", headerNumber, headingText, "==>", slug)
      return `${headingLevel} ${headingText} {#${slug}}`
    } else {
      console.log(
        "\theaderNumber not found",
        headerNumber,
        headingText,
        "==>",
        slug
      )
      return line
    }
  }
}

const addHeaderIDs = (lines: Array<string>, write = false): Array<string> => {
  // Sluggers should be per file
  const slugger = new BananaSlug()
  let inCode = false
  const results: Array<string> = []
  lines.forEach((line) => {
    // Ignore code blocks
    if (line.startsWith("```")) {
      inCode = !inCode
      results.push(line)
      return
    }
    if (inCode) {
      results.push(line)
      return
    }

    const headerTextWithSlug = addHeaderID(line, slugger, write)
    if (headerTextWithSlug) {
      results.push(headerTextWithSlug)
    }
  })
  return results
}

type TraverseHeadersFunction = (
  path: string,
  config: { doc?: string; write?: boolean }
) => void

const traverseHeaders: TraverseHeadersFunction = (
  path,
  { doc = "", write = false }
) => {
  const files = walk(path, doc)
  files.forEach((file) => {
    if (!file.endsWith(".md")) {
      return
    }

    console.log(`>>> processing ${file}`)
    curLevel = [0, 0, 0]
    const content: string = fs.readFileSync(file, "utf8")
    const lines: Array<string> = content.split("\n")
    const updatedLines = addHeaderIDs(lines, write)
    if (write) {
      fs.writeFileSync(file, updatedLines.join("\n"))
    }
  })
  if (!write) {
    console.log(headersToChange)
  }
}

const addHeaderIDsForDir = (path: string) => {
  if (path.includes("translations")) {
    throw new Error(`Heading ID generation is intended for English files only.`)
  }
  const fullPath = `src/content/${path}`
  traverseHeaders(fullPath, { write: false })
  traverseHeaders(fullPath, { write: true })
}

const [path] = process.argv.slice(2)

if (!path) {
  throw new Error("No Valid Path Provided")
}

addHeaderIDsForDir(path)
