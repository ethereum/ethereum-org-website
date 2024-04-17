import fs from "fs"

import i18n from "../../../../i18n.config.json"
import { BucketsList } from "../import/types"

import { BUCKETS_PATH } from "./constants"
import { processLocale } from "./utils"

const locales = i18n.map((lang) => lang.code)

function postLangPRs() {
  const bucketsListData = fs.readFileSync(BUCKETS_PATH, "utf-8")
  const bucketsList: BucketsList = JSON.parse(bucketsListData)
  if (!bucketsList) throw new Error("Failed to read buckets list.")

  for (const locale of locales) {
    if (!bucketsList[locale]) return
    processLocale(locale, bucketsList[locale])
  }
}

postLangPRs()

export default postLangPRs
