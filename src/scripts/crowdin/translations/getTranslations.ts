import fs from "fs"

import { checkMarkdown } from "../../markdownChecker"
import crowdinImport from "../import/main"
import type { BucketsList } from "../import/types"

import { BUCKETS_PATH, SUMMARY_PATH } from "./constants"
import getApprovedBuckets from "./getApprovedBuckets"

async function main() {
  // Get approved buckets from Crowdin
  const buckets = (await getApprovedBuckets()) as BucketsList

  // Save buckets for use in PR body later
  fs.writeFileSync(BUCKETS_PATH, JSON.stringify(buckets, null, 2))

  // Run Crowdin import script with buckets from Notion
  crowdinImport(buckets)

  // Check markdown
  checkMarkdown(SUMMARY_PATH)
}

main()

export default main
