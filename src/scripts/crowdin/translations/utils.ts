import { execSync } from "child_process"
import fs, { unlinkSync, writeFileSync } from "fs"
import path from "path"
import { Readable } from "stream"
import { finished } from "stream/promises"
import ReadableStream from "stream/web"

import decompress from "decompress"

import { INTL_JSON_DIR, TRANSLATIONS_DIR } from "../../../lib/constants"

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

export const createLocaleTranslationPR = (
  locale: string,
  buckets: number[]
) => {
  const gitStatus = execSync(`git status -s | grep -E "/${locale}/" | wc -l`, {
    encoding: "utf-8",
  }).trim()
  if (+gitStatus === 0) return

  const month = new Date()
    .toLocaleString("default", { month: "long" })
    .toLowerCase()
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "")

  const branchName = `crowdin-${month}-${locale}-${timestamp}`
  const message = `chore: import translations for ${locale}`
  const startingBranch = execSync("git branch --show-current", {
    encoding: "utf-8",
  }).trim()
  execSync(`git checkout -b ${branchName}`)
  execSync("git reset .")

  // Check if the translations directory exists and contains files
  const translationsDir = path.join(TRANSLATIONS_DIR, locale)
  if (
    fs.existsSync(translationsDir) &&
    fs.readdirSync(translationsDir).length > 0
  ) {
    execSync(`git add ${translationsDir}`)
  }

  // Check if the intl JSON directory exists and contains files
  const intlJsonDir = path.join(INTL_JSON_DIR, locale)
  if (fs.existsSync(intlJsonDir) && fs.readdirSync(intlJsonDir).length > 0) {
    execSync(`git add ${intlJsonDir}`)
  }

  execSync(`git commit -m "${message}"`)
  execSync(`git push origin ${branchName}`)

  const prBody = `## Description
  This PR was automatically created to import Crowdin translations.
  This workflows runs on the first of every month at 16:20 (UTC).

  Thank you to everyone contributing to translate ethereum.org ❤️

  ## Content buckets imported
  ${buckets.sort((a, b) => a - b).join(", ")}
  `

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
  const previewUrl = `https://deploy-preview-${prNumber}--ethereumorg.netlify.app/${locale}/`
  const updatedBody =
    prBody +
    `\n\n## Preview link
[${previewUrl}](${previewUrl})
    `
  // Update PR with new body
  writeFileSync(bodyWritePath, updatedBody)
  execSync(`gh pr edit ${prNumber} --body-file ${bodyWritePath}`)

  unlinkSync(bodyWritePath)

  execSync(`git checkout ${startingBranch}`)
}
