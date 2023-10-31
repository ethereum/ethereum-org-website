import fetchAndSaveFileIds from "./source-files/fetchAndSaveFileIds"
import getAndSaveDirectories from "./source-files/fetchAndSaveDirectories"
import getDirectoryIds from "./utils"
import getTranslationCostsReports from "./reports/getTranslationCostsReports"
import { getTranslatedMarkdownPaths } from "../markdownChecker"

async function main() {
  await getAndSaveDirectories()
  const directoryIds = getDirectoryIds()
  await fetchAndSaveFileIds(directoryIds)
  const translatedMarkdownPaths = await getTranslatedMarkdownPaths()
  await getTranslationCostsReports(translatedMarkdownPaths)
}

main()

export default main
