import fs from "fs"
import path from "path"

import i18n from "../../../../i18n.config.json"
import dirs from "../../../data/crowdin/translation-buckets-dirs.json"
import { CROWDIN_API_MAX_LIMIT } from "../../../lib/constants"
import crowdinClient from "../api-client/crowdinClient"

type SummaryItem = [code: string, bucket: string, needsReview: number]

/**
 * Generates a report of words needing review for each content bucket in all languages.
 * Report in CSV format with columns: Language, Bucket Name, Words needing review.
 * To run:
 * - Ensure CROWDIN_API_KEY is set in the .env file (.env.local will not work)
 *    1. https://crowdin.com/settings#api-key
 *    2. Click: "New token"
 *    3. Give token a name
 *    4. Select "Translation Status" under "Projects" for scope
 *    5. Click: "Create" and authenticate
 *    6. Copy the token to the .env file
 * - Can be run with `yarn crowdin-needs-review`
 * - Results are saved to src/data/crowdin/bucketsAwaitingReviewReport.csv
 * - Report is git ignored, and should not be committed
 */
async function main() {
  const projectId = Number(process.env.CROWDIN_PROJECT_ID) || 363359

  const reportSummary = [] as SummaryItem[]

  const directories = dirs.sort((a, b) => a.name.localeCompare(b.name))

  // Loop through list of content buckets (dirs)
  for (const dir of directories) {
    console.log(`Processing: ${dir.name}...`)

    // Get translation progress for bucket (dir.id) in all languages
    const { data } =
      await crowdinClient.translationStatusApi.getDirectoryProgress(
        projectId,
        dir.id,
        { limit: CROWDIN_API_MAX_LIMIT }
      )

    // Loop through supported languages
    i18n.forEach(({ crowdinCode }) => {
      const match = data.find(
        ({ data: { languageId } }) => languageId === crowdinCode
      )
      if (!match) return
      const { words, translationProgress } = match.data
      if (translationProgress < 100) return
      const needsReview = words.translated - words.approved
      if (needsReview === 0) return
      // If match, 100% translation progress, and not full reviewed, add to summary
      reportSummary.push([crowdinCode, dir.name, needsReview])
    })
  }

  // Sort first by language code, then by bucket name
  const sorted = reportSummary.sort((a, b) =>
    a[0] === b[0] ? a[1].localeCompare(b[1]) : a[0].localeCompare(b[0])
  )
  // Transform to çsv string
  const csvArray = sorted.map((item) => item.join(","))
  // Insert header names at beginning of csv array
  csvArray.unshift("Language,Bucket Name,Words needing review")
  const csv = csvArray.join("\n")

  // Write csv to file to fs
  const csvPath = path.resolve(
    process.cwd(),
    "src/data/crowdin/bucketsAwaitingReviewReport.csv"
  )
  fs.writeFileSync(csvPath, csv)

  // Log summary
  console.log("\nReport summary:\n")
  console.log(csv)
  console.log(`\n✅ Report saved to ${csvPath}`)
}

main()

export default main
