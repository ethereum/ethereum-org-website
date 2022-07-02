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
      "lang:",
      "--",
      "*.md",
    ])

    markdownFilesWithLanguageCommand.stdout.on("data", (data) => {
      console.log(data.toString("utf8"))
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
      "*.md",
    ])

    allMarkdownFilesCommand.stdout.on("data", (data) => {
      console.log(data.toString("utf8"))
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
  const allMarkdownFilesBuffer = await getAllMarkdownFiles()
  const markdownFilesWithLanguageBuffer = await getMarkdownFilesWithLanguage()
  const comparisonResult = Buffer.compare(
    allMarkdownFilesBuffer,
    markdownFilesWithLanguageBuffer
  )
  return comparisonResult === 0 ? true : false
}

doAllMarkdownsHaveALanguage()
  .then((result) => {
    if (result) {
      process.exitCode = 0
    } else {
      process.exitCode = 1
    }
  })
  .catch((error) => {
    process.exitCode = 1
  })
