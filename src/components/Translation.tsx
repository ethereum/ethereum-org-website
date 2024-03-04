import htmr from "htmr"
import type { TOptions } from "i18next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import InlineLink from "./Link"

type TranslationProps = {
  id: string
  options?: TOptions
}

// Custom components mapping to be used by `htmr` when parsing the translation
// text
const transform = {
  a: InlineLink,
}

// Renders the translation string for the given translation key `id`. It
// fallback to English if it doesn't find the given key in the current language
const Translation = ({ id, options }: TranslationProps) => {
  const { asPath } = useRouter()
  const requiredNamespaces = getRequiredNamespacesForPage(asPath)

  const { t } = useTranslation(requiredNamespaces)
  const translatedText = t(id, options)

  // Use `htmr` to parse html content in the translation text
  // @ts-ignore
  return htmr(translatedText, { transform })
}

export default Translation
