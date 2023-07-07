import fs from "fs"
import { Language } from "./languages"

async function getCrowdinCode(langCode: string): Promise<string> {
  try {
    const data = await fs.promises.readFile("i18n/config.json", "utf-8")
    const langs: Language[] = JSON.parse(data)
    const lang = langs.find((lang) => lang.code === langCode)

    if (!lang) {
      throw new Error(`Language code ${langCode} not found`)
    }

    return lang.crowdinCode
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`)
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
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`)
  }
}

export default getCrowdinCode
