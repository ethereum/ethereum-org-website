import fs from "fs"
import { readFile } from "fs/promises"
import path from "path"

import { DEFAULT_LOCALE, INTL_JSON_DIR, LOCALES_CODES } from "@/lib/constants"

interface IntlMessages {
  [key: string]: string | IntlMessages
}

function getNamespaces(localePath: string): string[] {
  return fs
    .readdirSync(localePath, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".json") &&
        !entry.name.startsWith(".")
    )
    .map((entry) => entry.name.replace(".json", ""))
}

const messagesCache: Record<string, Record<string, IntlMessages>> = {}

export async function loadMessages(locale: string) {
  if (messagesCache[locale]) {
    return messagesCache[locale]
  }

  const intlPath = path.join(process.cwd(), "src/intl")
  const localePath = path.join(intlPath, locale)
  const messages: Record<string, IntlMessages> = {}

  // `throwIfNoEntry: false` returns undefined instead of throwing ENOENT: the
  // `[locale]` segment acts as a catch-all, so bot probes like `/api/...` reach
  // here with an unknown locale and must fall through to an empty message set
  // (letting the layout's `notFound()` win) rather than crashing the render.
  if (fs.statSync(localePath, { throwIfNoEntry: false })?.isDirectory()) {
    const namespaces = getNamespaces(localePath)

    await Promise.all(
      namespaces.map(async (ns) => {
        const filePath = path.join(localePath, `${ns}.json`)
        const content = await readFile(filePath, "utf-8")
        messages[ns] = JSON.parse(content) as IntlMessages
      })
    )
  }

  messagesCache[locale] = messages
  return messages
}

const readEthereumName = async (locale: string) => {
  const filePath = path.join(
    process.cwd(),
    INTL_JSON_DIR,
    locale,
    "common.json"
  )
  const content = await readFile(filePath, "utf-8").catch(() => null)
  if (!content) return null
  const { ethereum } = JSON.parse(content)
  return typeof ethereum === "string" ? ethereum : null
}

/**
 * "Ethereum" as each built locale writes it, de-duplicated, default locale
 * first. Reads only `common.json`: `loadMessages` for every locale would parse
 * ~2,000 files to get one word from each.
 */
export async function loadEthereumNames(): Promise<string[]> {
  const names = await Promise.all(
    [DEFAULT_LOCALE, ...LOCALES_CODES].map(readEthereumName)
  )
  return [...new Set(names.filter((name): name is string => !!name))]
}
