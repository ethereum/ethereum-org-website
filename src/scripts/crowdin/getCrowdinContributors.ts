import { getTranslatedMarkdownPaths } from "../markdownChecker"

import getTranslationCostsReports from "./reports/getTranslationCostsReports"
import getAndSaveDirectories from "./source-files/fetchAndSaveDirectories"
import fetchAndSaveFileIds from "./source-files/fetchAndSaveFileIds"
import getDirectoryIds from "./utils"

async function main() {
  await getAndSaveDirectories()
  const directoryIds = getDirectoryIds()
  await fetchAndSaveFileIds(directoryIds)
  const translatedMarkdownPaths = await getTranslatedMarkdownPaths()
  await getTranslationCostsReports(translatedMarkdownPaths)
}

main()

export default main
