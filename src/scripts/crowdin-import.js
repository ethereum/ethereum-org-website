const { copyFileSync, existsSync, mkdirSync, readdirSync } = require("fs")
const { resolve, join } = require("path")

/**
 * 0. Console summary flags
 */
const VERBOSE = false
const FULL_BUCKET_NAME_SUMMARY = false

/**
 * 1. Copy languages folder from Crowdin export to ./.crowdin
 * ie. ./.crowdin/{lang-codes}
 *
 * 2. Select buckets to import by adding the number of the corresponding
 * content bucket to the chosen language array below
 * ie. `buckets: [1, 10],` would import the "Homepage" and "Learn" buckets
 */
const USER_SELECTION = {
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
  hi: [],
  hr: [],
  hu: [],
  id: [],
  ig: [],
  it: [],
  ja: [],
  ka: [],
  kk: [],
  ko: [],
  lt: [],
  ml: [],
  ms: [],
  mr: [],
  nb: [],
  nl: [],
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
  th: [],
  tr: [],
  uk: [],
  vi: [],
  zh: [],
  "zh-tw": [],
}
/**
 * 3. Save file without committing
 * 4. Execute script by running `yarn crowdin-import`
 */

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

// Initialize root paths
const repoRoot = resolve("./")
const crowdinRoot = join(repoRoot, ".crowdin")
// If first time, create directory for user
if (!existsSync(crowdinRoot)) mkdirSync(crowdinRoot)

// Dictionaries
const repoToCrowdinCode = {
  zh: "zh-CN",
  "zh-tw": "zh-TW",
  ph: "fil",
  es: "es-EM",
  "pt-br": "pt-BR",
  pt: "pt-PT",
  ml: "ml-IN",
  sr: "sr-CS",
}

const BUCKET_NAMES = [
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
const trackers = {
  emptyBuckets: 0,
}

// Functions
const log = (message, ...optionalParams) =>
  VERBOSE && console.log(message, ...optionalParams)

const scrapeDirectory = (_path, contentSubpath, repoLangCode) => {
  if (!existsSync(_path)) return null
  const ls = readdirSync(_path).filter((dir) => !dir.startsWith("."))
  ls.forEach((item) => {
    const source = resolve(`${_path}/${item}`)
    if (item.endsWith(".json")) {
      const jsonDestDirPath = join(repoRoot, "src", "intl", repoLangCode)
      if (!existsSync(jsonDestDirPath))
        mkdirSync(jsonDestDirPath, { recursive: true })
      const jsonDestinationPath = join(jsonDestDirPath, item)
      log("Copy .json from", source, "to", jsonDestinationPath)
      copyFileSync(source, jsonDestinationPath)
      // Update .json tracker
      trackers[repoLangCode].jsonCopyCount++
    } else if (item.endsWith(".md")) {
      const mdDestDirPath = join(
        repoRoot,
        "src",
        "content",
        "translations",
        repoLangCode,
        contentSubpath
      )
      if (!existsSync(mdDestDirPath))
        mkdirSync(mdDestDirPath, { recursive: true })
      const mdDestinationPath = join(mdDestDirPath, item)
      log("Copy .md from", source, "to", mdDestinationPath)
      copyFileSync(source, mdDestinationPath)
      // Update .md tracker
      trackers[repoLangCode].mdCopyCount++
    } else {
      log(`Entering ${_path}/${item}`)
      scrapeDirectory(
        `${_path}/${item}`,
        `${contentSubpath}/${item}`,
        repoLangCode
      )
    }
  })
}

// Filter out empty requests and map selection to usable array
const importSelection = Object.keys(USER_SELECTION)
  .filter((repoLangCode) => {
    if (!USER_SELECTION[repoLangCode].length) trackers.emptyBuckets++
    return !!USER_SELECTION[repoLangCode].length
  })
  .map((repoLangCode) => ({
    repoLangCode,
    crowdinLangCode: repoToCrowdinCode[repoLangCode] || repoLangCode,
    buckets: USER_SELECTION[repoLangCode],
  }))

// Iterate through each selected language
importSelection.forEach(({ repoLangCode, crowdinLangCode, buckets }) => {
  // Initialize tracker for language
  trackers[repoLangCode] = {
    buckets: [],
    jsonCopyCount: 0,
    mdCopyCount: 0,
    error: "",
  }
  // Initialize working directory and check for existence
  const _path = join(crowdinRoot, crowdinLangCode)
  if (!existsSync(_path)) {
    trackers[
      repoLangCode
    ].error = `Path doesn't exist for lang ${crowdinLangCode}`
    return
  }
  const langLs = readdirSync(_path)
  // Iterate over each selected bucket, scraping contents with `scrapeDirectory`
  buckets.forEach((bucket) => {
    const paddedBucket = bucket.toString().padStart(2, "0")
    let bucketDirName = ""
    langLs.forEach((bucketName) => {
      bucketDirName += bucketName.startsWith(paddedBucket) ? bucketName : ""
    })
    const bucketDirectoryPath = `${crowdinRoot}/${crowdinLangCode}/${bucketDirName}`
    // Initial scrapeDirectory function call
    scrapeDirectory(bucketDirectoryPath, ".", repoLangCode)
    // Update tracker
    trackers[repoLangCode].buckets.push(BUCKET_NAMES[bucket - 1])
  })
})

// Console summary
const summary = importSelection.map((item) => {
  const { buckets: bucketNumbers, repoLangCode } = item
  const {
    buckets: bucketNames,
    jsonCopyCount,
    mdCopyCount,
    error,
  } = trackers[repoLangCode]
  return {
    repoLangCode,
    buckets: FULL_BUCKET_NAME_SUMMARY ? bucketNames : bucketNumbers,
    jsonCopyCount,
    mdCopyCount,
    error,
  }
})
const langsSummary = summary.reduce(
  (prev, { repoLangCode }) => `${prev},${repoLangCode}`,
  ""
)

log("Empty buckets:", trackers.emptyBuckets)
console.table(summary)
console.log("Langs to test:", `\nGATSBY_BUILD_LANGS=en${langsSummary}`)
console.log("🎉 Crowdin import complete.")
