import i18nConfigs from "../../../i18n.config.json"

import { Lang } from "../types"

export const isLangRightToLeft = (lang: Lang): boolean => {
  const langConfig = i18nConfigs.filter((language) => language.code === lang)

  if (!langConfig.length)
    throw new Error("Language code not found in isLangRightToLeft")

  return langConfig[0].langDir === "rtl"
}
