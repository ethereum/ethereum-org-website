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
  language: Lang
  ignoreTranslationBanner?: boolean
  isOutdated: boolean
  isLegal?: boolean
  isContentEnglish?: boolean
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
