import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import htmr from "htmr"

import Link from "./Link"

interface Props {
  id: string
}

const transform = {
  a: Link,
}

// Wrapper on <FormattedHTMLMessage /> to always fallback to English
// Use this component for any user-facing string
const Translation = ({ id, ...rest }: Props) => {
  const { t } = useTranslation()

  const translatedText = t(id)

  // @ts-ignore
  return <>{htmr(translatedText, { transform })}</>
}

export default Translation
