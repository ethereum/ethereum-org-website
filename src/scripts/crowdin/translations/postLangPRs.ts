import fs from "fs"

import { LOCALES_CODES } from "../../../lib/constants"
import type { BucketsList } from "../import/types"

import { BUCKETS_PATH } from "./constants"
import { createLocaleTranslationPR } from "./utils"

function postLangPRs() {
  const bucketsListRead = fs.readFileSync(BUCKETS_PATH, "utf-8")
  const bucketsList = JSON.parse(bucketsListRead) as BucketsList

  if (!bucketsList) throw new Error("Failed to read buckets list.")

  for (const locale of LOCALES_CODES) {
    if (!bucketsList[locale]) continue
    createLocaleTranslationPR(locale, bucketsList[locale])
  }
}

postLangPRs()

export default postLangPRs
