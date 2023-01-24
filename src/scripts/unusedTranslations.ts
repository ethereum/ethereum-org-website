import fs from "fs"
import path from "path"
import walkdir from "walkdir"
import _ from "lodash"
import { defaultLanguage } from "../utils/languages"

const input = "src/intl"

const whitelist = [
  "src/components",
  "src/pages",
  "src/pages-conditional",
  "src/templates",
  "src/data",
  "src/content",
]

/**
 * Look for unsed translations keys in the provided `paths`.
 *
 * - For each file found in `src/intl/{defaultLang}/`
 * - Reads all the translation keys
 * - Looks for each translation key on the different `paths` provided
 */
async function unusedTranslations(paths = whitelist) {
  const files = await loadFiles(paths)

  let totalCount = 0

  walkdir.sync(path.join(input, defaultLanguage), (filepath) => {
    console.log(`==============================`)
    console.log(`analyzing ${filepath} ...`)

    const data = fs.readFileSync(filepath, { encoding: "utf8" })
    const translations = JSON.parse(data)

    const keys = Object.keys(translations)

    let count = 0
    keys.forEach((key) => {
      const found = files.some((file) => file.indexOf(key) > 0)

      if (!found) {
        // translation key is not being used
        console.log(`${key} key is not being used`)
        count++
      }
    })

    totalCount += count

    console.log(`keys not used in this namespace: ${count}`)
  })

  console.log(`total keys not used: ${totalCount}`)
}

/**
 * Reads and loads all the files found in `paths`.
 */
async function loadFiles(paths: Array<string>): Promise<Array<string>> {
  const files: Array<string> = []

  const promises = paths.map(async (path) => {
    const result = await walkdir.async(path, {
      return_object: true,
    })

    const promises = Object.entries(result).map(async ([filepath, stats]) => {
      // @ts-ignore
      if (!stats.isDirectory()) {
        try {
          const data = await fs.promises.readFile(filepath, "utf8")
          files.push(data)
        } catch (error) {
          console.log(`error reading ${filepath}`)
          console.error(error)
        }
      }
    })

    await Promise.all(promises)
  })

  await Promise.all(promises)

  return files
}

unusedTranslations()
