/* eslint-disable @typescript-eslint/no-var-requires */
// Library requires
const i18Config = require("../../i18n.config.json")
const {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
} = require("fs")
const { resolve, join } = require("path")
const argv = require("minimist")(process.argv.slice(2))

/******************************
 * Console flags              *
 ******************************/

/**
 * -b,--buckets    Prints buckets overview and exits
 * -v,--verbose    Prints verbose console logs
 * -f,--full       Prints full name of buckets in summary
 */

/******************************
 * Instructions for use       *
 ******************************/

/**
 * 1. Run `yarn crowdin-clean` to initialize fresh ./.crowdin folder. This can also be used to erase contents when finished.
 *
 * 2a. Export/import CSV of languages ready for review:
 *   1. Open "Website translation board" document in ethereum.org Notion (internal only)
 *   2. Switch view of "Translation status by language" table to "All reviewed"
 *   3. Click triple-dot (...) menu in TOP right corner of the entire app
 *   4. Select "Export" > "Export as CSV"
 *      Export format: Markdown & CSV
 *      Include databases: Current view
 *      Include content: No files or images
 *      Include subpages: Off
 *      Click "Export" > Save zip file
 *   5. Unzip contents into (or copy into) ./.crowdin folder in the root of this repo
 *
 * 2b. Alternatively, you can manually add buckets to import to the USER_OVERRIDE object below.
 *   1. Add the number of the corresponding content bucket to the chosen language array below
 *      ie. `es: [1, 10],` would import the "Homepage" and "Learn" buckets for Spanish
 *   2. Save file without committing*
 *
 * Optionally: To view summary of buckets from CSV, run `yarn crowdin-import --buckets` or `yarn crowdin-import -b`
 *   Any items in USER_OVERRIDE will override the CSV import
 *
 * 3. Export translated content from Crowdin and import into ./.crowdin folder:
 *   1. Export latest translated content from Crowdin and unzip
 *   2. Copy languages folder from Crowdin export to ./.crowdin
 *      ie. ./.crowdin/{lang-codes}
 *
 * 4. Execute script:
 *   1. Execute script by running `yarn crowdin-import`
 *   2. If successful, copy `BUILD_LOCALES={langs}` output and paste in
 *      your `.env`, then build site to test results.
 *
 * *Remember: Revert any working changes to this file before committing Crowdin import
 */

type BucketsList = { [key: string]: Array<number> }
const USER_OVERRIDE: BucketsList = {
  // FORMAT: lang_code: [bucket_number, bucket_number, ...],
  // EXAMPLE: es: [1, 10, 12, 14],
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
 * A CSV containing the language buckets that have been "Reviewed" can be exported
 * from Crowdin to automate the process of importing the needed buckets. See
 * "Instructions for use" above.
 *
 * You can alternatively use the USER_OVERRIDE object above to manually select buckets.
 *
 * The script iterates through each language chosen, using the dictionary object
 * below to convert the repo lang code to the code used by Crowdin (only if
 * needed, defaults to same). `fs` is used to find matching language folder.
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
const BUCKET_GENERATION_ONLY = Boolean(argv.b || argv.buckets)
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
  i18Config.filter((lang) => lang.code === code)?.[0]?.crowdinCode || code

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
const log = (message: unknown, ...optionalParams: unknown[]): void => {
  VERBOSE && console.log(message, ...optionalParams)
}

/**
 * Fetches CSV exported from Notion "Website translation board" table
 * See above for details on how to export CSV and import into repo
 * @returns Object containing language codes as keys, and an array of bucket numbers to be imported
 */
const fetchReviewedCsv = (): BucketsList => {
  const csvDir: string = readdirSync(crowdinRoot).filter((dir: string) =>
    dir.startsWith("Website translation board")
  )[0]
  if (!csvDir) return {}
  const path = join(crowdinRoot, csvDir)
  const reviewedCsvPath: Array<string> = readdirSync(path).filter(
    (file: string) => {
      const fileParts: Array<string> = file.split(".")
      return (
        fileParts[0].startsWith("https") &&
        !fileParts[0].endsWith("all") &&
        fileParts[1] === "csv"
      )
    }
  )[0]
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
  const langCodeIndex = headings.indexOf("code")
  const firstBucketIndex = headings.findIndex((item: string) =>
    item.startsWith("1)")
  )
  data.forEach((rowItems: Array<string>) => {
    const langCode = rowItems[langCodeIndex].split(" ").at(-1) // "es-EM → es" parses to "es"
    if (!langCode) return
    const bucketsForLang: Array<number> = []
    rowItems.forEach((item: string, idx: number) => {
      if (item.includes("Reviewed"))
        bucketsForLang.push(idx - firstBucketIndex + 1)
    })
    bucketsList[langCode] = bucketsForLang
  })
  return bucketsList
}

/**
 * If any buckets are selected in USER_OVERRIDE, use those instead of importing from CSV.
 */
const useUserOverRide =
  Object.values(USER_OVERRIDE).filter((buckets) => buckets.length > 0).length >
  0

const bucketsToImport: BucketsList = useUserOverRide
  ? USER_OVERRIDE
  : fetchReviewedCsv()

const highestBucketNumber: number = Object.values(bucketsToImport).reduce(
  (prev: number, buckets: Array<number>): number =>
    buckets[buckets.length - 1] > prev ? buckets[buckets.length - 1] : prev,
  0
)

/**
 * If BUCKET_GENERATION_ONLY (-b, --buckets) flag is enabled, show overview
 * of all langs and buckets to be imported. Also print a copy/paste ready
 * object for USER_OVERRIDE, then exit the script early.
 */
if (BUCKET_GENERATION_ONLY) {
  const bucketsOverview = {}
  Object.entries(bucketsToImport).forEach(([langCode, buckets]) => {
    bucketsOverview[langCode] = Array(highestBucketNumber - 1)
      .fill(0)
      .map((_, i) => (buckets.includes(i + 1) ? i + 1 : ""))
  })
  console.table(bucketsOverview)
  console.log("const USER_OVERRIDE: BucketsList =", bucketsToImport)
  process.exit(0)
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
const importSelection: Array<SelectionItem> = Object.keys(bucketsToImport)
  .filter((repoLangCode: string): boolean => {
    if (!bucketsToImport[repoLangCode].length) trackers.emptyBuckets++
    return !!bucketsToImport[repoLangCode].length
  })
  .map(
    (repoLangCode: string): SelectionItem => ({
      repoLangCode,
      crowdinLangCode: getCrowdinCode(repoLangCode),
      buckets: bucketsToImport[repoLangCode],
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
      trackers.langs[repoLangCode].error =
        `Path doesn't exist for lang ${crowdinLangCode}`
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
  console.log("Langs to test:", `\nBUILD_LOCALES=en${langsSummary}`)
  console.log("🎉 Crowdin import complete.")
} else {
  console.warn("Nothing imported, see instruction at top of crowdin-imports.ts")
}
