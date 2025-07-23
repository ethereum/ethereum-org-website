import fs from "fs"
import path from "path"

function getNamespaces(localePath: string): string[] {
  return fs
    .readdirSync(localePath)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(".json", ""))
}

const messagesCache: Record<string, Record<string, string>> = {}

export async function loadMessages(locale: string) {
  if (messagesCache[locale]) {
    return messagesCache[locale]
  }

  const intlPath = path.join(process.cwd(), "src/intl")
  const messages: Record<string, string> = {}

  const localePath = path.join(intlPath, locale)
  if (fs.statSync(localePath).isDirectory()) {
    const namespaces = getNamespaces(localePath)

    for (const ns of namespaces) {
      messages[ns] = (await import(`../intl/${locale}/${ns}.json`)).default
    }
  }

  messagesCache[locale] = messages
  return messages
}
