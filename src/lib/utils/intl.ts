import { existsSync } from "fs"
import { join } from "path"

import { TRANSLATED_IMAGES_DIR } from "../constants"

import { capitalize } from "./string"

export const getLanguageCodeName = (languageCode: string, locale: string) => {
  return capitalize(
    new Intl.DisplayNames([locale], {
      type: "language",
    }).of(languageCode) as string
  )
}

export const getTranslatedImgPath = (originalPath: string, locale: string) =>
  join(
    `${TRANSLATED_IMAGES_DIR}/${locale}`,
    originalPath.split("/content/").slice(1).join("/")
  )

export const checkIfImageIsTranslated = (translatedImgPath: string) =>
  existsSync(join("public", translatedImgPath))
