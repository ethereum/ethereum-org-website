import { spawn } from "child_process"

let allMarkdownFilesBuffer = ""

const getAllMarkdownFiles = () => {
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
    console.log(data.toString("utf8"))
  })

  allMarkdownFilesCommand.on("error", (error) => {
    console.error("SHITT", error)
  })
}

getAllMarkdownFiles()
