import { existsSync } from "fs"
import { join } from "path"

import { TRANSLATED_IMAGES_DIR } from "../constants"

export const getTranslatedImgPath = (originalPath: string, locale: string) =>
  join(
    `${TRANSLATED_IMAGES_DIR}/${locale}`,
    originalPath.split("/content/").slice(1).join("/")
  )

export const checkIfImageIsTranslated = (translatedImgPath: string) =>
  existsSync(join("public", translatedImgPath))
