import { spawn } from "child_process"

let allMarkdownFilesBuffer = ""

const getAllMarkdownFiles = () => {
  return new Promise((resolve, reject) => {
    const allMarkdownFilesCommand = spawn("git", [
      "diff",
      "--cached",
      "--name-only",
      "--diff-filter",
      "AM",
      "--",
      "*.md",
    ])

    allMarkdownFilesCommand.stdout.on("data", (data) => {
      console.log(data.toString("utf8"))
      allMarkdownFilesBuffer = data
    })

    allMarkdownFilesCommand.stderr.on("data", (data) => {
      reject(data)
    })

    allMarkdownFilesCommand.on("error", (error) => {
      reject(error)
    })
  })
}

await getAllMarkdownFiles()
