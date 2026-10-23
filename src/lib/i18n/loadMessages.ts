import fs from "fs"
import { readFile } from "fs/promises"
import path from "path"

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
