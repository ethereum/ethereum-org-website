const { copyFileSync, existsSync, mkdirSync, readdirSync } = require("fs")
const { resolve, join } = require("path")

/**
 * 0. Console summary flags
 */
const VERBOSE = false
const FULL_BUCKET_NAME_SUMMARY = false

/**
 * 1. Copy languages folder from Crowdin export to ./.crowdin, or enter override
 * to point to local unzipped download folder
 * ie: /Home/alice/Downloads/Ethereum.org Translations (translations)/
 */
const CROWDIN_ROOT_OVERRIDE = ""

/**
 * 2. Select languages and buckets to import by adding the number of the
 * corresponding content bucket to the `buckets` array
 * ie. `buckets: [1, 10],` would import the "Homepage" and "Learn" buckets
 */
const SELECTION = [
  {
    lang: "ar",
    buckets: [],
  },
  {
    lang: "az",
    buckets: [],
  },
  {
    lang: "bg",
    buckets: [],
  },
  {
    lang: "bn",
    buckets: [],
  },
  {
    lang: "ca",
    buckets: [],
  },
  {
    lang: "cs",
    buckets: [],
  },
  {
    lang: "da",
    buckets: [],
  },
  {
    lang: "de",
    buckets: [],
  },
  {
    lang: "el",
    buckets: [],
  },
  {
    lang: "es",
    buckets: [],
  },
  {
    lang: "fa",
    buckets: [],
  },
  {
    lang: "fi",
    buckets: [],
  },
  {
    lang: "fr",
    buckets: [],
  },
  {
    lang: "gl",
    buckets: [],
  },
  {
    lang: "hi",
    buckets: [],
  },
  {
    lang: "hr",
    buckets: [],
  },
  {
    lang: "hu",
    buckets: [],
  },
  {
    lang: "id",
    buckets: [],
  },
  {
    lang: "ig",
    buckets: [],
  },
  {
    lang: "it",
    buckets: [],
  },
  {
    lang: "ja",
    buckets: [],
  },
  {
    lang: "ka",
    buckets: [],
  },
  {
    lang: "kk",
    buckets: [],
  },
  {
    lang: "ko",
    buckets: [],
  },
  {
    lang: "lt",
    buckets: [],
  },
  {
    lang: "ml",
    buckets: [],
  },
  {
    lang: "ms",
    buckets: [],
  },
  {
    lang: "mr",
    buckets: [],
  },
  {
    lang: "nb",
    buckets: [],
  },
  {
    lang: "nl",
    buckets: [],
  },
  {
    lang: "ph",
    buckets: [],
  },
  {
    lang: "pl",
    buckets: [],
  },
  {
    lang: "pt",
    buckets: [],
  },
  {
    lang: "pt-br",
    buckets: [],
  },
  {
    lang: "ro",
    buckets: [],
  },
  {
    lang: "ru",
    buckets: [],
  },
  {
    lang: "se",
    buckets: [],
  },
  {
    lang: "sk",
    buckets: [],
  },
  {
    lang: "sl",
    buckets: [],
  },
  {
    lang: "sr",
    buckets: [],
  },
  {
    lang: "sw",
    buckets: [],
  },
  {
    lang: "th",
    buckets: [],
  },
  {
    lang: "tr",
    buckets: [],
  },
  {
    lang: "uk",
    buckets: [],
  },
  {
    lang: "vi",
    buckets: [],
  },
  {
    lang: "zh",
    buckets: [],
  },
  {
    lang: "zh-tw",
    buckets: [],
  },
]
/**
 * 3. Execute script by running `yarn crowdin-import`
 */

/******************************
 * Primary script logic below *
 ******************************/

// Initialize root paths
const repoRoot = resolve("./")
const crowdinRoot =
  CROWDIN_ROOT_OVERRIDE !== repoRoot
    ? resolve(CROWDIN_ROOT_OVERRIDE)
    : join(repoRoot, ".crowdin")
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
  "Contributing",
  "Developer Tutorials I",
  "Developer Tutorials II",
  "Developer Tutorials III",
]

// Initialize trackers object
const trackers = {
  emptyBuckets: 0,
}

// Filter out empty requests and map selection to usable array
const importSelection = SELECTION.filter(({ buckets }) => {
  if (buckets.length === 0) trackers.emptyBuckets++
  return buckets.length > 0
}).map(({ lang: repoLangCode, buckets }) => {
  const crowdinLangCode = repoToCrowdinCode[repoLangCode] || repoLangCode
  return { repoLangCode, crowdinLangCode, buckets }
})

const scrapeDirectory = (_path, contentSubpath, repoLangCode) => {
  if (!existsSync(_path)) return null
  const ls = readdirSync(_path).filter((dir) => !dir.startsWith("."))
  ls.forEach((item) => {
    const source = resolve(`${_path}/${item}`)
    if (item.endsWith(".json")) {
      const jsonDestinationPath = join(
        repoRoot,
        "src",
        "intl",
        repoLangCode,
        item
      )
      if (VERBOSE)
        console.log("Copy .json from", source, "to", jsonDestinationPath)
      copyFileSync(source, jsonDestinationPath)
      // Update .json tracker
      trackers[repoLangCode].jsonCopyCount++
    } else if (item.endsWith(".md")) {
      const destDirPath = join(
        repoRoot,
        "src",
        "content",
        "translations",
        repoLangCode,
        contentSubpath
      )
      const mdDestinationPath = join(destDirPath, item)
      if (!existsSync(destDirPath)) {
        mkdirSync(destDirPath, { recursive: true })
      }
      if (VERBOSE) console.log("Copy .md from", source, "to", mdDestinationPath)
      copyFileSync(source, mdDestinationPath)
      // Update .md tracker
      trackers[repoLangCode].mdCopyCount++
    } else {
      if (VERBOSE) console.log(`Entering ${_path}/${item}`)
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
console.table(summary)
console.log("Empty buckets:", trackers.emptyBuckets)
console.log("🎉 Crowdin import complete.")
