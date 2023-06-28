import fs from "fs"
import path from "path"

function getDirectoryIdsFromJson() {
  try {
    const filePath = path.join(
      __dirname,
      "../../data/crowdin/translation-buckets-dirs.json"
    )
    const directoriesData = fs.readFileSync(filePath)
    const directories = JSON.parse(directoriesData.toString()) // Convert Buffer to string
    return directories.map((directory) => directory.id)
  } catch (error) {
    console.error(`Error reading translation-buckets-dirs.json: ${error}`)
    return []
  }
}

export default getDirectoryIdsFromJson
