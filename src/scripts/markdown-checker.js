const fs = require("fs")
const path = require("path")

const PATH_TO_INTL_MARKDOWN = "./src/content/translations/"

function getAllMarkdownFiles(dirPath, arrayOfFiles = []) {
  let files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      const fileToPush = path.join(dirPath, "/", file)

      if (fileToPush.includes(".md")) {
        arrayOfFiles.push(fileToPush)
      }
    }
  })

  return arrayOfFiles
}

console.log(getAllMarkdownFiles(PATH_TO_INTL_MARKDOWN))
