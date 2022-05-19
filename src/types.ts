import type { Messages } from "./interfaces"
import type { Lang } from "./utils/languages"

export type Intl = {
  language: Lang
  languages: Array<Lang>
  defaultLanguage: Lang
  messages: Messages
  routed: boolean
  originalPath: string
  redirect: boolean
}

export type Context = {
  slug: string
  relativePath: string
  intl: Intl
  language?: string
  isOutdated: boolean
  isContentEnglish?: boolean
}
