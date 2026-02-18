import fs from "fs"

import type { I18nLocale } from "../../lib/types"

export async function getLangCodeFromCrowdinCode(
  crowdinCode: string
): Promise<string> {
  try {
    const data = await fs.promises.readFile("i18n.config.json", "utf-8")
    const locales: I18nLocale[] = JSON.parse(data)
    const locale = locales.find((item) => item.crowdinCode === crowdinCode)

    if (!locale) {
      throw new Error(`CrowdinCode ${crowdinCode} not found`)
    }

    return locale.code
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Error: ${error.message}`)
    return ""
  }
}
