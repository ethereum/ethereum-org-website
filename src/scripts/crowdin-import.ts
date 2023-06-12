// Library requires
const i18Config = require("../../i18n/config.json")
const { copyFileSync, existsSync, mkdirSync, readdirSync } = require("fs")
const { resolve, join } = require("path")
const argv = require("minimist")(process.argv.slice(2))
/**
 * Console flags
 * -v,--verbose    Prints verbose console logs
 * -f,--full       Prints full name of buckets in summary
 *
 *
 * Follow these steps to import translations from Crowdin export:
 *
 * 1. Copy languages folder from Crowdin export to ./.crowdin
 *    ie. ./.crowdin/{lang-codes}
 *    Tip: Run `yarn crowdin-clean` to initialize the `.crowdin` folder. Can
 *    also be used to erase contents when finished.
 *
 * 2. Select buckets to import by adding the number of the corresponding
 *    content bucket to the chosen language array below
 *    ie. `es: [1, 10],` would import the "Homepage" and "Learn" buckets for Spanish
 *
 * 3. Save file without committing
 *
 * 4. Execute script by running `yarn crowdin-import`
 *
 * 5. If successful, copy `GATSBY_BUILD_LANGS={langs}` output and paste in
 *    your `.env`, then build site to test results.
 *
 * Remember: Revert working changes to this file before committing Crowdin import
 */

type UserSelectionObject = { [key: string]: Array<number> }
const USER_SELECTION: UserSelectionObject = {
  ar: [],
  az: [],
  bg: [],
  bn: [],
  ca: [],
  cs: [],
  da: [],
  de: [],
  el: [],
  es: [],
  fa: [],
  fi: [],
  fr: [],
  gl: [],
  gu: [],
  hi: [],
  hr: [],
  hu: [],
  id: [],
  ig: [],
  it: [],
  ja: [],
  ka: [],
  kk: [],
  km: [],
  ko: [],
  lt: [],
  ml: [],
  ms: [],
  mr: [],
  nb: [],
  nl: [],
  pcm: [],
  ph: [],
  pl: [],
  pt: [],
  "pt-br": [],
  ro: [],
  ru: [],
  se: [],
  sk: [],
  sl: [],
  sr: [],
  sw: [],
  ta: [],
  th: [],
  tr: [],
  uk: [],
  uz: [],
  vi: [],
  zh: [],
  "zh-tw": [],
}

/******************************
 * Primary script logic below *
 ******************************/

/**
 * Exported languages from Crowdin come as a .zip file, when unzipped contains
 * one folder for each language, using Crowdin language codes (which differ
 * slight from those used in the repo). These folders must be copied into the
 * root `.crowdin` folder of this repo.
 *
 * Using the USER_SELECTION object above, the script iterates through each
 * language chosen, using the dictionary object below to convert the repo lang
 * code to the code used by Crowdin (only if needed, defaults to same). `fs`
 * is used to find matching language folder.
 *
 * The "buckets" chosen (type number[]) are then iterated over, opening the
 * corresponding folder that begins with the same number string (formatted 00).
 *
 * Each selected bucket folder is then iterated over, calling the
 * `scrapeDirectory(_path, contentSubpath, repoLangCode)` function. This function
 * iterates over every file contained in the working directory. If the filetype
 * is `.json` the file is moved to the `/src/intl/{lang}/` directory. If the
 * filetype is `.md` the `contentSubpath` is used to copy the file to its
 * correct place in `/src/content/translations/{lang}/{contentSubpath}.
 *
 * If the directory item is another directory, `scrapeDirectory` is called
 * recursively, passing the new `_path` and `contentSubpath`. The base case for
 * this function is no more directory items remaining, and returns void.
 */

// Initialize console arguments
const VERBOSE = Boolean(argv.v || argv.verbose)
const FULL_BUCKET_NAME_SUMMARY = Boolean(argv.f || argv.full)

// Initialize root paths
const repoRoot: string = resolve("./")
const crowdinRoot: string = join(repoRoot, ".crowdin")
// If first time, create directory for user
if (!existsSync(crowdinRoot)) mkdirSync(crowdinRoot)

/**
 * Some language codes used in the repo differ from those used by Crowdin.
 * This is used to convert any codes that may differ when performing folder lookup.
 */
const getCrowdinCode = (code: string): string =>
  i18Config.filter((lang) => lang.code === code)?.[0].crowdinCode || code

/**
 * Names for each bucket in order, zero indexed.
 * Used for lookup in summary if FULL_BUCKET_NAME_SUMMARY (-f,--full) flag enabled.
 */
const BUCKET_NAMES: Array<string> = [
  "Homepage",
  "Use Ethereum Pages",
  "Use Case Pages",
  "Upgrades",
  "Community Pages",
  "Docs - Foundational Pages",
  "Docs - Tech Stack Pages",
  "Whitepaper",
  "Docs - Advanced Pages",
  "Learn Pages",
  "Research Documentation",
  "Contributing",
  "Developer Tutorials I",
  "Developer Tutorials II",
  "Developer Tutorials III",
]

