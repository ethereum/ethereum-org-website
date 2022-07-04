import fs from "fs"

import flattenMessages from "./flattenMessages"

import type { Messages } from "../interfaces"
import type { Lang } from "./languages"

/** same function from 'gatsby-plugin-intl' */
const getMessages = (path: string, language: Lang): Messages => {
  try {
    const messages = JSON.parse(
      fs.readFileSync(`${path}/${language}.json`, "utf8")
    )

    return flattenMessages(messages)
  } catch (error: any) {
    if (error.code === "MODULE_NOT_FOUND") {
      process.env.NODE_ENV !== "test" &&
        console.error(
          `[gatsby-plugin-intl] couldn't find file "${path}/${language}.json"`
        )
    }

    throw error
  }
}

export default getMessages
