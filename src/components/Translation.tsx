import htmr, { type HtmrOptions } from "htmr"
import type { TranslationValues } from "next-intl"

import TooltipLink from "./TooltipLink"

import useTranslation from "@/hooks/useTranslation"

type TranslationProps = {
  id: string
  ns?: string
  values?: TranslationValues
  transform?: HtmrOptions["transform"]
}

// Renders the translation string for the given translation key `id`. It
// fallback to English if it doesn't find the given key in the current language
const Translation = ({ id, ns, values, transform = {} }: TranslationProps) => {
  const { t } = useTranslation(ns)
  const translatedText = t(id, values)

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
