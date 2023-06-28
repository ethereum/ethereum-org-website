import getAndSaveDirectories from "./getAndSaveDirectories"
import getDirectoryIds from "./getDirectoryIds"
import { getTranslatedMarkdownPaths } from "../markdownChecker"

async function main() {
  await getAndSaveDirectories()
  const directoryIds = getDirectoryIds()
  const translatedMarkdownPaths = getTranslatedMarkdownPaths()
}

main()

export default main
