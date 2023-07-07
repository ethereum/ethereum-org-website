import fs from "fs"
import path from "path"

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
      const normalizedPath = path.replace(
        new RegExp(`^src/content/translations/${lang}/`),
        ""
      )

      if (!pathToIdMap[normalizedPath]) {
        console.warn(`Lang ${lang}, NULL ID:`, normalizedPath)
        return null
      }

      return pathToIdMap[normalizedPath]
    })
    .filter(Boolean) // filter falsy values
}

export default getDirectoryIdsFromJson
