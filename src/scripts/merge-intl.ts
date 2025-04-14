import fs from "fs"
import path from "path"
import { promisify } from "util"

import { merge } from "lodash"

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const stat = promisify(fs.stat)

const INTL_DIR = path.join(process.cwd(), "src/intl")

async function isDirectory(filePath: string): Promise<boolean> {
  try {
    const stats = await stat(filePath)
    return stats.isDirectory()
  } catch (error) {
    return false
  }
}

async function readLocaleFiles(
  localeDir: string
): Promise<Record<string, Record<string, string>>> {
  const files = await readdir(localeDir)
  const jsonFiles = files.filter(
    (file) => file.endsWith(".json") && file !== "all.json"
  )

  const content: Record<string, Record<string, string>> = {}

  for (const file of jsonFiles) {
    const filePath = path.join(localeDir, file)
    const fileContent = await readFile(filePath, "utf-8")
    const namespace = file.replace(".json", "")
    content[namespace] = JSON.parse(fileContent)
  }

  return content
}

async function mergeLocaleFiles(
  localeDir: string,
  defaultLocaleContent: Record<string, Record<string, string>>
) {
  const localeContent = await readLocaleFiles(localeDir)

  // Deep merge with English as default
  const mergedContent = merge({}, defaultLocaleContent, localeContent)

  const allJsonPath = path.join(localeDir, "all.json")
  await writeFile(allJsonPath, JSON.stringify(mergedContent, null, 2))
  console.log(`Created all.json for ${path.basename(localeDir)}`)
}

async function main() {
  try {
    const localeDirs = await readdir(INTL_DIR)

    // First read the English locale as default
    const defaultLocaleDir = path.join(INTL_DIR, "en")
    const defaultLocaleContent = await readLocaleFiles(defaultLocaleDir)

    // Process all locales
    for (const dir of localeDirs) {
      const dirPath = path.join(INTL_DIR, dir)
      if (await isDirectory(dirPath)) {
        await mergeLocaleFiles(dirPath, defaultLocaleContent)
      }
    }

    console.log("All locale files merged successfully!")
  } catch (error) {
    console.error("Error merging locale files:", error)
    process.exit(1)
  }
}

main()
