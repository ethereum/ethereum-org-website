import fs from "fs"
import { join } from "path"

import { CONTENT_DIR, INTERNAL_TUTORIALS_JSON } from "../lib/constants"

const tutorialsDir = join(CONTENT_DIR, "developers/tutorials")

try {
  const folders = fs
    .readdirSync(tutorialsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((folderName) => {
      // Check if index.md exists
      const indexPath = join(tutorialsDir, folderName, "index.md")
      return fs.existsSync(indexPath)
    })
    .sort()

  fs.writeFileSync(INTERNAL_TUTORIALS_JSON, JSON.stringify(folders, null, 2))
  console.log(
    `Updated ${INTERNAL_TUTORIALS_JSON} with ${folders.length} tutorials`
  )
} catch (error) {
  console.error("Error updating tutorials list:", error)
  process.exit(1)
}
