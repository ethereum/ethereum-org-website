import { spawn } from "child_process"

const commonDiffCommand = [
  "diff",
  "--cached",
  "--name-only",
  "--diff-filter",
  "AM",
]

const getMarkdownFilesWithLanguage = () => {
  return new Promise((resolve, reject) => {
    const markdownFilesWithLanguageCommand = spawn("git", [
      ...commonDiffCommand,
      "-G",
      "lang:[ ]*\\w+",
      "--",
      "src/content/*.md",
    ])

    markdownFilesWithLanguageCommand.stdout.on("data", (data) => {
      resolve(data)
    })

    markdownFilesWithLanguageCommand.stderr.on("data", (data) => {
      reject(data)
    })

    markdownFilesWithLanguageCommand.on("error", (error) => {
      reject(error)
    })
  })
}

const getAllMarkdownFiles = () => {
  return new Promise((resolve, reject) => {
    const allMarkdownFilesCommand = spawn("git", [
      ...commonDiffCommand,
      "--",
      "src/content/*.md",
    ])

    allMarkdownFilesCommand.stdout.on("data", (data) => {
      resolve(data)
    })

    allMarkdownFilesCommand.stderr.on("data", (data) => {
      reject(data)
    })

    allMarkdownFilesCommand.on("error", (error) => {
      reject(error)
    })
  })
}

const doAllMarkdownsHaveALanguage = async () => {
  try {
    console.log("Checking Markdown Content Files")
    const allMarkdownFilesBuffer = await getAllMarkdownFiles()
    const markdownFilesWithLanguageBuffer = await getMarkdownFilesWithLanguage()
    const comparisonResult = Buffer.compare(
      allMarkdownFilesBuffer,
      markdownFilesWithLanguageBuffer
    )
    return comparisonResult === 0 ? true : false
  } catch (error) {
    throw error
  }
}

const throwError = (message) => {
  console.log("\x1b[91m%s\x1b[0m", "ERROR", message)
}

doAllMarkdownsHaveALanguage()
  .then((result) => {
    if (result) {
      process.exitCode = 0
    } else {
      throwError(
        "Markdown content needs to have a lang attribute in the frontmatter"
      )
      process.exitCode = 1
    }
  })
  .catch((error) => {
    throwError("checkMarkdownLanguage Hook Failed")
    process.exitCode = 1
  })
