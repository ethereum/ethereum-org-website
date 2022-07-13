import type { Messages } from "./interfaces"
import type { Lang } from "./utils/languages"
import { TranslationKey } from "./utils/translations"

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
  relativePath?: string
  language: Lang
  ignoreTranslationBanner?: boolean
  isOutdated: boolean
  isLegal?: boolean
  isDefaultLang?: boolean
  isContentEnglish?: boolean

  // gatsby i18n theme context
  locale: Lang
  hrefLang: string
  originalPath: string
  dateFormat: string
}

export interface DeveloperDocsLink {
  id: TranslationKey
  to: string
  path: string
  description: TranslationKey
  items: Array<DeveloperDocsLink>
}

export type Direction = "rtl" | "ltr" | "auto"

export type ForbidOptional<T = {}> = {
  [P in keyof T]?: never
}

type OptionalImageProp = {
  image: string
  alt: string
}

type ForbidOptionalImageProp = ForbidOptional<OptionalImageProp>

export type ImageProp = OptionalImageProp | ForbidOptionalImageProp
