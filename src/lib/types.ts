import { ReactElement, ReactNode } from "react"
import { NextPage } from "next"
import { AppProps } from "next/app"

export type ChildOnlyProp = { children?: ReactNode }

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type Frontmatter = { [key: string]: any }

export type Lang =
  | "en"
  | "ar"
  | "az"
  | "bg"
  | "bn"
  | "ca"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "es"
  | "fa"
  | "fi"
  | "fr"
  | "gl"
  | "gu"
  | "he"
  | "hi"
  | "hr"
  | "hu"
  | "id"
  | "ig"
  | "it"
  | "ja"
  | "ka"
  | "kk"
  | "km"
  | "ko"
  | "lt"
  | "ml"
  | "mr"
  | "ms"
  | "nl"
  | "nb"
  | "pcm"
  | "ph"
  | "pl"
  | "pt"
  | "pt-br"
  | "ro"
  | "ru"
  | "se"
  | "sk"
  | "sl"
  | "sr"
  | "sw"
  | "ta"
  | "th"
  | "tr"
  | "uk"
  | "ur"
  | "uz"
  | "vi"
  | "zh"
  | "zh-tw"

export type TranslationKey = string
