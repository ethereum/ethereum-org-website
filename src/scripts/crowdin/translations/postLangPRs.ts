import { execSync } from "child_process"
import { readFileSync, unlinkSync, writeFileSync } from "fs"
import path from "path"

import i18n from "../../../../i18n.config.json"

import { SUMMARY_PATH } from "./constants"
import type { QASummary } from "./types"

const locales = i18n.map((lang) => lang.code)
const month = new Date()
  .toLocaleString("default", { month: "long" })
  .toLowerCase()
const timestamp = new Date().toISOString().replace(/[^0-9]/g, "")
const startingBranch = execSync("git rev-parse --abbrev-ref HEAD", {
  encoding: "utf-8",
}).trim()

const processLocale = (locale: string) => {
  const gitStatus = execSync(`git status -s | grep -E "/${locale}/" | wc -l`, {
    encoding: "utf-8",
  }).trim()
  if (+gitStatus === 0) return

  const BRANCH_NAME = `${month}-${locale}-${timestamp}`
  const MESSAGE = `chore: import translations for ${locale}`

  execSync(`git checkout -b ${BRANCH_NAME}`)
  execSync("git reset .")
  execSync(`git add public/content/translations/${locale}`)
  execSync(`git add src/intl/${locale}`)
  execSync(`git commit -m "${MESSAGE}"`)
  // Uncomment the following line when ready to push branches to GitHub
  // execSync(`git push origin ${BRANCH_NAME}`)

  const summaryJson: QASummary = JSON.parse(readFileSync(SUMMARY_PATH, "utf-8"))
  const qaResults = summaryJson[locale]
    ? summaryJson[locale].join("\n")
    : "No QA issues found"

  const prBody = `## Description
This PR was automatically created to import Crowdin translations.
This workflows runs on the first of every month at 16:20 (UTC).

Thank you to everyone contributing to translate ethereum.org ❤️

## Markdown QA checker alerts
${qaResults}`

  const bodyWritePath = path.resolve(process.cwd(), "body.txt")
  writeFileSync(bodyWritePath, prBody)

  // Uncomment the following lines when ready to create the PRs
  // execSync(`gh pr create \
  // --base dev \
  // --head ${BRANCH_NAME} \
  // --title "${MESSAGE}" \
  // --body-file body.txt`)

  unlinkSync(bodyWritePath)

  execSync(`git checkout ${startingBranch}`)
}

function postLangPRs() {
  for (const locale of locales) {
    processLocale(locale)
  }
}

postLangPRs()

export default postLangPRs