// Initialize trackers object for summary
type LangTrackerEntry = {
  buckets: Array<string>
  jsonCopyCount: number
  mdCopyCount: number
  error: string
}
type TrackerObject = {
  emptyBuckets: number
  langs: {
    [key: string]: LangTrackerEntry
  }
}
const trackers: TrackerObject = {
  emptyBuckets: 0,
  langs: {},
}

// Functions
/**
 * Wrapper function to call console.log() only if VERBOSE (-v, --verbose) flag is enabled
 *
 * @param message Any arbitrary message
 * @param optionalParams Any additional arbitrary messages
 */
const log = (message: any, ...optionalParams: any): void => {
  VERBOSE && console.log(message, ...optionalParams)
}
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
const scrapeDirectory = (
  _path: string,
  contentSubpath: string,
  repoLangCode: string
): void => {
  if (!existsSync(_path)) return
  const ls: Array<string> = readdirSync(_path).filter(
    (dir: string) => !dir.startsWith(".")
  )
  ls.forEach((item: string) => {
    const source: string = join(_path, item)
    if (item.endsWith(".json")) {
      const jsonDestDirPath: string = join(
        repoRoot,
        "src",
        "intl",
        repoLangCode
      )
      if (!existsSync(jsonDestDirPath))
        mkdirSync(jsonDestDirPath, { recursive: true })
      const jsonDestinationPath: string = join(jsonDestDirPath, item)
      log("Copy .json from", source, "to", jsonDestinationPath)
      copyFileSync(source, jsonDestinationPath)
      // Update .json tracker
      trackers.langs[repoLangCode].jsonCopyCount++
    } else if (item.endsWith(".md")) {
      const mdDestDirPath: string = join(
        repoRoot,
        "src",
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
        repoLangCode
      )
    }
  })
}

// Filter out empty requests and map selection to usable array
type SelectionItem = {
  repoLangCode: string
  crowdinLangCode: string
  buckets: Array<number>
}
const importSelection: Array<SelectionItem> = Object.keys(USER_SELECTION)
  .filter((repoLangCode: string): boolean => {
    if (!USER_SELECTION[repoLangCode].length) trackers.emptyBuckets++
    return !!USER_SELECTION[repoLangCode].length
  })
  .map(
    (repoLangCode: string): SelectionItem => ({
      repoLangCode,
      crowdinLangCode: getCrowdinCode(repoLangCode),
      buckets: USER_SELECTION[repoLangCode],
    })
  )

// Iterate through each selected language
importSelection.forEach(
  ({ repoLangCode, crowdinLangCode, buckets }: SelectionItem): void => {
    // Initialize tracker for language
    trackers.langs[repoLangCode] = {
      buckets: [],
      jsonCopyCount: 0,
      mdCopyCount: 0,
      error: "",
    }
    // Initialize working directory and check for existence
    const _path: string = join(crowdinRoot, crowdinLangCode)
    if (!existsSync(_path)) {
      trackers.langs[
        repoLangCode
      ].error = `Path doesn't exist for lang ${crowdinLangCode}`
      return
    }
    const langLs: Array<string> = readdirSync(_path)
    // Iterate over each selected bucket, scraping contents with `scrapeDirectory`
    buckets.forEach((bucket: number): void => {
      const paddedBucket: string = bucket.toString().padStart(2, "0")
      let bucketDirName = ""
      langLs.forEach((bucketName: string) => {
        bucketDirName += bucketName.startsWith(paddedBucket) ? bucketName : ""
      })
      const bucketDirectoryPath: string = `${crowdinRoot}/${crowdinLangCode}/${bucketDirName}`
      // Initial scrapeDirectory function call
      scrapeDirectory(bucketDirectoryPath, ".", repoLangCode)
      // Update tracker
      trackers.langs[repoLangCode].buckets.push(BUCKET_NAMES[bucket - 1])
    })
  }
)

// Construct console summary
type SummaryItem = {
  repoLangCode: string
  buckets: Array<string> | Array<number>
  jsonCopyCount: number
  mdCopyCount: number
  error?: string
}
const summary: Array<SummaryItem> = importSelection.map(
  (item: SelectionItem): SummaryItem => {
    const { buckets: bucketNumbers, repoLangCode } = item
    const {
      buckets: bucketNames,
      jsonCopyCount,
      mdCopyCount,
      error,
    } = trackers.langs[repoLangCode]
    return {
      repoLangCode,
      buckets: FULL_BUCKET_NAME_SUMMARY ? bucketNames : bucketNumbers,
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
  console.log("Langs to test:", `\nGATSBY_BUILD_LANGS=en${langsSummary}`)
  console.log("🎉 Crowdin import complete.")
} else {
  console.warn("Nothing imported, see instruction at top of crowdin-imports.ts")
}
