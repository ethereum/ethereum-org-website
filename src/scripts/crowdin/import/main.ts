import { existsSync, mkdirSync } from "fs"

import { DOT_CROWDIN } from "../translations/constants"

import type { BucketsList, SelectionItem, TrackerObject } from "./types"
import {
  fetchReviewedCsv,
  getImportSelection,
  handleSummary,
  processLanguage,
} from "./utils"

const USER_OVERRIDE: BucketsList = {
  // FORMAT: lang_code: [bucket_number, bucket_number, ...],
  // EXAMPLE: es: [1, 10, 12, 14],
}

const main = (userOverride: BucketsList = USER_OVERRIDE) => {
  console.log("User overrides:", userOverride) // TODO: Remove?

  // If first time, create directory for user
  if (!existsSync(DOT_CROWDIN)) mkdirSync(DOT_CROWDIN)

  // Initialize trackers object for summary
  const trackers: TrackerObject = { emptyBuckets: 0, langs: {} }

  /**
   * If any buckets are selected in USER_OVERRIDE, use those instead of importing from CSV.
   */
  const useUserOverRide =
    Object.values(userOverride).filter((buckets) => buckets.length > 0).length >
    0

  const bucketsToImport: BucketsList = useUserOverRide
    ? userOverride
    : fetchReviewedCsv()

  // Filter out empty requests and map selection to usable array
  const importSelection: SelectionItem[] = getImportSelection(
    bucketsToImport,
    trackers
  )

  // Iterate through each selected language
  importSelection.forEach((item) => processLanguage(item, trackers))

  handleSummary(importSelection, trackers)
}

export default main
