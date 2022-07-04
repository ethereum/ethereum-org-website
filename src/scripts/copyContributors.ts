import fs from "fs"
import path from "path"

async function copyContributors() {
  const pathToProjectRoot = path.resolve("./")
  const pathToFile = path.join(pathToProjectRoot, ".all-contributorsrc")
  const pathToDestination = path.join(
    pathToProjectRoot,
    "src",
    "data",
    "contributors.json"
  )

  fs.copyFileSync(pathToFile, pathToDestination)
}

export default copyContributors
