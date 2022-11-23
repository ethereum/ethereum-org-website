import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import htmr from "htmr"

import Link from "./Link"

interface Props {
  id: string
}

// Custom components mapping to be used by `htmr` when parsing the translation
// text
const transform = {
  a: Link,
}

// Renders the translation string for the given translation key `id`. It
// fallback to English if it doesn't find the given key in the current language
const Translation = ({ id }: Props) => {
  const { t } = useTranslation()

  const translatedText = t(id)

  // Use `htmr` to parse html content in the translation text
  // @ts-ignore
  return <>{htmr(translatedText, { transform })}</>
}

export default Translation
