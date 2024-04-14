import i18n from "../../../../i18n.config.json"

import { processLocale } from "./utils"

const locales = i18n.map((lang) => lang.code)
function postLangPRs() {
  for (const locale of locales) {
    processLocale(locale)
  }
}

postLangPRs()

export default postLangPRs
