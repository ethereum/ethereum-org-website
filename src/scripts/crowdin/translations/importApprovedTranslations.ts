import fs from "fs"

import { checkMarkdown } from "../../markdownChecker"
import importBuckets from "../import/main"
import type { BucketsList } from "../import/types"

import { BUCKETS_PATH, SUMMARY_PATH } from "./constants"
import getApprovedBuckets from "./getApprovedBuckets"

async function importApprovedTranslations() {
  // Get approved buckets from Crowdin
  const buckets = (await getApprovedBuckets()) as BucketsList

  // Save buckets for use in PR body later
  fs.writeFileSync(BUCKETS_PATH, JSON.stringify(buckets, null, 2))

  // Run Crowdin import script with approved buckets
  importBuckets(buckets)

  // Check markdown
  checkMarkdown(SUMMARY_PATH)
}

importApprovedTranslations()

export default importApprovedTranslations
