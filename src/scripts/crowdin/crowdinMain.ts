import getAndSaveDirectories from "./getAndSaveDirectories"
import getDirectoryIds from "./getDirectoryIds"

async function main() {
  await getAndSaveDirectories()
  const directoryIds = getDirectoryIds()
  console.log(directoryIds)
  console.log("done")
}

main()

export default main
