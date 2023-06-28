import getAndSaveDirectories from "./getAndSaveDirectories"
import getDirectoryIds from "./getDirectoryIds"
import { getTranslatedMarkdownPaths } from "../markdownChecker"
import fetchAndSaveFileIds from "./fetchAndSaveFileIds"

async function main() {
  await getAndSaveDirectories()
  const directoryIds = getDirectoryIds()
  // const translatedMarkdownPaths = getTranslatedMarkdownPaths()
  fetchAndSaveFileIds(directoryIds)
}

main()

export default main
