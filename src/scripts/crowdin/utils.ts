import fs from "fs"
import path from "path"

import { languagePathRootRegExp } from "../../lib/constants"
import type { I18nLocale } from "../../lib/types"

export function getDirectoryIdsFromJson() {
  try {
    const filePath = path.join(
      __dirname,
      "../../data/crowdin/translation-buckets-dirs.json"
    )
    const directoriesData = fs.readFileSync(filePath)
    const directories = JSON.parse(directoriesData.toString())
    return directories.map((directory) => directory.id)
  } catch (error) {
    console.error(`Error reading translation-buckets-dirs.json: ${error}`)
    return []
  }
}

export async function findFileIdsByPaths(paths, lang) {
  const filePath = path.join(__dirname, "../../data/crowdin/file-ids.json")
  const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"))

  const pathToIdMap = fileData.reduce((map, item) => {
    // Normalize the item path: remove leading and trailing slashes
    const normalizedItemPath = item.path.replace(/^\/+|\/+$/g, "")
    map[normalizedItemPath] = item.id
    return map
  }, {})

  return paths
    .map((path) => {
      const normalizedPath = path.replace(languagePathRootRegExp, "")

      if (!pathToIdMap[normalizedPath]) {
        console.warn(`Lang ${lang}, NULL ID:`, normalizedPath)
        return null
      }

      return pathToIdMap[normalizedPath]
    })
    .filter(Boolean) // filter falsy values
}

export async function getCrowdinCode(langCode: string): Promise<string> {
  try {
    const data = await fs.promises.readFile("i18n.config.json", "utf-8")
    const langs: I18nLocale[] = JSON.parse(data)
    const lang = langs.find((lang) => lang.code === langCode)

    if (!lang) {
      throw new Error(`Language code ${langCode} not found`)
    }

    return lang.crowdinCode
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Error: ${error.message}`)
    return ""
  }
}

export async function getLangCodeFromCrowdinCode(
  crowdinCode: string
): Promise<string> {
  try {
    const data = await fs.promises.readFile("i18n.config.json", "utf-8")
    const locales: I18nLocale[] = JSON.parse(data)
    const locale = locales.find((item) => item.crowdinCode === crowdinCode)

    if (!locale) {
      throw new Error(`CrowdinCode ${crowdinCode} not found`)
    }

    return locale.code
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Error: ${error.message}`)
    return ""
  }
}

export default getDirectoryIdsFromJson
