import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs"
import { join } from "path"

import i18Config from "../../../../i18n.config.json"
import { INTL_JSON_DIR, TRANSLATIONS_DIR } from "../../../lib/constants"
import { DOT_CROWDIN } from "../translations/constants"

import { BucketsList, SelectionItem, SummaryItem, TrackerObject } from "./types"

/**
 * Some language codes used in the repo differ from those used by Crowdin.
 * This is used to convert any codes that may differ when performing folder lookup.
 */
export const getCrowdinCode = (code: string): string =>
  i18Config.filter((lang) => lang.code === code)?.[0]?.crowdinCode || code

/**
 * Reads `ls` file contents of `path`, moving .md and .json files
 * to their corresponding destinations in the repo. Function is called
 * again recursively for subdirectories.
 *
 * @param path An absolute path to the directory being scraped.
 * @param contentSubpath The subpath deep to the lang-code directory,
 * used to construct destination for markdown content files
 * @param repoLangCode Language code used within the repo
 * @returns void
 */
export const scrapeDirectory = (
  path: string,
  contentSubpath: string,
  repoLangCode: string,
  trackers: TrackerObject
): void => {
  if (!existsSync(path)) return
  const ls: string[] = readdirSync(path).filter(
    (dir: string) => !dir.startsWith(".")
  )
  ls.forEach((item: string) => {
    const source: string = join(path, item)
    if (item.endsWith(".json")) {
      const jsonDestDirPath: string = join(INTL_JSON_DIR, repoLangCode)
      if (!existsSync(jsonDestDirPath))
        mkdirSync(jsonDestDirPath, { recursive: true })
      const jsonDestinationPath: string = join(jsonDestDirPath, item)
      copyFileSync(source, jsonDestinationPath)
      // Update .json tracker
      trackers.langs[repoLangCode].jsonCopyCount++
    } else if (item.endsWith(".md")) {
      const mdDestDirPath: string = join(
        TRANSLATIONS_DIR,
        repoLangCode,
        contentSubpath
      )
      if (!existsSync(mdDestDirPath))
        mkdirSync(mdDestDirPath, { recursive: true })
      const mdDestinationPath: string = join(mdDestDirPath, item)
      copyFileSync(source, mdDestinationPath)
      // Update .md tracker
      trackers.langs[repoLangCode].mdCopyCount++
    } else {
      if (!statSync(source).isDirectory()) return
      // If another directory, recursively call `scrapeDirectory`
      scrapeDirectory(
        `${path}/${item}`,
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

/**
 * ./postLangPRs.ts
 */

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
  const path: string = join(DOT_CROWDIN, crowdinLangCode)
  if (!existsSync(path)) {
    trackers.langs[repoLangCode].error =
      `Path doesn't exist for lang ${crowdinLangCode}`
    return
  }
  const langLs: string[] = readdirSync(path)
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

  // Print summary logs
  if (!summary.length) {
    console.warn(
      "Nothing imported, see instruction at top of crowdin-imports.ts"
    )
    return
  }
  console.table(summary)
  console.log("🎉 Crowdin import complete.")
}
