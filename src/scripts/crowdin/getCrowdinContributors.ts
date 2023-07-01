import getAndSaveDirectories from "./source-files/fetchAndSaveDirectories"
import getDirectoryIds from "./utils"
import { getTranslatedMarkdownPaths } from "../markdownChecker"
import fetchAndSaveFileIds from "./source-files/fetchAndSaveFileIds"
import getTranslationCostsReport from "./reports/getTranslationCostsReport"

async function main() {
  await getAndSaveDirectories()
  const directoryIds = getDirectoryIds()
  await fetchAndSaveFileIds(directoryIds)
  const translatedMarkdownPaths = await getTranslatedMarkdownPaths()
  await getTranslationCostsReport(translatedMarkdownPaths)
}

main()

export default main
