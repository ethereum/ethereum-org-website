const fs = require("fs")
const path = require("path")

async function main() {
  const pathToProjectRoot = __dirname.split("/").slice(0, -2).join("/")
  const pathToFile = path.join(pathToProjectRoot, ".all-contributorsrc")
  const pathToDestination = path.join(
    pathToProjectRoot,
    "src",
    "data",
    "contributors.json"
  )

  fs.copyFileSync(pathToFile, pathToDestination)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
