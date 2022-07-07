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

// Initialize trackers object
const trackers = {
  emptyBuckets: 0,
}

const log = (message, ...optionalParams) =>
  VERBOSE && console.log(message, ...optionalParams)

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

// Iterate through and scrape selected buckets
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
