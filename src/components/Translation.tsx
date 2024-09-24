import htmr, { type HtmrOptions } from "htmr"
import type { TOptions } from "i18next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import TooltipLink from "./TooltipLink"

type TranslationProps = {
  id: string
  options?: TOptions
  transform?: HtmrOptions["transform"]
}

// Renders the translation string for the given translation key `id`. It
// fallback to English if it doesn't find the given key in the current language
const Translation = ({ id, options, transform = {} }: TranslationProps) => {
  const { asPath } = useRouter()
  const requiredNamespaces = getRequiredNamespacesForPage(asPath)

  const { t } = useTranslation(requiredNamespaces)
  const translatedText = t(id, options)

  // Custom components mapping to be used by `htmr` when parsing the translation
  // text
  const defaultTransform = {
    a: TooltipLink,
  }

  // Use `htmr` to parse html content in the translation text
  return htmr(translatedText, {
    transform: { ...defaultTransform, ...transform },
  })
}

export default Translation
