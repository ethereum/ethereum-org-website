import * as React from "react"
import { TOptions } from "i18next"
import { useTranslation } from "react-i18next"
import htmr from "htmr"

interface Props {
  id: string
  options?: TOptions
}

/**
 * Translation component to parse html content
 * with translated text using react-i18next
 *
 * `NOTE:` This is only to be used for Storybook stories, as it does
 * not have the `Link` component dep in parsing
 */
export const Translation = ({ id, options }: Props) => {
  const { t } = useTranslation()

  const translatedText = t(id, options)

  // Use `htmr` to parse html content in the translation text
  // @ts-ignore
  return <>{htmr(translatedText)}</>
}
