import fs from "fs"

import i18n from "../../../../i18n.config.json"

import { BUCKETS_PATH } from "./constants"
import { processLocale } from "./utils"

const locales = i18n.map((lang) => lang.code)

function postLangPRs() {
  const bucketsList = fs.readFileSync(BUCKETS_PATH, "utf-8")
  if (!bucketsList) throw new Error("Failed to read buckets list.")

  for (const locale of locales) {
    processLocale(locale, bucketsList[locale])
  }
}

postLangPRs()

export default postLangPRs
