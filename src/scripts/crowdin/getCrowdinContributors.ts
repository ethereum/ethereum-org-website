import getAndSaveDirectories from "./source-files/fetchAndSaveDirectories"
import getDirectoryIds from "./utils"
import { getTranslatedMarkdownPaths } from "../markdownChecker"
import fetchAndSaveFileIds from "./source-files/fetchAndSaveFileIds"
import getTranslationCostsReports from "./reports/getTranslationCostsReports"

async function main() {
  await getAndSaveDirectories()
  const directoryIds = getDirectoryIds()
  await fetchAndSaveFileIds(directoryIds)
  const translatedMarkdownPaths = await getTranslatedMarkdownPaths()
  await getTranslationCostsReports(translatedMarkdownPaths)
}

main()

export default main
