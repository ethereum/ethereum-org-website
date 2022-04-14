import { Lang } from "./src/data/translations"
import { IMessages } from "./src/utils/flattenMessages"

export type TIntl = {
  language: Lang
  languages: Array<Lang>
  defaultLanguage: Lang
  messages: IMessages
  routed: boolean
  originalPath: string
  redirect: boolean
}

export type TContext = {
  slug: string
  relativePath: string
  intl: TIntl
  language?: string
  isOutdated: boolean
  isContentEnglish?: boolean
}
