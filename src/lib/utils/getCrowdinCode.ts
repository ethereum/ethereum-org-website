import fs from "fs"
import type { Language } from "@/lib/types"

async function getCrowdinCode(langCode: string): Promise<string> {
  try {
    const data = await fs.promises.readFile("i18n/config.json", "utf-8")
    const langs: Language[] = JSON.parse(data)
    const lang = langs.find((lang) => lang.code === langCode)

    if (!lang) {
      throw new Error(`Language code ${langCode} not found`)
    }

    return lang.crowdinCode
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Error: ${error.message}`)
    return ""
  }
}

export async function getLangCodeFromCrowdinCode(
  crowdinCode: string
): Promise<string> {
  try {
    const data = await fs.promises.readFile("i18n/config.json", "utf-8")
    const langs: Language[] = JSON.parse(data)
    const lang = langs.find((lang) => lang.crowdinCode === crowdinCode)

    if (!lang) {
      throw new Error(`CrowdinCode ${crowdinCode} not found`)
    }

    return lang.code
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Error: ${error.message}`)
    return ""
  }
}

export default getCrowdinCode
