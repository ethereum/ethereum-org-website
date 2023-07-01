import getAndSaveDirectories from "./source-files/fetchAndSaveDirectories"
import getDirectoryIds from "./getDirectoryIds"
import { getTranslatedMarkdownPaths } from "../markdownChecker"
import fetchAndSaveFileIds from "./fetchAndSaveFileIds"
import fetchTranslationCostsReport from "./reports/fetchTranslationCostsReport"
import getCrowdinCode from "../../utils/getCrowdinCode"
import fs from "fs"
import path from "path"

async function main() {
  await getAndSaveDirectories()
  const directoryIds = getDirectoryIds()
  await fetchAndSaveFileIds(directoryIds)
  const translatedMarkdownPaths = await getTranslatedMarkdownPaths()
  await generateReports(translatedMarkdownPaths)
}

async function generateReports(translatedMarkdownPaths) {
  for (let lang in translatedMarkdownPaths) {
    // break into function
    const fileIds = await findFileIdsByPaths(
      translatedMarkdownPaths[lang],
      lang
    )
    console.time(`${lang} time: Number of files: ${fileIds.length}`)
    // console.log(lang)
    // console.log(fileIds)
    // For each file ID...

    // The CrowdinCode is often different from what we use in our repo
    const crowdinLangCode = await getCrowdinCode(lang)

    for (const fileId of fileIds) {
      // If a file ID was found...
      if (fileId !== null) {
        // Generate the report
        await fetchTranslationCostsReport(fileId, crowdinLangCode)
      } else {
        console.log("Error: No file ID found for one of the paths")
      }
    }

    console.timeEnd(`${lang} time: Number of files: ${fileIds.length}`)
    // console.timeLog(`${lang} time: Number of ${fileIds.length}`)
  }
}

async function findFileIdsByPaths(paths, lang) {
  const filePath = path.join(__dirname, "../../data/crowdin/file-ids.json")

  const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"))
  // console.log(fileData)

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

main()

export default main
