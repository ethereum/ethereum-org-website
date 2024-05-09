import { existsSync, mkdirSync } from "fs"

import { CROWDIN_WD } from "../translations/constants"

import type { BucketsList, SelectionItem, TrackerObject } from "./types"
import { getImportSelection, handleSummary, processLanguage } from "./utils"

const main = (bucketList: BucketsList) => {
  console.log("Bucket list:", bucketList)

  // If first time, create directory for user
  if (!existsSync(CROWDIN_WD)) mkdirSync(CROWDIN_WD)

  // Initialize trackers object for summary
  const trackers: TrackerObject = { emptyBuckets: 0, langs: {} }

  // Filter out empty requests and map selection to usable array
  const importSelection: SelectionItem[] = getImportSelection(
    bucketList,
    trackers
  )

  // Iterate through each selected language
  importSelection.forEach((item) => processLanguage(item, trackers))

  handleSummary(importSelection, trackers)
}

export default main
