import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
} from "fs"
import { join } from "path"

import i18Config from "../../../../i18n.config.json"
import { DOT_CROWDIN } from "../translations/constants"

import { BucketsList, SelectionItem, SummaryItem, TrackerObject } from "./types"

const VERBOSE = false
/**
 * Wrapper function to call console.log()
 * Set VERBOSE to true to enable logging
 * @param message Any arbitrary message
 * @param optionalParams Any additional arbitrary messages
 */
const log = (message: any, ...optionalParams: any): void => {
  VERBOSE && console.log(message, ...optionalParams)
}

/**
 * Fetches CSV exported from Notion "Website translation board" table
 * See above for details on how to export CSV and import into repo
 * @returns Object containing language codes as keys, and an array of bucket numbers to be imported
 */
export const fetchReviewedCsv = (): BucketsList => {
  const csvDir: string = readdirSync(DOT_CROWDIN).filter((dir: string) =>
    dir.startsWith("Website translation board")
  )[0]
  if (!csvDir) return {}
  const path = join(DOT_CROWDIN, csvDir)
  const reviewedCsvPath: string = readdirSync(path).filter((file: string) => {
    const fileParts: string[] = file.split(".")
    return (
      fileParts[0].startsWith("https") &&
      !fileParts[0].endsWith("all") &&
      fileParts[1] === "csv"
    )
  })[0]
  const bucketsList: BucketsList = {}
  const csvFile = readFileSync(join(path, reviewedCsvPath), "utf8")
  if (!csvFile) return {}
  const data = csvFile.split("\n").map((row: string) => {
    const quotePair = /"([^"]+)"/g
    const sanitized = row.replaceAll(quotePair, (match) =>
      match.replace(",", " ").replace(/"/g, "")
    )
    return sanitized.split(",")
  })
  const headings = data.shift()
  if (!headings) return {}
  const langCodeIndex = headings.indexOf("code")
  const firstBucketIndex = headings.findIndex((item: string) =>
    item.startsWith("1)")
  )
  data.forEach((rowItems: string[]) => {
    const langCode = rowItems[langCodeIndex].split(" ").at(-1) // "es-EM → es" parses to "es"
    if (!langCode) return
    const bucketsForLang: number[] = []
    rowItems.forEach((item: string, idx: number) => {
      if (item.includes("Reviewed"))
        bucketsForLang.push(idx - firstBucketIndex + 1)
    })
    bucketsList[langCode] = bucketsForLang
  })
  return bucketsList
}

/**
 * Some language codes used in the repo differ from those used by Crowdin.
 * This is used to convert any codes that may differ when performing folder lookup.
 */
export const getCrowdinCode = (code: string): string =>
  i18Config.filter((lang) => lang.code === code)?.[0]?.crowdinCode || code

/**
 * Reads `ls` file contents of `_path`, moving .md and .json files
 * to their corresponding destinations in the repo. Function is called
 * again recursively for subdirectories.
 *
 * @param _path An absolute path to the directory being scraped.
 * @param contentSubpath The subpath deep to the lang-code directory,
 * used to construct destination for markdown content files
 * @param repoLangCode Language code used within the repo
 * @returns void
 */
export const scrapeDirectory = (
  _path: string,
  contentSubpath: string,
  repoLangCode: string,
  trackers: TrackerObject
): void => {
  if (!existsSync(_path)) return
  const ls: string[] = readdirSync(_path).filter(
    (dir: string) => !dir.startsWith(".")
  )
  ls.forEach((item: string) => {
    const source: string = join(_path, item)
    if (item.endsWith(".json")) {
      const jsonDestDirPath: string = join("src", "intl", repoLangCode)
      if (!existsSync(jsonDestDirPath))
        mkdirSync(jsonDestDirPath, { recursive: true })
      const jsonDestinationPath: string = join(jsonDestDirPath, item)
      log("Copy .json from", source, "to", jsonDestinationPath)
      copyFileSync(source, jsonDestinationPath)
      // Update .json tracker
      trackers.langs[repoLangCode].jsonCopyCount++
    } else if (
      item.endsWith(".md") ||
      item.endsWith(".svg") ||
      item.endsWith(".xlsx")
    ) {
      const mdDestDirPath: string = join(
        "public",
        "content",
        "translations",
        repoLangCode,
        contentSubpath
      )
      if (!existsSync(mdDestDirPath))
        mkdirSync(mdDestDirPath, { recursive: true })
      const mdDestinationPath: string = join(mdDestDirPath, item)
      log("Copy .md from", source, "to", mdDestinationPath)
      copyFileSync(source, mdDestinationPath)
      // Update .md tracker
      trackers.langs[repoLangCode].mdCopyCount++
    } else {
      log(`Entering ${_path}/${item}`)
      // If another directory, recursively call `scrapeDirectory`
      scrapeDirectory(
        `${_path}/${item}`,
        `${contentSubpath}/${item}`,
        repoLangCode,
        trackers
      )
    }
  })
}

