import { execSync } from "child_process"
import { readFileSync, unlinkSync } from "fs"

import i18n from "../../../../i18n.config.json"

import { SUMMARY_PATH } from "./constants"

const LANGUAGES = i18n.map((lang) => lang.code)
const MONTH = new Date()
  .toLocaleString("default", { month: "long" })
  .toLowerCase()
const TIMESTAMP = new Date().toISOString().replace(/[^0-9]/g, "")
const STARTING_BRANCH = execSync("git rev-parse --abbrev-ref HEAD", {
  encoding: "utf-8",
}).trim()

const TEST_LANGUAGE_SET = ["el", "es"] //! TODO: Remove for production
for (let lang of TEST_LANGUAGE_SET /* LANGUAGES */) {
  const gitStatus = execSync(`git status -s | grep -E "/${lang}/" | wc -l`, {
    encoding: "utf-8",
  }).trim()
  if (+gitStatus === 0) continue

  const BRANCH_NAME = `${MONTH}-${lang}-${TIMESTAMP}`
  const MESSAGE = `chore: import translations for ${lang}`

  execSync(`git checkout -b ${BRANCH_NAME}`)
  execSync("git reset .")
  execSync(`git add public/content/translations/${lang}`)
  execSync(`git add src/intl/${lang}`)
  execSync(`git commit -m "${MESSAGE}"`)
  execSync(`git push origin ${BRANCH_NAME}`)

  type Lang = string
  type QASummary = Record<Lang, string[]>
  const summaryJson: QASummary = JSON.parse(readFileSync(SUMMARY_PATH, "utf-8"))
  const qaResults = summaryJson[lang]
    ? summaryJson[lang].join("\n")
    : "No QA issues found"
  const prBody = `## Description
This PR was automatically created to import Crowdin translations.
This workflows runs on the first of every month at 16:20 (UTC).

Thank you to everyone contributing to translate ethereum.org ❤️

## Markdown QA checker alerts
${qaResults}`

  execSync(`gh auth login --with-token ${process.env.GITHUB_TOKEN}`)
  execSync(`gh pr create \
    --base dev \
    --head ${BRANCH_NAME} \
    --title ${MESSAGE} \
    --body "${prBody}"`)

  execSync(`git checkout ${STARTING_BRANCH}`)
}

unlinkSync(SUMMARY_PATH)
