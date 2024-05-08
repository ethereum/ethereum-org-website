import { getTranslatedMarkdownPaths } from "../markdownChecker"

import getTranslationCostsReports from "./reports/getTranslationCostsReports"
import fetchAndSaveFileIds from "./source-files/fetchAndSaveFileIds"
import getDirectoryIds from "./utils"

async function main() {
  const directoryIds = getDirectoryIds()
  await fetchAndSaveFileIds(directoryIds)
  const translatedMarkdownPaths = await getTranslatedMarkdownPaths()
  await getTranslationCostsReports(translatedMarkdownPaths)
}

main()

export default main
