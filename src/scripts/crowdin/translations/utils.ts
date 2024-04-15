import { execSync } from "child_process"
import fs, { readFileSync, unlinkSync, writeFileSync } from "fs"
import path from "path"
import { Readable } from "stream"
import { finished } from "stream/promises"
import ReadableStream from "stream/web"

import decompress from "decompress"

import { INTL_JSON_DIR, TRANSLATIONS_DIR } from "../../../lib/constants"

import { STARTING_BRANCH, SUMMARY_PATH } from "./constants"
import { QASummary } from "./types"

export const downloadFile = async (url: string, writePath: string) => {
  // Get directory from writePath and ensure it exists
  const dir = writePath.substring(0, writePath.lastIndexOf("/"))
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  // Remove old file at writePath if it exists
  if (fs.existsSync(writePath)) fs.rmSync(writePath)

  // Fetch data
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)

  const body = res.body as ReadableStream.ReadableStream<Uint8Array>

  const fileStream = fs.createWriteStream(writePath, { flags: "wx" })

  console.log("⬇ Downloading latest finished build to", writePath)

  await finished(Readable.fromWeb(body).pipe(fileStream))
  console.log("✅ Download complete")
}

export const decompressFile = async (filePath: string, targetDir: string) => {
  console.log(`🥡 Decompressing ${filePath} to ${targetDir}`)
  await decompress(filePath, targetDir)
  console.log("✅ Decompression complete.")
}

export const processLocale = (locale: string) => {
  const gitStatus = execSync(`git status -s | grep -E "/${locale}/" | wc -l`, {
    encoding: "utf-8",
  }).trim()
  if (+gitStatus === 0) return

  const month = new Date()
    .toLocaleString("default", { month: "long" })
    .toLowerCase()
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "")

  const branchName = `${month}-${locale}-${timestamp}`
  const message = `chore: import translations for ${locale}`

  execSync(`git checkout -b ${branchName}`)
  execSync("git reset .")
  execSync(`git add ${TRANSLATIONS_DIR}/${locale}`)
  execSync(`git add ${INTL_JSON_DIR}/${locale}`)
  execSync(`git commit -m "${message}"`)
  execSync(`git push origin ${branchName}`)

  const summaryJson: QASummary = JSON.parse(readFileSync(SUMMARY_PATH, "utf-8"))
  const qaResults = summaryJson[locale]
    ? summaryJson[locale].map((s) => "- " + s).join("\n")
    : null

  const prBody = `## Description
  This PR was automatically created to import Crowdin translations.
  This workflows runs on the first of every month at 16:20 (UTC).

  Thank you to everyone contributing to translate ethereum.org ❤️

  ## Markdown QA checker alerts
  ${
    qaResults
      ? `
      \`\`\`shell
      yarn markdown-checker
      \`\`\`l

      <details><summary>Unfold for ${summaryJson[locale].length} result(s)</summary>

  ${qaResults}
  </details>
  `
      : "No QA issues found"
  }`

  const bodyWritePath = path.resolve(process.cwd(), "body.txt")
  writeFileSync(bodyWritePath, prBody)

  // Create GitHub PR and get the PR URL from the output
  const prUrl = execSync(
    `gh pr create \
      --base dev \
      --head ${branchName} \
      --title "${message}" \
      --body-file body.txt`,
    { encoding: "utf-8" }
  ).trim()
  console.log(`PR created: ${prUrl}`)

  // Update the PR that was just posted to include the Netlify preview link
  const prNumber = prUrl.split("/").pop()
  const previewUrl = `https://deploy-preview-${prNumber}--ethereumorg.netlify.app/`
  const updatedBody =
    prBody +
    `\n\n## Preview link
    - [${previewUrl}](${previewUrl})
    `
  // Update PR with new body
  writeFileSync(bodyWritePath, updatedBody)
  execSync(`gh pr edit ${prNumber} --body-file ${bodyWritePath}`)

  unlinkSync(bodyWritePath)

  execSync(`git checkout ${STARTING_BRANCH}`)
}
