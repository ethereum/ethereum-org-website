import { spawn } from "child_process"

const EMPTY_STRING = "EMPTY"
const NO_VALID_MARKDOWN_FILE = "Staged Markdown Files Are Invalid"

const commonDiffCommand = [
  "diff",
  "--cached",
  "--name-only",
  "--diff-filter",
  "A",
]

const throwError = (message: string | unknown): void => {
  console.log("\x1b[91m%s\x1b[0m", "ERROR", message)
}

const throwInfo = (message: string | unknown): void => {
  console.log("\x1b[93m%s\x1b[0m", "INFO", message)
}

const getMarkdownFilesWithLanguage = (
  markdownFilesExist = false
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const markdownFilesWithLanguageCommand = spawn("git", [
      ...commonDiffCommand,
      "-G",
      "lang:[ ]*[a-zA-Z]+",
      "--",
      "src/content/*.md",
    ])

    markdownFilesWithLanguageCommand.stdout.on("data", (data: Buffer) => {
      resolve(data)
    })

    markdownFilesWithLanguageCommand.stderr.on("data", (data: Buffer) => {
      reject(data)
    })

    markdownFilesWithLanguageCommand.on("error", (error) => {
      reject(error)
    })

    // THIS WILL ONLY BE `hit` WHEN THE PROCESS closes WITHOUT AN OUTPUT
    markdownFilesWithLanguageCommand.on("close", (code) => {
      resolve(
        Buffer.from(markdownFilesExist ? NO_VALID_MARKDOWN_FILE : EMPTY_STRING)
      )
    })
  })
}

const getAllMarkdownFiles = (): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const allMarkdownFilesCommand = spawn("git", [
      ...commonDiffCommand,
      "--",
      "src/content/*.md",
    ])

    allMarkdownFilesCommand.stdout.on("data", (data: Buffer) => {
      resolve(data)
    })

    allMarkdownFilesCommand.stderr.on("data", (data: Buffer) => {
      reject(data)
    })

    allMarkdownFilesCommand.on("error", (error) => {
      reject(error)
    })

    // THIS WILL ONLY BE `hit` WHEN THE PROCESS closes WITHOUT AN OUTPUT
    allMarkdownFilesCommand.on("close", (code) => {
      resolve(Buffer.from(EMPTY_STRING))
    })
  })
}

const doAllMarkdownsHaveALanguage = async (): Promise<boolean> => {
  try {
    throwInfo("Checking Markdown Content Files")
    const allMarkdownFilesBuffer = await getAllMarkdownFiles()
    if (allMarkdownFilesBuffer.toString() !== EMPTY_STRING) {
      throwInfo("Newly Created & Staged Markdown Files Found")
      console.log(allMarkdownFilesBuffer.toString())
      const markdownFilesWithLanguageBuffer =
        await getMarkdownFilesWithLanguage(true)
      const comparisonResult = Buffer.compare(
        allMarkdownFilesBuffer,
        markdownFilesWithLanguageBuffer
      )
      if (comparisonResult === 0) {
        throwInfo("Markdown files have valid lang")
        return true
      } else {
        throwInfo("Markdown files \x1b[92mwith\x1b[0m valid lang")
        if (
          markdownFilesWithLanguageBuffer.toString() === NO_VALID_MARKDOWN_FILE
        ) {
          console.log("NONE")
        } else {
          console.log(markdownFilesWithLanguageBuffer.toString())
        }
        throwInfo("Markdown files \x1b[91mwithout\x1b[0m valid lang exists")
        return false
      }
    }
    throwInfo("No Newly Created & Staged Markdown Files Found")
    return true
  } catch (error) {
    throw error
  }
}

doAllMarkdownsHaveALanguage()
  .then((result) => {
    if (result) {
      console.log("\x1b[92m%s\x1b[0m", "SUCCESS")
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
