import htmr, { type HtmrOptions } from "htmr"
import type { TranslationValues } from "next-intl"
import { getTranslations } from "next-intl/server"

import TooltipLink from "./TooltipLink"

type TranslationProps = {
  id: string
  ns?: string
  values?: TranslationValues
  transform?: HtmrOptions["transform"]
}

// Renders the translation string for the given translation key `id`. It
// fallback to English if it doesn't find the given key in the current language
const TranslationSSR = async ({
  id,
  ns,
  values,
  transform = {},
}: TranslationProps) => {
  const t = await getTranslations(ns)
  const translatedText = t(id, values)

  const defaultTransform = {
    a: TooltipLink,
  }

  return (
    <>
      {htmr(translatedText, {
        transform: { ...defaultTransform, ...transform },
      })}
    </>
  )
}

TranslationSSR.displayName = "TranslationSSR"

export default TranslationSSR