export const getImportSelection = (
  buckets: BucketsList,
  trackers: TrackerObject
): SelectionItem[] =>
  Object.keys(buckets)
    .filter((repoLangCode: string): boolean => {
      if (!buckets[repoLangCode].length) trackers.emptyBuckets++
      return !!buckets[repoLangCode].length
    })
    .map(
      (repoLangCode: string): SelectionItem => ({
        repoLangCode,
        crowdinLangCode: getCrowdinCode(repoLangCode),
        buckets: buckets[repoLangCode],
      })
    )

export const processBucket = (
  bucket: number,
  crowdinLangCode: string,
  repoLangCode: string,
  langLs: string[],
  trackers: TrackerObject
): void => {
  const paddedBucket: string = bucket.toString().padStart(2, "0")
  let bucketDirName = ""
  langLs.forEach((bucketName: string) => {
    bucketDirName += bucketName.startsWith(paddedBucket) ? bucketName : ""
  })
  const bucketDirectoryPath: string = `${DOT_CROWDIN}/${crowdinLangCode}/${bucketDirName}`
  // Initial scrapeDirectory function call
  scrapeDirectory(bucketDirectoryPath, ".", repoLangCode, trackers)
  // Update tracker
  trackers.langs[repoLangCode].buckets.push(bucket)
}

export const processLanguage = (
  { repoLangCode, crowdinLangCode, buckets }: SelectionItem,
  trackers: TrackerObject
): void => {
  // Initialize tracker for language
  trackers.langs[repoLangCode] = {
    buckets: [],
    jsonCopyCount: 0,
    mdCopyCount: 0,
    error: "",
  }
  // Initialize working directory and check for existence
  const _path: string = join(DOT_CROWDIN, crowdinLangCode)
  if (!existsSync(_path)) {
    trackers.langs[
      repoLangCode
    ].error = `Path doesn't exist for lang ${crowdinLangCode}`
    return
  }
  const langLs: string[] = readdirSync(_path)
  // Iterate over each selected bucket, scraping contents with `scrapeDirectory`
  buckets.forEach((bucket) =>
    processBucket(bucket, crowdinLangCode, repoLangCode, langLs, trackers)
  )
}

export const handleSummary = (
  selection: SelectionItem[],
  trackers: TrackerObject
) => {
  // Construct console summary
  const summary: SummaryItem[] = selection.map(
    (item: SelectionItem): SummaryItem => {
      const { buckets, repoLangCode } = item
      const { jsonCopyCount, mdCopyCount, error } = trackers.langs[repoLangCode]
      return {
        repoLangCode,
        buckets,
        jsonCopyCount,
        mdCopyCount,
        error,
      }
    }
  )
  const langsSummary: string = summary.reduce(
    (prev: string, { repoLangCode }: { repoLangCode: string }): string =>
      `${prev},${repoLangCode}`,
    ""
  )

  // Print summary logs
  log("Empty buckets:", trackers.emptyBuckets)
  if (summary.length) {
    console.table(summary)
    console.log("Langs to test:", `\nBUILD_LOCALES=en${langsSummary}`)
    console.log("🎉 Crowdin import complete.")
  } else {
    console.warn(
      "Nothing imported, see instruction at top of crowdin-imports.ts"
    )
  }
}
