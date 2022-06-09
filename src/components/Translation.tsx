import React from "react"
import { FormattedHTMLMessage } from "gatsby-plugin-intl"
import { getDefaultMessage, TranslationKey } from "../utils/translations"

// Wrapper on <FormattedMessage /> to always fallback to English
// Use this component for any user-facing string
const Translation = ({ id }: { id: TranslationKey }) => (
  <FormattedHTMLMessage id={id} defaultMessage={getDefaultMessage(id)} />
)

export default Translation
